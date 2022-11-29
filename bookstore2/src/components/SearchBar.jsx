import {Box} from "@mui/system";
import {Autocomplete, Button, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import BookFilters from "./BookFilters";


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
        <div>
            <Box sx={{display: "flex"}} justifyContent={"center"}>

                <Autocomplete spacing={2} sx={{width: "100%", marginLeft: 10, marginTop: 3, minWidth: 300}}
                              freeSolo
                              onInputChange={(e, v) => {
                                  setBooksAutocomplete([])
                                  setSearchInput(v)
                              }}
                              inputValue={searchInput}
                              options={booksAutocomplete.map((book) => book.bookTitle)}
                              renderInput={(params) =>
                                  <TextField {...params} label="Search Books"/>}
                />
                <Button sx={{marginTop: 3, marginLeft: 2}} onClick={handleSearchBooks}><SearchIcon/></Button>

                <FormControlLabel
                    sx={{
                        marginTop: 3, marginRight: 2, marginLeft: 2
                    }}
                    control={
                        <Switch
                            checked={available}
                            onChange={() => {
                                setAvailable(!available)
                            }}
                            name="loading"
                            color="primary"
                        />
                    }
                    label="Available"
                />

                <FormControlLabel
                    sx={{
                        marginTop: 3, marginRight: 10
                    }}
                    control={
                        <Switch
                            checked={filtersOn}
                            onChange={() => setFilters(!filtersOn)}
                            name="loading"
                            color="primary"
                        />
                    }
                    label="Filters"
                />
            </Box>
            <Box>
                {filtersOn &&
                    <BookFilters filterParams={filterParams} searchParams={searchParams}/>
                }
                <Box>
                </Box>
                {(urlSearchParams.get('bookTitle') || urlSearchParams.get('available')) && <Typography sx={{
                    marginLeft: 10,
                    marginBottom: 2
                }}>
                    Search Results for "{searchParams.title}" stock available: {searchParams.availableOnly}
                </Typography>}

            </Box>
        </div>

    )
}