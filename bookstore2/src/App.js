import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import BasketPage from "./pages/BasketPage";
import {useEffect} from "react";
import BookDetails from "./pages/BookDetails";

export const theme = createTheme();

theme.palette.primary.main = "#000";

function App() {

    return (
        <ThemeProvider theme={theme}>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/basket" element={<BasketPage/>}/>
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
