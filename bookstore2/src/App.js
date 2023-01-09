import {
    Alert,
    Backdrop,
    CircularProgress,
    CssBaseline, Paper,
    Snackbar,
    ThemeProvider,
} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import {Navigate, Route, Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import BasketPage from "./pages/BasketPage";
import {useContext} from "react";
import BookDetails from "./pages/BookDetails";
import Context from "./context/context";
import AccountPage from "./pages/AccountPage";
import {GlobalStyles} from "@mui/joy";
import {styled} from "@mui/material/styles";
import DescriptionPage from "./pages/DescriptionPage";
import {config} from "./config";
import ContactPage from "./pages/ContactPage";
import * as React from "react";

export const theme = createTheme();

theme.palette.primary.main = "#43a047";

export const PaperWithShadow = styled(Paper)(() => ({
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}
}));

export const BlackButton = {
    backgroundColor:"#000",
    color:"white"
}

export const TableRowStyle = {
    '&:last-child td, &:last-child th': {border: 0}
}

export const ContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10
}

const Loading = (props) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.isOpen}
        >
            <CircularProgress />
        </Backdrop>
    );
};

function App() {

    const ctx = useContext(Context);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    body: { backgroundColor: "#c8e6c9" },
                }}
            />
            <Snackbar open={ctx.error.isError} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    {ctx.error.message}
                </Alert>
            </Snackbar>
            <Snackbar open={ctx.success.isSuccess} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    {ctx.success.message}
                </Alert>
            </Snackbar>
            <Loading isOpen={ctx.isLoading} />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/profile" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/login" replace />
                    ) : (
                        <AccountPage/>
                    )}/>
                <Route path="/basket"
                       element={
                           !ctx.isLoggedIn ? (
                               <Navigate to="/login" replace />
                           ) : (
                               <BasketPage/>
                           )}
                />
                <Route
                    path="product/:bookHeaderId"
                    element={<BookDetails/>}
                />
                <Route
                    path="search/"
                    element={<HomePage/>}
                />
                <Route
                    path="about/"
                    element={<DescriptionPage desc={config.aboutUs} title={"About Us"}/>}
                />
                <Route
                    path="policies/"
                    element={<DescriptionPage desc={config.policies} title={"Policies And Rules"}/>}
                />
                <Route
                    path="contact/"
                    element={<ContactPage/>}
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
