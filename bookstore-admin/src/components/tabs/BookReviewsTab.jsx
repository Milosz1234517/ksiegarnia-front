import * as React from "react";
import TabPanel from "./TabPanel";
import CustomPagination from "../other/CustomPagination";
import {useCallback, useContext, useEffect} from "react";
import ReviewBox from "../other/ReviewBox";
import {Button, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Context from "../../store/context";


export default function BookReviewsTab({value, book}) {

    const [marks, setMarks] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(1);
    const ctx = useContext(Context);

    const getBookCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setCount(Math.ceil(obj / 20));

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForBookCount?bookHeaderId=${book.bookHeaderId}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [book.bookHeaderId]);

    useEffect(() => {
        getBookCount();
    }, [getBookCount]);

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
            `http://localhost:8080/api/bookstore/getReviewsForBook?bookHeaderId=${book.bookHeaderId}&page=${page}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [book.bookHeaderId, page]);

    useEffect(() => {
        getMarks();
    }, [getMarks]);

    const handleChangePage = (event, value) => {
        setPage(value);
    }

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
        deleteReview(reviewId).then(function (response){
            if(response.ok){
                const reviews = marks.filter((m) => m.reviewId !== reviewId)
                setMarks(reviews)
                if(reviews.length === 0 && page - 1 > 0)
                    setPage(page - 1)
            }
        })
    }

    return (
        <TabPanel value={value} index={2}>

            <CustomPagination page={page} maxPage={count} handleChange={handleChangePage}/>

            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableBody>
                        {marks.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left"><ReviewBox review={row} user={false} title={false}/></TableCell>
                                <TableCell align="left"><Button onClick={() => handleDeleteReview(row.reviewId)}><DeleteIcon/></Button></TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );
}
