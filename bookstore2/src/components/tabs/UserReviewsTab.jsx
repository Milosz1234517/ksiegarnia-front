import TabPanel from "./TabPanel";
import * as React from "react";
import {useCallback, useContext, useEffect} from "react";
import Context from "../../store/context";
import ReviewBox from "../other/ReviewBox";
import CustomPagination from "../other/CustomPagination";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export default function UserReviewsTab({value}) {

    const [pageReview, setPageReview] = React.useState(1);
    const [countReview, setCountReview] = React.useState(1);
    const [marks, setMarks] = React.useState([]);
    const ctx = useContext(Context);

    function handleChangePageReview(event, value) {
        setPageReview(value);
    }

    const getBookCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setCountReview(Math.ceil(obj / 2));

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForUserCount`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken]);

    useEffect(() => {
        getBookCount();
    }, [getBookCount, marks.length]);

    const getMarks = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setMarks(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForUser?page=${pageReview}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, pageReview]);

    useEffect(() => {
        getMarks();
    }, [getMarks]);

    const deleteReview = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/deleteReview?reviewId=${data}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });
            await response.json();
            return response

        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    function handleDeleteReview(reviewId) {
        deleteReview(reviewId).then(function (response) {
            if (response.ok) {
                const reviews = marks.filter((m) => m.reviewId !== reviewId)
                setMarks(reviews)
                if (reviews.length === 0 && pageReview - 1 > 0)
                    setPageReview(pageReview - 1)
            }
        })
    }

    return (
        <TabPanel value={value} index={2}>
            <CustomPagination page={pageReview} maxPage={countReview} handleChange={handleChangePageReview}/>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableBody>
                        {marks.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left"><ReviewBox review={row} title={true}/></TableCell>
                                <TableCell align="left"><Button
                                    onClick={() => handleDeleteReview(row.reviewId)}><DeleteIcon/></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </TabPanel>
    );
}