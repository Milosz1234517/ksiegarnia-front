import TabPanel from "./TabPanel";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import OrderTableRow from "../tables/OrderTableRow";
import * as React from "react";
import CustomPagination from "../other/CustomPagination";
import {useEffect} from "react";
import OrderSearchBar from "../other/OrderSearchBar";
import {useSearchParams} from "react-router-dom";
import {PaperWithShadow, TableRowStyle} from "../../App";


export default function OrderItemsTab({value}){

    const [orders, setOrders] = React.useState([]);
    const [count, setCount] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const [urlSearchParams, setUrlSearchParams] = useSearchParams(window.location.search);

    const handleChangePage = (event, value) => {
        setPage(value);
        urlSearchParams.set('page', value)
        setUrlSearchParams(urlSearchParams)
    };

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
                            <OrderTableRow key={row.orderId} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CustomPagination handleChange={handleChangePage} maxPage={count} page={page}/>

        </TabPanel>
    );
}