import {createTheme, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {useContext} from "react";
import BookDetails from "./pages/BookDetails";
import Context from "./store/context";
import AccountPage from "./pages/AccountPage";

export const theme = createTheme();

theme.palette.primary.main = "#000";

function App() {

    const ctx = useContext(Context);

    return (
        <ThemeProvider theme={theme}>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
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
                    path="search/"
                    element={<HomePage/>}
                />
            </Routes>

        </ThemeProvider>
    );
}

export default App;
