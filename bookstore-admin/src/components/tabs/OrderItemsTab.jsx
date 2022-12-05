import TabPanel from "./TabPanel";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import OrderTableRow from "../tables/OrderTableRow";
import * as React from "react";
import CustomPagination from "../other/CustomPagination";
import {useEffect} from "react";
import OrderSearchBar from "../other/OrderSearchBar";
import {useSearchParams} from "react-router-dom";


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

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Order Number</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Total Price(zł)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <OrderTableRow key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CustomPagination handleChange={handleChangePage} maxPage={count} page={page}/>

        </TabPanel>
    );
}