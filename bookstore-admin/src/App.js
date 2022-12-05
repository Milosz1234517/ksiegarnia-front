import {createTheme, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {useContext, useEffect} from "react";
import BookDetails from "./pages/BookDetails";
import Context from "./store/context";
import AccountPage from "./pages/AccountPage";
import NewBook from "./pages/NewBook";
import * as React from "react";
import HomePageOrders from "./pages/HomePageOrders";
import HomePageBooks from "./pages/HomePageBooks";
import HomePageClients from "./pages/HomePageClients";
import HomePageReviews from "./pages/HomePageReviews";

export const theme = createTheme();

theme.palette.primary.main = "#000";

function App() {

    const ctx = useContext(Context);

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    return (
        <ThemeProvider theme={theme}>

            <Routes>
                <Route path="/orders" element={<HomePageOrders/>}/>
                <Route path="/books" element={<HomePageBooks/>}/>
                <Route path="/clients" element={<HomePageClients/>}/>
                <Route path="/reviews" element={<HomePageReviews/>}/>
                <Route path="/" element={<HomePage tab={0}/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/profile" element={
                    !ctx.isLoggedIn ? (
                        <Navigate to="/login" replace />
                    ) : (
                        <AccountPage/>
                    )}/>
                <Route
                    path="product/:bookHeaderId"
                    element={<BookDetails/>}
                />
                <Route
                    path="/createBook"
                    element={<NewBook/>}
                />
                <Route
                    path="search/"
                    element={<HomePage tab={1}/>}
                />
                <Route
                    path="searchOrder/"
                    element={<HomePage tab={0}/>}
                />

                <Route
                    path="searchClients/"
                    element={<HomePage tab={2}/>}
                />
            </Routes>

        </ThemeProvider>
    );
}

export default App;
