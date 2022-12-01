import * as React from "react";
import TabPanel from "./TabPanel";
import CustomPagination from "../other/CustomPagination";
import {useCallback, useEffect} from "react";
import ReviewBox from "../other/ReviewBox";


export default function BookReviewsTab({value, book}) {

    const [marks, setMarks] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(1);

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

    return (
        <TabPanel value={value} index={2}>

            <CustomPagination page={page} maxPage={count} handleChange={handleChangePage}/>

            {marks.map((review) => {

                return (
                    <ReviewBox review={review}/>
                );
            })}
        </TabPanel>
    );
}
