import {Container, Paper, Table, TableBody, TableContainer} from "@mui/material";
import AccountDetailsTableRow from "../components/account/AccountDetailsTableRow";
import * as React from "react";
import {config} from "../config";
import {Box} from "@mui/system";
import HomePageMenu from "../components/HomePageMenu";
import PageTitle from "../components/PageTitle";
import {GlobalStyles} from "@mui/joy";


export default function ContactPage() {

    return (
        <Box>
            <GlobalStyles
                styles={{
                    body: { backgroundColor: "#c8e6c9" },
                }}
            />
            <HomePageMenu/>
            <Container>
                <PageTitle title={"Contact"} center={false}/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <AccountDetailsTableRow text={"City: "} value={config.city}/>
                            <AccountDetailsTableRow text={"Street: "} value={config.street}/>
                            <AccountDetailsTableRow text={"Phone: "} value={config.phone}/>
                            <AccountDetailsTableRow text={"Email: "} value={config.email}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}