import {Box} from "@mui/system";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {config} from "../../config";

const BoxStyle = {
    display: "inline-block",
    margin: 1
}

const TextFieldStyle = {
    margin: 1,
    backgroundColor:"#e8eaf6",
}

const FormControlStyle = {
    m: 1,
    minWidth: 150,
    backgroundColor:"#e8eaf6"
}

export default function BookFilters({searchParams, filterParams, category, setCategory}){

    const [urlSearchParams] = useSearchParams(window.location.search);
    const [categories, setCategories] = useState([])
    const [textInput] = React.useState({
        name: React.useRef(null),
        surname: React.useRef(null),
        priceUp: React.useRef(null),
        priceDown: React.useRef(null)
    })

    const getCategories = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setCategories(obj)
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getCategories`,
            true,
            null,
            null
        );
        xHttp.send();

    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

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

    function handleChangeCategory(event) {
        setCategory(event.target.value)
        filterParams.category = event.target.value
    }

    return(
        <Box>
            <Box sx={BoxStyle}>
                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    fullWidth
                    variant="outlined"
                    id="priceDown"
                    type="number"
                    label="Price Down"
                    name="priceDown"
                    autoComplete="price"
                    defaultValue={searchParams.priceDown}
                    inputRef={textInput.priceDown}
                    onChange={handleChangePriceDown}/>
            </Box>
            <Box sx={BoxStyle}>
                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    fullWidth
                    variant="outlined"
                    id="priceLow"
                    label="Price Up"
                    name="priceUp"
                    inputRef={textInput.priceUp}
                    type="number"
                    autoComplete="price"
                    defaultValue={searchParams.priceUp}
                    onChange={handleChangePriceUp}/>
            </Box>

            <Box sx={BoxStyle}>
                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    fullWidth
                    variant="outlined"
                    id="authorName"
                    label="Author Name"
                    name="authorName"
                    inputRef={textInput.name}
                    autoComplete="Name"
                    defaultValue={searchParams.name}
                    onChange={handleChangeName}/>

            </Box>

            <Box sx={BoxStyle}>
                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    fullWidth
                    variant="outlined"
                    id="authorSurname"
                    label="Author Surname"
                    name="authorSurname"
                    inputRef={textInput.surname}
                    autoComplete="Surname"
                    defaultValue={searchParams.surname}
                    onChange={handleChangeSurname}/>
            </Box>

            <Box sx={BoxStyle}>
                <FormControl variant="standard" sx={FormControlStyle}>
                    <Select
                        labelId="status-label"
                        id="status"
                        variant="outlined"
                        value={category}
                        displayEmpty
                        onChange={handleChangeCategory}>

                        <MenuItem value="">
                            <em>All Categories</em>
                        </MenuItem>

                        {categories.map((option) => (
                            <MenuItem key={option.categoryId} value={option.description}>
                                {option.description}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}