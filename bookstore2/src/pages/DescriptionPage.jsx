import {
    Container,
    TextField,
} from "@mui/material";
import {Box} from "@mui/system";
import * as React from "react";
import HomePageMenu from "../components/HomePageMenu";
import {useWindowResize} from "../components/WindowResizer";
import PageTitle from "../components/PageTitle";
import {GlobalStyles} from "@mui/joy";

export default function DescriptionPage({desc, title}) {

    const size = useWindowResize()

    const BoxStyle = {
        marginBottom: 10,
        justifyContent: "center"
    }

    const TextFieldStyle = {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
        },
        backgroundColor: "white", width: size[0] * 0.8
    }

    const ContainerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    }

    return (
        <Box>
            <GlobalStyles
                styles={{
                    body: { backgroundColor: "#c8e6c9" },
                }}
            />
            <HomePageMenu/>
            <Container
                component="main"
                maxWidth="xs"
                sx={ContainerStyle}>

                <Box sx={BoxStyle}>

                    <PageTitle title={title} center={true}/>

                    <TextField
                        sx={TextFieldStyle}
                        multiline
                        disabled
                        id="standard-basic"
                        variant="outlined"
                        defaultValue={desc}
                    />
                </Box>
            </Container>
        </Box>
    );
};
