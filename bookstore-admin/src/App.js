import {Alert, Backdrop, CircularProgress, createTheme, Paper, Snackbar, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {useContext} from "react";
import BookDetails from "./pages/BookDetails";
import Context from "./store/context";
import AccountPage from "./pages/AccountPage";
import NewBook from "./pages/NewBook";
import * as React from "react";
import HomePageOrders from "./pages/HomePageOrders";
import HomePageBooks from "./pages/HomePageBooks";
import HomePageClients from "./pages/HomePageClients";
import HomePageReviews from "./pages/HomePageReviews";
import {styled} from "@mui/material/styles";
import {GlobalStyles} from "@mui/system";

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
                <Route path="/orders" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePageOrders/>
                    )}/>


                <Route path="/books" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePageBooks/>
                    )}/>

                <Route path="/clients" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePageClients/>
                    )}/>

                <Route path="/reviews" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePageReviews/>
                    )}/>

                <Route path="/cockpit" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePage tab={0}/>
                    )}/>

                <Route path="/" element={
                    ctx.isLoggedIn ? (
                    <Navigate to="/cockpit" replace />
                ) : (
                    <LoginPage/>
                )}/>

                <Route path="/profile" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <AccountPage/>
                    )}/>

                <Route path="product/:bookHeaderId" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <BookDetails/>
                    )}/>

                <Route path="/createBook" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <NewBook/>
                    )}/>

                <Route path="search/" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePage tab={1}/>
                    )}/>

                <Route path="/searchOrder" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePage tab={0}/>
                    )}/>

                <Route path="searchClients/" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/" replace />
                    ) : (
                        <HomePage tab={2}/>
                    )}/>
            </Routes>

        </ThemeProvider>
    );
}

export default App;
