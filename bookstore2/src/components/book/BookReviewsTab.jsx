import * as React from "react";
import TabPanel from "../TabPanel";
import CustomPagination from "../CustomPagination";
import {useCallback, useEffect} from "react";
import ReviewBox from "../ReviewBox";
import {config} from "../../config";


export default function BookReviewsTab({value, book}) {

    const [marks, setBookReviewsList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(1);

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
            `${config.serverAddress}/api/bookstore/getReviewsForBookCount?bookHeaderId=${book.bookHeaderId}`,
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
                setBookReviewsList(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getReviewsForBook?bookHeaderId=${book.bookHeaderId}&page=${page}`,
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

    return (
        <TabPanel value={value} index={2}>

            <CustomPagination page={page} maxPage={count} handleChange={handleChangePage}/>

            {marks.map((review) => {
                return (
                    <ReviewBox key={review.reviewId} review={review} title={false}/>
                );
            })}
        </TabPanel>
    );
}
