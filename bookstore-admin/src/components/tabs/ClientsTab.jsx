import TabPanel from "./TabPanel";
import * as React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import CustomPagination from "../other/CustomPagination";
import {useSearchParams} from "react-router-dom";
import ClientFilter from "../other/ClientFilter";

const TableStyle = {
    minWidth: 650
}

const TableRowStyle = {
    '&:last-child td, &:last-child th': { border: 0 }
}

export default function ClientsTab({value}){

    const [urlSearchParams, setUrlSearchParams] = useSearchParams(window.location.search);
    const [users, setUsers] = useState([])
    const [pageUsers, setPageUsers] = React.useState(parseInt(urlSearchParams.get('page')) || 1);
    const [usersCount, setUsersCount] = React.useState(1);

    const handleChangePage = (event, value) => {
        setPageUsers(value);
        urlSearchParams.set('page', value)
        setUrlSearchParams(urlSearchParams)
    };

    useEffect(() => {
        setPageUsers(parseInt(urlSearchParams.get('page')) || 1)
    }, [setPageUsers, urlSearchParams]);

    return(
        <TabPanel value={value} index={2}>
            <ClientFilter pageUsers={pageUsers} setUsers={setUsers} setUsersCount={setUsersCount}/>
            <TableContainer component={Paper}>
                <Table sx={TableStyle} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Surname</TableCell>
                            <TableCell align="left">Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.login}
                                sx={TableRowStyle}>
                                <TableCell align="left">{row.login}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.surname}</TableCell>
                                <TableCell align="left">{row.phoneNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomPagination page={pageUsers} handleChange={handleChangePage} maxPage={usersCount}/>
        </TabPanel>
    );
}