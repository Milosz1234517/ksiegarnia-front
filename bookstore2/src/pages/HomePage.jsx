import {Box} from "@mui/system";
import HomePageMenu from "../components/HomePageMenu";
import * as React from "react";
import {useSearchParams} from "react-router-dom";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import CustomPagination from "../components/CustomPagination";
import {useEffect} from "react";

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

    return (
        <Box sx={{flexGrow: 1}}>
            <HomePageMenu/>
            <SearchBar page={page} setBooksPagesCount={setBooksPagesCount} setBooks={setBooks}/>
            <CustomPagination page={page} maxPage={booksPagesCount} handleChange={handleChangePage}/>
            <BookList cards={books}/>
        </Box>
    );
}