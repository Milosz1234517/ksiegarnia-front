import TabPanel from "./TabPanel";
import * as React from "react";
import {useCallback, useContext, useEffect} from "react";
import Context from "../../store/context";
import ReviewBox from "../other/ReviewBox";
import CustomPagination from "../other/CustomPagination";


export default function UserReviewsTab({value}){

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
            `http://localhost:8080/api/bookstore/getReviewsForUser?page=${pageReview}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, pageReview]);

    useEffect(() => {
        if(value === 2)
            getMarks();
    }, [getMarks, value]);

    return(
        <TabPanel value={value} index={2}>
            <CustomPagination page={pageReview} maxPage={countReview} handleChange={handleChangePageReview}/>
            {marks.map((review) => {
                return (
                    <ReviewBox review={review}/>
                );
            })}
        </TabPanel>
    );
}