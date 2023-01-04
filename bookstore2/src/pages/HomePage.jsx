import {Box} from "@mui/system";
import HomePageMenu from "../components/other/HomePageMenu";
import * as React from "react";
import {useSearchParams} from "react-router-dom";
import BookList from "../components/book/BookList";
import SearchBar from "../components/other/SearchBar";
import CustomPagination from "../components/other/CustomPagination";
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
        <Box sx={{flexGrow: 5, backgroundColor: "#b2ebf2"}}>
            <HomePageMenu/>
            <Box sx={{margin: 1}}>
                <SearchBar page={page} setBooksPagesCount={setBooksPagesCount} setBooks={setBooks}/>
                <BookList cards={books}/>
                <CustomPagination page={page} maxPage={booksPagesCount} handleChange={handleChangePage}/>
            </Box>
        </Box>
    );
}