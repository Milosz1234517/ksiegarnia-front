import TabPanel from "./TabPanel";
import * as React from "react";
import {useCallback, useContext, useEffect} from "react";
import Context from "../../store/context";
import ReviewBox from "../other/ReviewBox";
import CustomPagination from "../other/CustomPagination";
import {Button, Card} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import {config} from "../../config";

const ButtonStyle = {
    margin: 2
}

const CardStyle = {
    flexGrow: 1, p: 4, display: "grid",
    backgroundColor: "#e8f5e9",
    marginBottom: 3,
    overflow: "auto"
}

export default function UserReviewsTab({value}) {

    const [pageReview, setPageReview] = React.useState(1);
    const [countReview, setCountReview] = React.useState(1);
    const [marks, setMarks] = React.useState([]);
    const ctx = useContext(Context);

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
            `${config.serverAddress}/api/bookstore/getReviewsForApproveCount`,
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
        const xmlHttpRequest = new XMLHttpRequest();
        let json;
        let obj;

        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xmlHttpRequest.response;

                obj = JSON.parse(json);
                setMarks(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xmlHttpRequest.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getReviewsForApprove?page=${pageReview}`,
            true,
            null,
            null
        );
        xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xmlHttpRequest.send();

    }, [ctx.authToken, pageReview]);

    useEffect(() => {
        if (value === 3)
            getMarks();
    }, [getMarks, value]);

    const approveReview = async (data) => {
        try {
            ctx.setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/approveReview?reviewId=${data}`, {
                method: "PUT",
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
        ctx.deleteReview(reviewId).then(function (response) {
            if (response.ok) {
                const reviews = marks.filter((m) => m.reviewId !== reviewId)
                setMarks(reviews)
                if (reviews.length === 0 && pageReview - 1 > 0)
                    setPageReview(pageReview - 1)
            }
        })
    }

    function handleApproveReview(reviewId) {
        approveReview(reviewId).then(function (response) {
            if (response.ok) {
                const reviews = marks.filter((m) => m.reviewId !== reviewId)
                setMarks(reviews)
                if (reviews.length === 0 && pageReview - 1 > 0)
                    setPageReview(pageReview - 1)
            }
        })
    }

    return (
        <TabPanel value={value} index={3}>
            <CustomPagination page={pageReview} maxPage={countReview} handleChange={handleChangePageReview}/>

            {marks.map((row) => (

                <Card key={row.reviewId} sx={CardStyle}>
                    <ReviewBox review={row} user={true} title={true}/>

                    <Button onClick={() => handleApproveReview(row.reviewId)}>
                        <CheckIcon/>
                    </Button>

                    <Button sx={ButtonStyle} onClick={() => handleDeleteReview(row.reviewId)}>
                        <DeleteIcon/>
                    </Button>

                </Card>
            ))}

        </TabPanel>
    );
}