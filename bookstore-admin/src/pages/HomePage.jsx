import {Box, Stack} from "@mui/system";
import HomePageMenu from "../components/other/HomePageMenu";
import * as React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import BookList from "../components/book/BookList";
import SearchBar from "../components/other/SearchBar";
import CustomPagination from "../components/other/CustomPagination";
import {useContext, useEffect} from "react";
import {Button, Container, Tab, Tabs} from "@mui/material";
import TabPanel from "../components/tabs/TabPanel";
import OrderItemsTab from "../components/tabs/OrderItemsTab";
import Context from "../store/context";
import ClientsTab from "../components/tabs/ClientsTab";
import UserReviewsTab from "../components/tabs/UserReviewsTab";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab panel-${index}`,
    };
}

const MainBoxStyle = {
    flexGrow: 1
}

const TabBoxStyle = {
    borderBottom: 1, borderColor: 'divider'
}

const StackStyle = {
    marginBottom: 2
}

const ButtonStyle = {
    backgroundColor:"#000",
    color: "white",
    alignSelf: "center",
    margin: 2,
    display: "grid",
    width: "50%"
}

export default function HomePage({tab}) {

    const [urlSearchParams, setUrlSearchParams] = useSearchParams(window.location.search);
    const [page, setPage] = React.useState(parseInt(urlSearchParams.get('page')) || 1);
    const [books, setBooks] = React.useState([]);
    const [booksPagesCount, setBooksPagesCount] = React.useState(1);
    const [value, setValue] = React.useState(tab)
    const navigation = useNavigate()
    const ctx = useContext(Context)

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

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    return (
        <Box sx={MainBoxStyle}>
            <HomePageMenu/>
            <Container>
                <Box sx={TabBoxStyle}>
                    <Tabs scrollButtons="auto" variant="scrollable" value={value} onChange={handleChange}
                          aria-label="basic tabs example">
                        <Tab label="Orders" {...a11yProps(0)} onClick={() => navigation("/orders")}/>
                        <Tab label="Books" {...a11yProps(1)} onClick={() => navigation("/books")}/>
                        <Tab label="Clients" {...a11yProps(2)} onClick={() => navigation("/clients")}/>
                        <Tab label="Reviews" {...a11yProps(3)} onClick={() => navigation("/reviews")}/>
                    </Tabs>
                </Box>

                <OrderItemsTab value={value}/>

                <TabPanel value={value} index={1}>
                    <SearchBar page={page} setBooksPagesCount={setBooksPagesCount} setBooks={setBooks}/>

                    <Stack spacing={2} sx={StackStyle}>
                        <Button onClick={handleAddBook}
                                sx={ButtonStyle}>
                            Create Book
                        </Button>
                    </Stack>

                    <BookList cards={books}/>
                    <CustomPagination page={page} maxPage={booksPagesCount} handleChange={handleChangePage}/>
                </TabPanel>

                <ClientsTab value={value}/>

                <UserReviewsTab value={value}/>
            </Container>
        </Box>
    );
}