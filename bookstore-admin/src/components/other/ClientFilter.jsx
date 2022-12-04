import {Box} from "@mui/system";
import {Button, FormControl, TextField} from "@mui/material";
import * as React from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/material/styles";

const StyledSearchButton = styled(Button)(() => ({
    display: "inline-block",
    margin: 5
}));

export default function ClientFilter({pageUsers, setUsers, setUsersCount}) {

    const [urlSearchParams] = useSearchParams(window.location.search);
    const ctx = useContext(Context)
    const navigate = useNavigate();
    const [filterParams, setFilterParams] = useState({
        name: urlSearchParams.get('name') || '',
        surname: urlSearchParams.get('surname') || '',
        login: urlSearchParams.get('login') || '',
    })
    const [searchParams, setSearchParams] = useState({
        name: urlSearchParams.get('name') || '',
        surname: urlSearchParams.get('surname') || '',
        login: urlSearchParams.get('login') || '',
    })
    const [textInput] = React.useState({
        name: React.useRef(null),
        surname: React.useRef(null),
        login: React.useRef(null),
    })

    const getUsers = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setUsers(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getUsersFilter?name=${searchParams.name}&page=${pageUsers}&surname=${searchParams.surname}&login=${searchParams.login}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, pageUsers, searchParams.login, searchParams.name, searchParams.surname, setUsers]);

    useEffect(() => {
        getUsers()
    }, [getUsers]);

    const getUsersCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setUsersCount(Math.ceil(obj / 2));

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getUsersFilterCount?name=${searchParams.name}&surname=${searchParams.surname}&login=${searchParams.login}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, searchParams.login, searchParams.name, searchParams.surname, setUsersCount]);

    useEffect(() => {
        getUsersCount()
    }, [getUsersCount]);

    useEffect(() => {
        if (textInput.name.current !== null)
            textInput.name.current.value = urlSearchParams.get('name') || '';

        if (textInput.surname.current !== null)
            textInput.surname.current.value = urlSearchParams.get('surname') || '';

        if (textInput.login.current !== null)
            textInput.login.current.value = urlSearchParams.get('login') || '';

    }, [textInput.login, textInput.name, textInput.priceDown, textInput.priceUp, textInput.surname, urlSearchParams]);

    useEffect(() => {
        setSearchParams({
            name: urlSearchParams.get('name') || '',
            surname: urlSearchParams.get('surname') || '',
            login: urlSearchParams.get('login') || '',
        })

        setFilterParams({
            name: urlSearchParams.get('name') || '',
            surname: urlSearchParams.get('surname') || '',
            login: urlSearchParams.get('login') || '',
        })

    }, [urlSearchParams]);

    function handleSearchClients() {
        const params = [
            ['page', 1],
            ['name', filterParams.name],
            ['surname', filterParams.surname],
            ['login', filterParams.login],
        ];

        navigate({
            pathname: '/searchClients',
            search: `?${createSearchParams(params)}`
        })
    }

    function handleChangeSurname(event) {
        filterParams.surname = event.target.value
    }

    function handleChangeName(event) {
        filterParams.name = event.target.value
    }

    function handleChangeLogin(event) {
        filterParams.login = event.target.value
    }

    return (
        <Box>
            <Box sx={{display: "inline-block", margin: 1}}>
                <TextField
                    margin="normal"
                    sx={{margin: 1}}
                    fullWidth
                    variant="filled"
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    inputRef={textInput.login}
                    autoComplete="Email"
                    defaultValue={searchParams.login}
                    onChange={handleChangeLogin}
                    autoFocus/>
            </Box>

            <Box sx={{display: "inline-block", margin: 1}}>
                <TextField
                    margin="normal"
                    sx={{margin: 1}}
                    fullWidth
                    variant="filled"
                    id="name"
                    label="Name"
                    name="name"
                    inputRef={textInput.name}
                    autoComplete="Name"
                    defaultValue={searchParams.name}
                    onChange={handleChangeName}
                    autoFocus/>

            </Box>
            <Box sx={{display: "inline-block", margin: 1}}>

                <TextField
                    margin="normal"
                    sx={{margin: 1}}
                    fullWidth
                    variant="filled"
                    id="surname"
                    label="Surname"
                    name="surname"
                    inputRef={textInput.surname}
                    autoComplete="Surname"
                    defaultValue={searchParams.surname}
                    onChange={handleChangeSurname}
                    autoFocus/>

            </Box>

            <FormControl variant="standard" sx={{m: 3}}>
                <Button onClick={handleSearchClients}><SearchIcon/></Button>
            </FormControl>

        </Box>
    )
}