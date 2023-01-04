import {Alert, Backdrop, CircularProgress, createTheme, Snackbar, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import BasketPage from "./pages/BasketPage";
import {useContext} from "react";
import BookDetails from "./pages/BookDetails";
import Context from "./store/context";
import AccountPage from "./pages/AccountPage";
import {deepPurple, green, indigo, lime, teal, yellow} from "@mui/material/colors";

export const theme = createTheme(
    {
        palette: {
            primary: indigo,
            secondary: indigo,
        },
    }
);

//theme.palette.primary.main = "#000";

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
            </Routes>

        </ThemeProvider>
    );
}

export default App;
