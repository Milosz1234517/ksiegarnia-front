import {Box} from "@mui/system";
import {TextField, Typography} from "@mui/material";
import * as React from "react";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";


export default function BookFilters({searchParams, filterParams}){

    const [urlSearchParams] = useSearchParams(window.location.search);
    const [textInput] = React.useState({
        name: React.useRef(null),
        surname: React.useRef(null),
        priceUp: React.useRef(null),
        priceDown: React.useRef(null)
    })

    useEffect(() => {
        if (textInput.priceDown.current !== null)
            textInput.priceDown.current.value = urlSearchParams.get('priceDown') || '';

        if (textInput.priceUp.current !== null)
            textInput.priceUp.current.value = urlSearchParams.get('priceUp') || '';

        if (textInput.name.current !== null)
            textInput.name.current.value = urlSearchParams.get('name') || '';

        if (textInput.surname.current !== null)
            textInput.surname.current.value = urlSearchParams.get('surname') || '';

    }, [textInput.name, textInput.priceDown, textInput.priceUp, textInput.surname, urlSearchParams]);

    function handleChangeSurname(event) {
        filterParams.surname = event.target.value
    }

    function handleChangeName(event) {
        filterParams.name = event.target.value
    }

    function handleChangePriceUp(event) {
        filterParams.priceUp = event.target.value
    }

    function handleChangePriceDown(event) {
        filterParams.priceDown = event.target.value
    }

    return(
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
                    defaultValue={searchParams.priceDown}
                    inputRef={textInput.priceDown}
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
                    inputRef={textInput.priceUp}
                    type="number"
                    autoComplete="price"
                    defaultValue={searchParams.priceUp}
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
                    inputRef={textInput.name}
                    autoComplete="Name"
                    defaultValue={searchParams.name}
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
                    inputRef={textInput.surname}
                    autoComplete="Surname"
                    defaultValue={searchParams.surname}
                    onChange={handleChangeSurname}
                    autoFocus/>

            </Box>
        </Box>
    )
}