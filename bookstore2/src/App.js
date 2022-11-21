import {createTheme, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import BasketPage from "./pages/BasketPage";
import {useContext, useEffect} from "react";
import BookDetails from "./pages/BookDetails";
import Context from "./store/context";

export const theme = createTheme();

theme.palette.primary.main = "#000";

function App() {

    const ctx = useContext(Context);

    return (
        <ThemeProvider theme={theme}>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
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
                    // path="search/:bookTitle/:available"
                    path="search/"
                    element={<HomePage/>}
                />
            </Routes>

        </ThemeProvider>
    );
}

export default App;
