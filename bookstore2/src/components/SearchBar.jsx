import {Box} from "@mui/system";
import {Autocomplete, Button, FormControlLabel, Switch, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";


export default function SearchBar({searchInput, setSearchInput, available, setAvailable, filtersOn, setFilters, setPage, filterParams, setBooksAutocomplete, booksAutocomplete}){

    const navigate = useNavigate();

    function handleSearchBooks() {
        const params = [
            ['bookTitle', searchInput],
            ['available', available],
            ['page', 1],
            // ['category', category],
            ['name', filterParams.name],
            ['surname', filterParams.surname],
            ['priceUp', filterParams.priceUp],
            ['priceDown', filterParams.priceDown],

        ];

        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`
        })

        setPage(1)
        setSearchInput('')
        setAvailable(false)
    }

    return(
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
    )
}