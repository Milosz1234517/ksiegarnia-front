import {Box} from "@mui/system";
import HomePageMenu from "../components/HomePageMenu";
import * as React from "react";
import {useSearchParams} from "react-router-dom";
import BookList from "../components/book/BookList";
import SearchBar from "../components/book/SearchBar";
import CustomPagination from "../components/CustomPagination";
import {useEffect} from "react";
import StoreInfoMenu from "../components/StoreInfoMenu";
import {Container} from "@mui/material";

export default function HomePage() {

    const [urlSearchParams, setUrlSearchParams] = useSearchParams(window.location.search);
    const [page, setPage] = React.useState(parseInt(urlSearchParams.get('page')) || 1);
    const [books, setBooks] = React.useState([]);
    const [booksPagesCount, setBooksPagesCount] = React.useState(1);

    const handleChangePage = (event, value) => {
        setPage(value);
        urlSearchParams.set('page', value)
        setUrlSearchParams(urlSearchParams)
    };

    useEffect(() => {
        setPage(parseInt(urlSearchParams.get('page')) || 1)
    }, [setPage, urlSearchParams]);

    const BoxStyle = {
        margin: 1
    }

    return (
        <Box sx={{backgroundColor: "#c8e6c9"}}>
            <HomePageMenu/>
            <Container>
                <Box sx={BoxStyle}>
                    <SearchBar page={page} setBooksPagesCount={setBooksPagesCount} setBooks={setBooks}/>
                    <BookList cards={books}/>
                    <CustomPagination page={page} maxPage={booksPagesCount} handleChange={handleChangePage}/>
                </Box>
            </Container>
            <StoreInfoMenu/>
        </Box>

    );
}