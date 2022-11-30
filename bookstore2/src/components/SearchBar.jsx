import {Box} from "@mui/system";
import {Autocomplete, Button, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import BookFilters from "./BookFilters";
import {styled} from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)(() => ({
    width: "100%",
    display: "flex",
    margin: 10,
    minWidth: 170
}));

const StyledMainBox = styled(Box)(() => ({
    display: "grid"
}));

const StyledSearchButton = styled(Button)(() => ({
    display: "inline-block",
    margin: 5
}));

const StyledAvailableSwitch = styled(FormControlLabel)(() => ({
    display: "inline-block",
    margin: 10
}));

const StyledFilterSwitch = styled(FormControlLabel)(() => ({
    display: "inline-block",
    margin: 10
}));

const StyledSearchResultLabel = styled(Typography)(() => ({
    display: "inline-block"
}));


export default function SearchBar({page, setBooksPagesCount, setBooks}) {

    const navigate = useNavigate();
    const [urlSearchParams] = useSearchParams(window.location.search);
    const [booksAutocomplete, setBooksAutocomplete] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('')
    const [available, setAvailable] = React.useState(parseInt(urlSearchParams.get('available')) || false);
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

    const getBooksCount = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setBooksPagesCount(Math.ceil(obj / 2));
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilterCount?title=${searchParams.title}&&name=${searchParams.name}&&surname=${searchParams.surname}&&priceHigh=${searchParams.priceUp}&&priceLow=${searchParams.priceDown}&&available=${searchParams.availableOnly}&&page=${page}`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [page, searchParams.availableOnly, searchParams.name, searchParams.priceDown, searchParams.priceUp, searchParams.surname, searchParams.title, setBooksPagesCount]);

    useEffect(() => {
        getBooksCount();
    }, [getBooksCount]);

    const getBooks = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setBooks(obj)
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilter?title=${searchParams.title}&&name=${searchParams.name}&&surname=${searchParams.surname}&&priceHigh=${searchParams.priceUp}&&priceLow=${searchParams.priceDown}&&available=${searchParams.availableOnly}&&page=${page}`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [page, searchParams.availableOnly, searchParams.name, searchParams.priceDown, searchParams.priceUp, searchParams.surname, searchParams.title, setBooks]);

    useEffect(() => {
        getBooks();
    }, [getBooks]);

    useEffect(() => {
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

    }, [urlSearchParams]);


    const getBooksSearch = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setBooksAutocomplete(obj);

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilter?title=${searchInput}&&available=false&&page=1`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [searchInput]);

    useEffect(() => {
        getBooksSearch();
    }, [getBooksSearch]);

    function handleSearchBooks() {
        const params = [
            ['bookTitle', searchInput],
            ['available', available],
            ['page', 1],
            ['name', filterParams.name],
            ['surname', filterParams.surname],
            ['priceUp', filterParams.priceUp],
            ['priceDown', filterParams.priceDown],

        ];

        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        })

        setSearchInput('')
        setAvailable(false)
    }

    return (
        <Box>
            <StyledMainBox>

                <Box sx={{display: "flex"}}>
                    <StyledAutocomplete
                        freeSolo
                        onInputChange={(e, v) => {
                            setBooksAutocomplete([])
                            setSearchInput(v)
                        }}
                        inputValue={searchInput}
                        options={booksAutocomplete.map((book) => book.bookTitle)}
                        renderInput={(params) =>
                            <TextField {...params} label="Search Books"/>}/>

                    <StyledSearchButton onClick={handleSearchBooks}><SearchIcon/></StyledSearchButton>
                </Box>
            </StyledMainBox>

            <StyledAvailableSwitch
                control={
                    <Switch
                        checked={available}
                        onChange={() => {
                            setAvailable(!available)
                        }}
                        name="loading"
                        color="primary"/>}
                label="In Stock Only"/>

            <StyledFilterSwitch
                control={
                    <Switch
                        checked={filtersOn}
                        onChange={() => setFilters(!filtersOn)}
                        name="loading"
                        color="primary"/>}
                label="Filters"/>


            <Box>
                {filtersOn &&
                    <BookFilters filterParams={filterParams} searchParams={searchParams}/>}

                {(urlSearchParams.get('bookTitle') || urlSearchParams.get('available')) &&
                    <StyledSearchResultLabel sx={{marginLeft: 2, marginTop: 5 }}>
                        Search Results for "{searchParams.title}" stock available: {searchParams.availableOnly}
                    </StyledSearchResultLabel>}
            </Box>

        </Box>
    )
}