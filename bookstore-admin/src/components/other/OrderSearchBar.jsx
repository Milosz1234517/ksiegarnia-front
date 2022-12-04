import {Box} from "@mui/system";
import {Autocomplete, Button, FormControlLabel, Switch, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Context from "../../store/context";
import OrderFilters from "./OrderFilters";

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

const StyledFilterSwitch = styled(FormControlLabel)(() => ({
    display: "inline-block",
    margin: 10
}));


export default function OrderSearchBar({page, setCount, setOrders}) {

    const navigate = useNavigate();
    const ctx = useContext(Context)
    const [urlSearchParams] = useSearchParams(window.location.search);
    const [status, setStatus] = useState('')
    const [searchInput, setSearchInput] = React.useState(urlSearchParams.get('orderNumber') || '')
    const [filtersOn, setFilters] = React.useState(false);
    const [filterParams, setFilterParams] = useState({
        finalizedFrom: urlSearchParams.get('finalizedFrom') || '',
        finalizedTo: urlSearchParams.get('finalizedTo') || '',
        placedFrom: urlSearchParams.get('placedFrom') || '',
        placedTo: urlSearchParams.get('placedTo') || '',
        status: urlSearchParams.get('status') || '',
    })
    const [searchParams, setSearchParams] = useState({
        orderNumber: urlSearchParams.get('orderNumber') || '',
        finalizedFrom: urlSearchParams.get('finalizedFrom') || '',
        finalizedTo: urlSearchParams.get('finalizedTo') || '',
        placedFrom: urlSearchParams.get('placedFrom') || '',
        placedTo: urlSearchParams.get('placedTo') || '',
        status: urlSearchParams.get('status') || '',
    })

    const getOrders = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;
                obj = JSON.parse(json);
                setOrders(obj)
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getOrdersFilterAdmin?finalizedFrom=${searchParams.finalizedFrom}&finalizedTo=${searchParams.finalizedTo}&orderId=${searchParams.orderNumber}&page=${page}&placedFrom=${searchParams.placedFrom}&placedTo=${searchParams.placedTo}&status=${searchParams.status}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, page, searchParams.finalizedFrom, searchParams.finalizedTo, searchParams.orderNumber, searchParams.placedFrom, searchParams.placedTo, searchParams.status, setOrders]);

    const getOrdersCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;
                obj = JSON.parse(json);
                setCount(Math.ceil(obj / 2));
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getOrdersFilterAdminCount?finalizedFrom=${searchParams.finalizedFrom}&finalizedTo=${searchParams.finalizedTo}&orderId=${searchParams.orderNumber}&page=${page}&placedFrom=${searchParams.placedFrom}&placedTo=${searchParams.placedTo}&status=${searchParams.status}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, page, searchParams.finalizedFrom, searchParams.finalizedTo, searchParams.orderNumber, searchParams.placedFrom, searchParams.placedTo, searchParams.status, setCount]);

    useEffect(() => {
        getOrdersCount()
    }, [getOrdersCount]);

    useEffect(() => {
        getOrders()
    }, [getOrders]);

    useEffect(() => {
        setSearchParams({
            orderNumber: urlSearchParams.get('orderNumber') || '',
            finalizedFrom: urlSearchParams.get('finalizedFrom') || '',
            finalizedTo: urlSearchParams.get('finalizedTo') || '',
            placedFrom: urlSearchParams.get('placedFrom') || '',
            placedTo: urlSearchParams.get('placedTo') || '',
            status: urlSearchParams.get('status') || ''
        })

        setFilterParams({
            finalizedFrom: urlSearchParams.get('finalizedFrom') || '',
            finalizedTo: urlSearchParams.get('finalizedTo') || '',
            placedFrom: urlSearchParams.get('placedFrom') || '',
            placedTo: urlSearchParams.get('placedTo') || '',
            status: urlSearchParams.get('status') || ''
        })

        setStatus(urlSearchParams.get('status') || '')
        setSearchInput(urlSearchParams.get('orderNumber') || '')

    }, [urlSearchParams]);

    function handleSearchBooks() {
        const params = [
            ['orderNumber', searchInput],
            ['page', 1],
            ['finalizedFrom', filterParams.finalizedFrom],
            ['finalizedTo', filterParams.finalizedTo],
            ['placedFrom', filterParams.placedFrom],
            ['placedTo', filterParams.placedTo],
            ['status', status],
        ];

        navigate({
            pathname: '/searchOrder',
            search: `?${createSearchParams(params)}`
        })

        // setSearchInput('')
    }

    return (
        <Box>
            <StyledMainBox>
                <Box sx={{display: "flex"}}>
                    <StyledAutocomplete
                        freeSolo
                        onInputChange={(e, v) => {
                            setSearchInput(v)
                        }}
                        inputValue={searchInput}
                        options={[]}
                        renderInput={(params) =>
                            <TextField {...params} label="Search Order"/>}/>

                    <StyledSearchButton onClick={handleSearchBooks}><SearchIcon/></StyledSearchButton>
                </Box>
            </StyledMainBox>

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
                    <OrderFilters status={status} setStatus={setStatus} filterParams={filterParams} searchParams={searchParams}/>}
            </Box>

        </Box>
    )
}