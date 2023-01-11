import * as React from "react";
import TabPanel from "./TabPanel";
import CustomPagination from "../other/CustomPagination";
import {useCallback, useContext, useEffect} from "react";
import ReviewBox from "../other/ReviewBox";
import {Button, Card} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Context from "../../store/context";

const ButtonStyle = {
    margin: 2
}

const CardStyle = {
    flexGrow: 1, p: 4, display: "grid",
    marginBottom: 3,
    overflow: "auto"
}

export default function BookReviewsTab({value, book}) {

    const [marks, setMarks] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(1);
    const ctx = useContext(Context);

    const getBookCount = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;

        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.response;

                obj = JSON.parse(json);
                setCount(Math.ceil(obj / 20));

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForBookCount?bookHeaderId=${book.bookHeaderId}`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [book.bookHeaderId]);

    useEffect(() => {
        if (book.bookHeaderId !== undefined) {
            getBookCount();
        }
    }, [book.bookHeaderId, getBookCount]);

    const getReviewsForBook = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;

        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.response;

                obj = JSON.parse(json);
                setMarks(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForBook?bookHeaderId=${book.bookHeaderId}&page=${page}`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [book.bookHeaderId, page]);

    useEffect(() => {
        if (book.bookHeaderId !== undefined) {
            getReviewsForBook();
        }
    }, [book.bookHeaderId, getReviewsForBook]);

    const handleChangePage = (event, value) => {
        setPage(value);
    }

    function handleDeleteReview(reviewId) {
        ctx.deleteReview(reviewId).then(function (response) {
            if (response) {
                if (response.ok) {
                    const reviews = marks.filter((m) => m.reviewId !== reviewId)
                    setMarks(reviews)
                    if (reviews.length === 0 && page - 1 > 0)
                        setPage(page - 1)
                }
            }
        })
    }

    return (
        <TabPanel value={value} index={2}>
            <CustomPagination page={page} maxPage={count} handleChange={handleChangePage}/>

            {marks.map((row) => (

                <Card key={row.reviewId} sx={CardStyle}>
                    <ReviewBox review={row} user={true} title={true}/>

                    <Button sx={ButtonStyle} onClick={() => handleDeleteReview(row.reviewId)}>
                        <DeleteIcon/>
                    </Button>

                </Card>
            ))}

        </TabPanel>
    );
}
