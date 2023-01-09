import TabPanel from "../TabPanel";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import OrderTableRow from "./OrderTableRow";
import * as React from "react";
import CustomPagination from "../CustomPagination";
import {useCallback, useContext, useEffect} from "react";
import Context from "../../context/context";
import {PaperWithShadow} from "../../App";
import {config} from "../../config";


export default function OrderItemsTab({value}){

    const [orders, setOrders] = React.useState([]);
    const [count, setCount] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const ctx = useContext(Context)

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    const getOrders = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;
                obj = JSON.parse(json);
                setOrders(obj)
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getOrdersFilterUser?page=${page}`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

    }, [ctx.authToken, page]);

    const getOrdersCount = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;
                obj = JSON.parse(json);
                setCount(Math.ceil(obj / 20));
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getOrdersFilterUserCount?page=${page}`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

    }, [ctx.authToken, page]);

    useEffect(() => {
        getOrdersCount()
    }, [getOrdersCount]);

    useEffect(() => {
        getOrders()
    }, [getOrders]);

    function handleChangePage(event, value) {
        setPage(value);
    }

    const TableRowStyle = {
        backgroundColor: "white"
    }

    return(
        <TabPanel value={value} index={1}>

            <CustomPagination handleChange={handleChangePage} maxPage={count} page={page}/>

            <TableContainer component={PaperWithShadow}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={TableRowStyle}>
                            <TableCell/>
                            <TableCell>Order Number</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <OrderTableRow key={row.orderId} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </TabPanel>
    );
}