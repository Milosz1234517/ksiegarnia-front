import {Box} from "@mui/system";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Context from "../../store/context";
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

export default function OrderFilters({searchParams, filterParams, status, setStatus}){

    const [urlSearchParams] = useSearchParams(window.location.search);
    const [statuses, setStatuses] = useState([])
    const ctx = useContext(Context)
    const [textInput] = React.useState({
        finalizedFrom: React.useRef(null),
        finalizedTo: React.useRef(null),
        placedFrom: React.useRef(null),
        placedTo: React.useRef(null),
        status: React.useRef(null)
    })

    useEffect(() => {
        if (textInput.finalizedFrom.current !== null)
            textInput.finalizedFrom.current.value = urlSearchParams.get('finalizedFrom') || '';

        if (textInput.finalizedTo.current !== null)
            textInput.finalizedTo.current.value = urlSearchParams.get('finalizedTo') || '';

        if (textInput.placedFrom.current !== null)
            textInput.placedFrom.current.value = urlSearchParams.get('placedFrom') || '';

        if (textInput.placedTo.current !== null)
            textInput.placedTo.current.value = urlSearchParams.get('placedTo') || '';

        if (textInput.status.current !== null)
            textInput.status.current.value = urlSearchParams.get('status') || '';

    }, [textInput.finalizedFrom, textInput.finalizedTo, textInput.name, textInput.placedFrom, textInput.placedTo, textInput.priceDown, textInput.priceUp, textInput.status, textInput.surname, urlSearchParams]);

    function handleChangeFinalizedTo(event) {
        filterParams.finalizedTo = event.target.value
    }

    function handleChangeFinalizedFrom(event) {
        filterParams.finalizedFrom = event.target.value
    }

    function handleChangePlacedTo(event) {
        filterParams.placedTo = event.target.value
    }

    function handleChangePlacedFrom(event) {
        filterParams.placedFrom = event.target.value
    }

    function handleChangeStatus(event) {
        setStatus(event.target.value)
        filterParams.status = event.target.value
    }

    const getStatuses = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setStatuses(obj)
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getStatuses`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

    }, [ctx.authToken]);

    useEffect(() => {
        getStatuses();
    }, [getStatuses]);

    return(
        <Box>
            <Box sx={BoxStyle}>
                <FormControl variant="standard" sx={FormControlStyle}>
                    <Select
                        labelId="status-label"
                        id="status"
                        variant="outlined"
                        value={status}
                        displayEmpty
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value="">
                            <em>Show All</em>
                        </MenuItem>
                        {statuses.map((option) => (
                            <MenuItem key={option.statusId} value={option.statusId}>
                                {option.description}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={BoxStyle}>
                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    variant="outlined"
                    id="finalizedFrom"
                    label="Finalized From"
                    name="finalizedFrom"
                    inputRef={textInput.finalizedFrom}
                    defaultValue={searchParams.finalizedFrom}
                    onChange={handleChangeFinalizedFrom}/>

            </Box>
            <Box sx={BoxStyle}>

                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    id="finalizedTo"
                    label="Finalized To"
                    type="date"
                    name="finalizedTo"
                    inputRef={textInput.finalizedTo}
                    defaultValue={searchParams.finalizedTo}
                    onChange={handleChangeFinalizedTo}/>

            </Box>

            <Box sx={BoxStyle}>

                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    id="placedFrom"
                    type="date"
                    label="Placed From"
                    name="placedFrom"
                    inputRef={textInput.placedFrom}
                    defaultValue={searchParams.placedFrom}
                    onChange={handleChangePlacedFrom}/>

            </Box>

            <Box sx={BoxStyle}>

                <TextField
                    margin="normal"
                    sx={TextFieldStyle}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="outlined"
                    id="placedTo"
                    type="date"
                    label="Placed To"
                    name="placedTo"
                    inputRef={textInput.placedTo}
                    defaultValue={searchParams.placedTo}
                    onChange={handleChangePlacedTo}/>

            </Box>
        </Box>
    )
}