import {Box, Stack} from "@mui/system";
import HomePageMenu from "../components/HomePageMenu";
import {Pagination, Typography} from "@mui/material";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import BookList from "../components/BookList";
import BookFilters from "../components/BookFilters";
import SearchBar from "../components/SearchBar";

export default function HomePage() {

    const [urlSearchParams, setUrlSearchParams] = useSearchParams(window.location.search);
    const [searchInput, setSearchInput] = React.useState('')


    const [categories, setCategories] = React.useState([])
    const [category, setCategory] = React.useState('')
    const [categoryChange, setCategoryChange] = React.useState('')

    const [books, setBooks] = React.useState([]);
    const [page, setPage] = React.useState(parseInt(urlSearchParams.get('page')) || 1);
    const [available, setAvailable] = React.useState(parseInt(urlSearchParams.get('available')) || false);
    const [booksAutocomplete, setBooksAutocomplete] = React.useState([]);
    const [booksPagesCount, setBooksPagesCount] = React.useState(1);
    const [filtersOn, setFilters] = React.useState(false);


    const [filterParams, setFilterParams] = useState({
        name: urlSearchParams.get('name') || '',
        surname: urlSearchParams.get('surname') || '',
        priceUp: urlSearchParams.get('priceUp') || '',
        priceDown: urlSearchParams.get('priceDown') || ''
    })

    const [searchParams, setSearchParams] = useState({
        title: urlSearchParams.get('bookTitle') || '',
        name: urlSearchParams.get('name') || '',
        surname: urlSearchParams.get('surname') || '',
        priceUp: urlSearchParams.get('priceUp') || '',
        priceDown: urlSearchParams.get('priceDown') || '',
        availableOnly: urlSearchParams.get('available') || false
    })

    const [textInput] = React.useState({
        name: React.useRef(null),
        surname: React.useRef(null),
        priceUp: React.useRef(null),
        priceDown: React.useRef(null)
    })

    const handleChange = (event, value) => {
        setPage(value);
        urlSearchParams.set('page', value)
        setUrlSearchParams(urlSearchParams)
    };

    const getCategories = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setCategories(obj)
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getCategories`,
            true,
            null,
            null
        );
        xhttp.send();

    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const getBooksCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setBooksPagesCount(Math.ceil(obj / 20));
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilterCount?title=${searchParams.title}&&name=${searchParams.name}&&surname=${searchParams.surname}&&priceHigh=${searchParams.priceUp}&&priceLow=${searchParams.priceDown}&&available=${searchParams.availableOnly}&&page=${page}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [page, searchParams.availableOnly, searchParams.name, searchParams.priceDown, searchParams.priceUp, searchParams.surname, searchParams.title]);

    useEffect(() => {
        getBooksCount();
    }, [getBooksCount]);

    const getBooks = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setBooks(obj)
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilter?title=${searchParams.title}&&name=${searchParams.name}&&surname=${searchParams.surname}&&priceHigh=${searchParams.priceUp}&&priceLow=${searchParams.priceDown}&&available=${searchParams.availableOnly}&&page=${page}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [page, searchParams.availableOnly, searchParams.name, searchParams.priceDown, searchParams.priceUp, searchParams.surname, searchParams.title]);

    useEffect(() => {
        getBooks();
    }, [getBooks]);

    useEffect(() => {
        setPage(parseInt(urlSearchParams.get('page')) || 1)
        setSearchParams({
            title: urlSearchParams.get('bookTitle') || '',
            name: urlSearchParams.get('name') || '',
            surname: urlSearchParams.get('surname') || '',
            priceUp: urlSearchParams.get('priceUp') || '',
            priceDown: urlSearchParams.get('priceDown') || '',
            availableOnly: urlSearchParams.get('available') || false
        })

        setFilterParams({
            name: urlSearchParams.get('name') || '',
            surname: urlSearchParams.get('surname') || '',
            priceUp: urlSearchParams.get('priceUp') || '',
            priceDown: urlSearchParams.get('priceDown') || ''
        })

        if (textInput.priceDown.current !== null)
            textInput.priceDown.current.value = urlSearchParams.get('priceDown') || '';

        if (textInput.priceUp.current !== null)
            textInput.priceUp.current.value = urlSearchParams.get('priceUp') || '';

        if (textInput.name.current !== null)
            textInput.name.current.value = urlSearchParams.get('name') || '';

        if (textInput.surname.current !== null)
            textInput.surname.current.value = urlSearchParams.get('surname') || '';

    }, [textInput.name, textInput.priceDown, textInput.priceUp, textInput.surname, urlSearchParams]);

    const getBooksSearch = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setBooksAutocomplete(obj);

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilter?title=${searchInput}&&available=false&&page=1`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [searchInput]);

    useEffect(() => {
        getBooksSearch();
    }, [getBooksSearch]);


    function handleChangeCat(event) {
        setCategoryChange(event.target.value);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <HomePageMenu/>

            <SearchBar
                filterParams={filterParams}
                searchInput={searchInput}
                filtersOn={filtersOn}
                available={available}
                booksAutocomplete={booksAutocomplete}
                setAvailable={setAvailable}
                setSearchInput={setSearchInput}
                setFilters={setFilters}
                setBooksAutocomplete={setBooksAutocomplete}
                setPage={setPage}/>

            {filtersOn &&
                <BookFilters filterParams={filterParams} searchParams={searchParams} textInput={textInput}/>
            }

            <Stack spacing={2} sx={{
                marginBottom: 2
            }}>
                <Pagination count={booksPagesCount} page={page} onChange={handleChange} sx={{
                    margin: "20px",
                    alignSelf: "center"
                }}/>
                <Typography sx={{
                    alignSelf: "center"
                }}>
                    Page: {page}
                </Typography>
            </Stack>

            {(urlSearchParams.get('bookTitle') || urlSearchParams.get('available')) && <Typography sx={{
                marginLeft: 10,
                marginBottom: 2
            }}>
                Search Results for "{searchParams.title}" stock available: {searchParams.availableOnly}
            </Typography>}

            <BookList cards={books}/>

        </Box>
    );
}