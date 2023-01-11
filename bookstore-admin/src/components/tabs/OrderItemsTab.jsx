import TabPanel from "./TabPanel";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import OrderTableRow from "../tables/OrderTableRow";
import * as React from "react";
import CustomPagination from "../other/CustomPagination";
import {useCallback, useContext, useEffect, useState} from "react";
import OrderSearchBar from "../other/OrderSearchBar";
import {useSearchParams} from "react-router-dom";
import {PaperWithShadow, TableRowStyle} from "../../App";
import Context from "../../store/context";
import {config} from "../../config";


export default function OrderItemsTab({value}){

    const ctx = useContext(Context)
    const [orders, setOrders] = React.useState([]);
    const [count, setCount] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const [statuses, setStatuses] = useState([])
    const [urlSearchParams, setUrlSearchParams] = useSearchParams(window.location.search);

    const handleChangePage = (event, value) => {
        setPage(value);
        urlSearchParams.set('page', value)
        setUrlSearchParams(urlSearchParams)
    };

    const getStatuses = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setStatuses(obj.filter((s) => s.statusId !== 1))
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getStatuses`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

    }, [ctx.authToken]);

    useEffect(() => {
        getStatuses();
    }, [getStatuses]);

    useEffect(() => {
        setPage(parseInt(urlSearchParams.get('page')) || 1)
    }, [setPage, urlSearchParams]);

    return(
        <TabPanel value={value} index={0}>

            <OrderSearchBar page={page} setOrders={setOrders} setCount={setCount} />

            <TableContainer component={PaperWithShadow}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={TableRowStyle}>
                            <TableCell/>
                            <TableCell align={"center"}>Order Number</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                            <TableCell align="center">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <OrderTableRow key={row.orderId} props={row} statuses={statuses}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CustomPagination handleChange={handleChangePage} maxPage={count} page={page}/>

        </TabPanel>
    );
}