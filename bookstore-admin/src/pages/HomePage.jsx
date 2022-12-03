import {Box, Stack} from "@mui/system";
import HomePageMenu from "../components/other/HomePageMenu";
import * as React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import BookList from "../components/book/BookList";
import SearchBar from "../components/other/SearchBar";
import CustomPagination from "../components/other/CustomPagination";
import {useEffect, useState} from "react";
import {Button, Pagination, Tab, Tabs, Typography} from "@mui/material";
import BookTemplate from "../components/book/BookTemplate";
import TabPanel from "../components/tabs/TabPanel";
import OrderItemsTab from "../components/tabs/OrderItemsTab";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab panel-${index}`,
    };
}

export default function HomePage() {

    const [urlSearchParams, setUrlSearchParams] = useSearchParams(window.location.search);
    const [page, setPage] = React.useState(parseInt(urlSearchParams.get('page')) || 1);
    const [books, setBooks] = React.useState([]);
    const [booksPagesCount, setBooksPagesCount] = React.useState(1);
    const [value, setValue] = React.useState(0)
    const navigation = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        urlSearchParams.set('page', value)
        setUrlSearchParams(urlSearchParams)
    };

    useEffect(() => {
        setPage(parseInt(urlSearchParams.get('page')) || 1)
    }, [setPage, urlSearchParams]);

    function handleAddBook() {
        navigation("/createBook")
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <HomePageMenu/>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs scrollButtons="auto" variant="scrollable" value={value} onChange={handleChange}
                      aria-label="basic tabs example">
                    <Tab label="Books" {...a11yProps(0)} />
                    <Tab label="Orders" {...a11yProps(1)} />
                    <Tab label="Clients" {...a11yProps(2)} />
                    <Tab label="Reviews" {...a11yProps(3)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <SearchBar page={page} setBooksPagesCount={setBooksPagesCount} setBooks={setBooks}/>

                <Stack spacing={2} sx={{
                    marginBottom: 2
                }}>
                    <Button onClick={handleAddBook}
                            sx={{alignSelf: "center", margin: 2, display: "grid", width: "50%"}}>
                        Create Book
                    </Button>
                </Stack>

                <BookList cards={books}/>
                <CustomPagination page={page} maxPage={booksPagesCount} handleChange={handleChangePage}/>
            </TabPanel>

            <OrderItemsTab value={value}/>
        </Box>
    );
}