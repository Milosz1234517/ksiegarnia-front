import TabPanel from "./TabPanel";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import OrderTableRow from "../tables/OrderTableRow";
import * as React from "react";
import CustomPagination from "../other/CustomPagination";
import {useCallback, useContext, useEffect} from "react";
import Context from "../../store/context";


export default function OrderItemsTab({value}){

    const [orders, setOrders] = React.useState([]);
    const [count, setCount] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const ctx = useContext(Context)

    const getOrders = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;
                obj = JSON.parse(json);
                setOrders(obj)
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getOrdersFilterUser?page=${page}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, page]);

    const getOrdersCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;
                obj = JSON.parse(json);
                setCount(Math.ceil(obj / 2));
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getOrdersFilterUserCount?page=${page}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

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

    return(
        <TabPanel value={value} index={1}>

            <CustomPagination handleChange={handleChangePage} maxPage={count} page={page}/>

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

        </TabPanel>
    );
}