import * as React from "react";
import {useCallback, useContext, useEffect} from "react";
import {Button, Card} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Context from "../../context/context";
import {config} from "../../config";
import CustomPagination from "../CustomPagination";
import ReviewBox from "../ReviewBox";
import TabPanel from "../TabPanel";

const ButtonStyle = {
    margin: 2
}

const CardStyle = {
    flexGrow: 1, p: 4, display: "grid",
    marginBottom: 3,
    overflow: "auto",
    backgroundColor: "#e8f5e9",
}


export default function UserReviewsTab({value}) {

    const [pageReview, setPageReview] = React.useState(1);
    const [countReview, setCountReview] = React.useState(1);
    const [marks, setMarks] = React.useState([]);
    const ctx = useContext(Context);

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    function handleChangePageReview(event, value) {
        setPageReview(value);
    }

    const getBookCount = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;

        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.response;

                obj = JSON.parse(json);
                setCountReview(Math.ceil(obj / 20));

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getReviewsForUserCount`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

    }, [ctx.authToken]);

    useEffect(() => {
        getBookCount();
    }, [getBookCount, marks.length]);

    const getMarks = useCallback(() => {
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
            `${config.serverAddress}/api/bookstore/getReviewsForUser?page=${pageReview}`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

    }, [ctx.authToken, pageReview]);

    useEffect(() => {
        getMarks();
    }, [getMarks]);

    const deleteReview = async (data) => {
        try {
            ctx.setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/deleteReview?reviewId=${data}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });

            ctx.setIsLoading(false)
            return response

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false)
    };

    function handleDeleteReview(reviewId) {
        deleteReview(reviewId).then(function (response) {
            if (response) {
                if (response.ok) {
                    const reviews = marks.filter((m) => m.reviewId !== reviewId)
                    setMarks(reviews)
                    if (reviews.length === 0 && pageReview - 1 > 0)
                        setPageReview(pageReview - 1)
                }
            }
        })
    }

    return (
        <TabPanel component={"span"} value={value} index={2}>
            <CustomPagination page={pageReview} maxPage={countReview} handleChange={handleChangePageReview}/>

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