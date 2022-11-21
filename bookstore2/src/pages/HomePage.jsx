import {Box, Stack} from "@mui/system";
import HomePageMenu from "../components/HomePageMenu";
import {
    Autocomplete,
    Button, ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardMedia, FormControlLabel, MenuItem,
    Pagination, Paper, Switch, TextField,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Grid';
import * as React from "react";
import {useCallback, useContext, useEffect} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {createSearchParams, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Context from "../store/context";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    alignSelf: "center",
});

export default function HomePage() {

    const [searchParams, setSearchParams] = useSearchParams(window.location.search);

    const [input, setInput] = React.useState('')
    const [categories, setCategories] = React.useState([])
    const [category, setCategory] = React.useState('')
    const [categoryChange, setCategoryChange] = React.useState('')
    const [title, setTitle] = React.useState(searchParams.get('bookTitle') || '')
    const [cards, setCards] = React.useState([]);
    const [page, setPage] = React.useState(parseInt(searchParams.get('page')) || 1);
    const [books, setBooks] = React.useState([]);
    const [count, setCount] = React.useState(1);
    const [filtersOn, setFilters] = React.useState(false);
    const [availableOnly, setAvailableOnly] = React.useState(searchParams.get('available') || false);
    const [available, setAvailable] = React.useState(searchParams.get('available') || false);

    const [name, setName] = React.useState(searchParams.get('name') || '');
    const [nameChange, setNameChange] = React.useState(searchParams.get('name') || '');

    const [surname, setSurname] = React.useState(searchParams.get('surname') || '');
    const [surnameChange, setSurnameChange] = React.useState(searchParams.get('surname') || '');

    const [priceUp, setPriceUp] = React.useState(searchParams.get('priceUp') || '');
    const [priceUpChange, setPriceUpChange] = React.useState(searchParams.get('priceUp') || '');

    const [priceDown, setPriceDown] = React.useState(searchParams.get('priceDown') || '');
    const [priceDownChange, setPriceDownChange] = React.useState(searchParams.get('priceDown') || '');

    const navigate = useNavigate();
    const ctx = useContext(Context);

    const handleChange = (event, value) => {
        setPage(value);
        searchParams.set('page', value)
        setSearchParams(searchParams)
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
                setCount(Math.ceil(obj / 20));
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilterCount?title=${title}&&name=${name}&&surname=${surname}&&priceHigh=${priceUp}&&priceLow=${priceDown}&&available=${available}&&page=${page}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [available, name, page, priceDown, priceUp, surname, title]);

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
                setCards(obj)
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilter?title=${title}&&name=${name}&&surname=${surname}&&priceHigh=${priceUp}&&priceLow=${priceDown}&&available=${available}&&page=${page}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [title, name, surname, priceUp, priceDown, available, page]);

    useEffect(() => {
        getBooks();
    }, [getBooks]);

    const textInput = React.useRef(null);
    const textInput1 = React.useRef(null);
    const textInput2 = React.useRef(null);
    const textInput3 = React.useRef(null);

    useEffect(() => {
        setPage(parseInt(searchParams.get('page')) || 1)
        setTitle(searchParams.get('bookTitle') || '')
        setName(searchParams.get('name') || '')
        setSurname(searchParams.get('surname') || '')
        setPriceUp(searchParams.get('priceUp') || '')
        setPriceDown(searchParams.get('priceDown') || '')
        setAvailable(searchParams.get('available') || false)

        setSurnameChange(searchParams.get('surname') || '')
        setNameChange(searchParams.get('name') || '')
        setPriceDownChange(searchParams.get('priceDown') || '')
        setPriceUpChange(searchParams.get('priceUp') || '')

        if (textInput.current !== null)
            textInput.current.value = searchParams.get('priceDown') || '';

        if (textInput1.current !== null)
            textInput1.current.value = searchParams.get('priceUp') || '';

        if (textInput2.current !== null)
            textInput2.current.value = searchParams.get('name') || '';

        if (textInput3.current !== null)
            textInput3.current.value = searchParams.get('surname') || '';

    }, [searchParams]);

    function handleSearchBooks() {
        const params = [
            ['bookTitle', input],
            ['available', availableOnly],
            ['page', 1],
            ['category', category],
            ['name', nameChange],
            ['surname', surnameChange],
            ['priceUp', priceUpChange],
            ['priceDown', priceDownChange],

        ];

        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        })

        setPage(1)
        setInput('')
        setAvailableOnly(false)
    }

    const getBooksSearch = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setBooks(obj);

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBooksFilter?title=${input}&&available=false&&page=1`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [input]);

    useEffect(() => {
        getBooksSearch();
    }, [getBooksSearch]);


    function handleChangeCat(event) {
        setCategoryChange(event.target.value);
    }

    function handleChangeSurname(event) {
        setSurnameChange(event.target.value)
    }

    function handleChangeName(event) {
        setNameChange(event.target.value)
    }

    function handleChangePriceUp(event) {
        setPriceUpChange(event.target.value)
    }

    function handleChangePriceDown(event) {
        setPriceDownChange(event.target.value)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <HomePageMenu/>

            <Box sx={{display: "flex"}} justifyContent={"center"}>

                <Autocomplete spacing={2} sx={{width: "100%", marginLeft: 10, marginTop: 3, minWidth: 300}}
                              freeSolo
                              onInputChange={(e, v) => {
                                  setBooks([])
                                  setInput(v)
                              }}
                              inputValue={input}
                              options={books.map((book) => book.bookTitle)}
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
                            checked={availableOnly}
                            onChange={() => {
                                setAvailableOnly(!availableOnly)
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

            {filtersOn &&
                <Box>
                    <Box sx={{display: "flex"}} justifyContent={"center"}>

                        <Typography sx={{marginLeft: 10, marginRight: 5, marginTop: 4}}>Price</Typography>

                        <TextField
                            margin="normal"
                            sx={{marginRight: 5, marginLeft: 5}}
                            fullWidth
                            variant="filled"
                            id="priceDown"
                            type="number"
                            label="Price Down"
                            name="priceDown"
                            autoComplete="price"
                            defaultValue={priceDown}
                            inputRef={textInput}
                            onChange={handleChangePriceDown}
                            autoFocus/>

                        <Typography sx={{marginRight: 4, marginLeft: 5, marginTop: 4}}>To</Typography>

                        <TextField
                            margin="normal"
                            sx={{marginLeft: 5, marginRight: 25}}
                            fullWidth
                            variant="filled"
                            id="priceLow"
                            label="Price Up"
                            name="priceUp"
                            inputRef={textInput1}
                            type="number"
                            autoComplete="price"
                            defaultValue={priceUp}
                            onChange={handleChangePriceUp}
                            autoFocus/>

                    </Box>

                    <Box sx={{display: "flex"}} justifyContent={"center"}>
                        <Typography sx={{marginLeft: 10, marginRight: 5, marginTop: 4}}>Author</Typography>

                        <TextField
                            margin="normal"
                            sx={{marginLeft: 4, marginRight: 11}}
                            fullWidth
                            variant="filled"
                            id="authorName"
                            label="Author Name"
                            name="authorName"
                            inputRef={textInput2}
                            autoComplete="Name"
                            defaultValue={name}
                            onChange={handleChangeName}
                            autoFocus/>

                        <TextField
                            margin="normal"
                            sx={{marginLeft: 11, marginRight: 25}}
                            fullWidth
                            variant="filled"
                            id="authorSurname"
                            label="Author Surname"
                            name="authorSurname"
                            inputRef={textInput3}
                            autoComplete="Surname"
                            defaultValue={surname}
                            onChange={handleChangeSurname}
                            autoFocus/>

                    </Box>
                </Box>
            }

            <Stack spacing={2} sx={{
                marginBottom: 2
            }}>
                <Pagination count={count} page={page} onChange={handleChange} sx={{
                    margin: "20px",
                    alignSelf: "center"
                }}/>
                <Typography sx={{
                    alignSelf: "center"
                }}>
                    Page: {page}
                </Typography>
            </Stack>

            {(searchParams.get('bookTitle') || searchParams.get('available')) && <Typography sx={{
                marginLeft: 10,
                marginBottom: 2
            }}>
                Search Results for "{title}" stock available: {available}
            </Typography>}

            <Grid container spacing={1} sx={{
                display: "grid",
                margin: "auto",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridGap: "20px",
            }}>
                {cards.map((cards) => {
                    const {authors, bookHeaderId, bookTitle, price, quantity} = cards;

                    function handleAddToCart() {
                        ctx.addItemToCart(bookHeaderId)
                    }

                    return (
                        <Grid item>
                            <Paper
                                key={bookHeaderId}
                                sx={{
                                    p: 1,
                                    margin: 'auto',
                                    maxWidth: 300,
                                    gridTemplateRows: "1fr auto",
                                    gridGap: "8px",
                                    height: "100%",
                                    minHeight: 150,
                                    flexGrow: 1,
                                }}
                            >
                                <Grid container spacing={6}>
                                    <Grid item>
                                        <ButtonBase sx={{width: 128, height: 128}}>
                                            <Img alt="complex"
                                                 src="https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"/>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}
                                              sx={{maxHeight: 10, height: "100%"}}>
                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="a"
                                                    href={`/product/${bookHeaderId}`}
                                                    sx={{
                                                        color: 'inherit',
                                                        textDecoration: 'none',
                                                    }}>
                                                    {bookTitle}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {authors.map((author) => {
                                                        return (
                                                            <Typography Typography variant="body2"
                                                                        color="text.secondary"
                                                                        align={"left"}>
                                                                {author.name} {author.surname}
                                                            </Typography>
                                                        )
                                                    })}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align={"left"} sx={{marginLeft: 1}} variant="subtitle1" component="div">
                                        Price: {price} zł
                                    </Typography>

                                    <Typography align={"left"} variant="body2" sx={{marginLeft: 1, marginBottom: 5}}
                                                color="text.secondary">
                                        Available: {quantity}
                                    </Typography>
                                    <Button size="medium" variant="outlined" onClick={handleAddToCart}>Add to
                                        Cart</Button>
                                </Grid>

                            </Paper>


                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}