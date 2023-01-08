import {Box} from "@mui/system";
import {
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel, MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import BookFilters from "./BookFilters";
import {styled} from "@mui/material/styles";
import Context from "../../store/context";

export default function SearchBar({page, setBooksPagesCount, setBooks}) {

    const navigate = useNavigate();
    const [urlSearchParams] = useSearchParams(window.location.search);
    const [booksAutocomplete, setBooksAutocomplete] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('')
    const [available, setAvailable] = React.useState(parseInt(urlSearchParams.get('available')) || false);
    const [filtersOn, setFilters] = React.useState(false);
    const [category, setCategory] = useState('')
    const ctx = useContext(Context)
    const [filterParams, setFilterParams] = useState({
        name: urlSearchParams.get('name') || '',
        surname: urlSearchParams.get('surname') || '',
        priceUp: urlSearchParams.get('priceUp') || '',
        priceDown: urlSearchParams.get('priceDown') || '',
        category: urlSearchParams.get('category') || ''
    })

    const [searchParams, setSearchParams] = useState({
        title: urlSearchParams.get('bookTitle') || '',
        name: urlSearchParams.get('name') || '',
        surname: urlSearchParams.get('surname') || '',
        priceUp: urlSearchParams.get('priceUp') || '',
        priceDown: urlSearchParams.get('priceDown') || '',
        availableOnly: urlSearchParams.get('available') || false,
        category: urlSearchParams.get('category') || ''
    })

    const getBooksCount = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setBooksPagesCount(Math.ceil(obj / 20));
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilterCount?category=${searchParams.category}&title=${searchParams.title}&&name=${searchParams.name}&&surname=${searchParams.surname}&&priceHigh=${searchParams.priceUp}&&priceLow=${searchParams.priceDown}&&available=${searchParams.availableOnly}&&page=${page}`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [page, searchParams.availableOnly, searchParams.category, searchParams.name, searchParams.priceDown, searchParams.priceUp, searchParams.surname, searchParams.title, setBooksPagesCount]);

    useEffect(() => {
        getBooksCount();
    }, [getBooksCount]);

    const getBooks = useCallback(() => {
        try {
            const xHttp = new XMLHttpRequest();
            let json;
            let obj;
            xHttp.onreadystatechange = function () {

                if (this.readyState === 4) {
                    ctx.setIsLoading(false)
                }

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
                `http://localhost:8080/api/bookstore/getBooksFilter?category=${searchParams.category}&title=${searchParams.title}&&name=${searchParams.name}&&surname=${searchParams.surname}&&priceHigh=${searchParams.priceUp}&&priceLow=${searchParams.priceDown}&&available=${searchParams.availableOnly}&&page=${page}`,
                true,
                null,
                null
            );
            xHttp.send();

        }catch (e) {
            ctx.showErrorAlert("Connection lost");
        }

    }, [ctx, page, searchParams.availableOnly, searchParams.category, searchParams.name, searchParams.priceDown, searchParams.priceUp, searchParams.surname, searchParams.title, setBooks]);

    useEffect(() => {
        getBooks();
    }, [ctx, getBooks]);

    useEffect(() => {
        setSearchParams({
            title: urlSearchParams.get('bookTitle') || '',
            name: urlSearchParams.get('name') || '',
            surname: urlSearchParams.get('surname') || '',
            priceUp: urlSearchParams.get('priceUp') || '',
            priceDown: urlSearchParams.get('priceDown') || '',
            availableOnly: urlSearchParams.get('available') || false,
            category: urlSearchParams.get('category') || ''
        })

        setFilterParams({
            name: urlSearchParams.get('name') || '',
            surname: urlSearchParams.get('surname') || '',
            priceUp: urlSearchParams.get('priceUp') || '',
            priceDown: urlSearchParams.get('priceDown') || '',
            category: urlSearchParams.get('category') || ''
        })

        setCategory( urlSearchParams.get('category') || '')
        setAvailable(urlSearchParams.get('available') || false)

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
            `http://localhost:8080/api/bookstore/getBooksByTitle?title=${searchInput}&page=1`,
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
            ['category', category]

        ];

        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        })

        setSearchInput('')
    }

    function handleChangeAvailable(event) {
        setAvailable(event.target.value)
    }

    const StyledAutocomplete = styled(Autocomplete)(() => ({
        width: "100%",
        display: "flex",
        backgroundColor:"#e8eaf6",
        margin: 10,
        minWidth: 170
    }));

    const StyledMainBox = styled(Box)(() => ({
        display: "grid"
    }));

    const StyledSearchButton = styled(Button)(() => ({
        display: "inline-block",
        backgroundColor:"#e8eaf6",
        color: "#000",
        margin: 10
    }));

    const StyledFilterSwitch = styled(FormControlLabel)(() => ({
        display: "inline-block",
        margin: 10
    }));

    const StyledSearchResultLabel = {
        display: "inline-block",
        marginLeft: 2,
        marginTop: 5
    }

    const StyledBox = {
        display: "flex"
    }

    const StyledFormControl = {
        m: 2,
        minWidth: 150
    }

    return (
        <Box>
            <StyledMainBox>

                <Box sx={StyledBox}>
                    <StyledAutocomplete
                        freeSolo
                        onInputChange={(e, v) => {
                            setBooksAutocomplete([])
                            setSearchInput(v)
                        }}
                        inputValue={searchInput}
                        options={booksAutocomplete.map((book) => book)}
                        renderInput={(params) =>
                            <TextField {...params} label="Search Books"/>}/>

                    <StyledSearchButton onClick={handleSearchBooks}><SearchIcon/></StyledSearchButton>
                </Box>
            </StyledMainBox>

            <FormControl variant="filled" sx={StyledFormControl}>
                <Select
                    labelId="status-label"
                    id="status"
                    variant="standard"
                    value={available}
                    displayEmpty
                    onChange={handleChangeAvailable}>

                    <MenuItem value="false">
                        <em>Show All</em>
                    </MenuItem>

                    <MenuItem value="true">
                        Show Available
                    </MenuItem>

                </Select>
            </FormControl>

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
                    <BookFilters category={category} setCategory={setCategory} filterParams={filterParams} searchParams={searchParams}/>}

                {(urlSearchParams.get('bookTitle') || urlSearchParams.get('available')) &&
                    <Typography sx={StyledSearchResultLabel}>
                        Search Results for "{searchParams.title}"
                    </Typography>}
            </Box>

        </Box>
    )
}