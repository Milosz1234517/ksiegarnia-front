import {
    Button, Container,
    Tab,
    Tabs,
} from "@mui/material";
import * as React from "react";
import HomePageMenu from "../components/other/HomePageMenu";
import {Box, GlobalStyles} from "@mui/system";
import {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Context from "../store/context";
import BookDescriptionTab from "../components/tabs/BookDescriptionTab";
import BookMoreDetailsTab from "../components/tabs/BookMoreDetailsTab";
import BookReviewsTab from "../components/tabs/BookReviewsTab";
import ChangeBookDetailsDialog from "../components/dialogs/ChangeBookDetailsDialog";
import AddAuthorDialog from "../components/dialogs/AddAuthorDialog";
import AddCategoryDialog from "../components/dialogs/AddCategoryDialog";
import BookDetailsFrontGrid from "../components/book/BookDetailsFrontGrid";
import {config} from "../config";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab panel-${index}`,
    };
}

const MainBoxStyle = {
    flexGrow: 1,
}

const GlobalStyle = {
    body: {backgroundColor: "#e8f5e9"},
}

const ButtonBoxStyle = {
    display: "grid"
}

const ButtonStyle = {
    margin: 2,
    backgroundColor: "#000",
    color: "white"
}

const TabBoxStyle = {
    borderBottom: 1,
    borderColor: 'divider'
}

export default function BookDetails() {

    let {bookHeaderId} = useParams();
    const ctx = useContext(Context)

    const [value, setValue] = React.useState(0);
    const [book, setBook] = React.useState({});
    const [bookCopy, setBookCopy] = useState({})
    const [publishingHouseCopy, setPublishingHouseCopy] = useState({})
    const [authors, setAuthors] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openAuthor, setOpenAuthor] = useState(false)
    const [openCategories, setOpenCategories] = useState(false)

    const getBooksSearch = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;

        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.response;

                obj = JSON.parse(json);
                setBook(obj)
                setAuthors(obj.bookAuthors)
                setCategories(obj.bookCategories)
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getBookWithDetails?bookHeaderId=${bookHeaderId}`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [bookHeaderId]);

    useEffect(() => {
        getBooksSearch();
    }, [getBooksSearch]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleConfirm() {
        ctx.changeBookDetails(book).then(function (response) {
            if (!response.ok) {
                setBook({
                    bookAuthors: bookCopy.bookAuthors,
                    bookTitle: bookCopy.bookTitle,
                    bookHeaderId: bookCopy.bookHeaderId,
                    description: bookCopy.description,
                    edition: bookCopy.edition,
                    icon: bookCopy.icon,
                    price: bookCopy.price,
                    publishingHouse: publishingHouseCopy,
                    quantity: bookCopy.quantity,
                    releaseDate: bookCopy.releaseDate,
                    bookCategories: bookCopy.bookCategories
                })
            }
            setBookCopy({})
            setPublishingHouseCopy({})
            setOpen(false);
        })
    }

    function handleEdit() {
        setPublishingHouseCopy({name: book.publishingHouse.name})
        setBookCopy({
            bookAuthors: book.bookAuthors,
            bookTitle: book.bookTitle,
            bookHeaderId: book.bookHeaderId,
            description: book.description,
            edition: book.edition,
            icon: book.icon,
            price: book.price,
            publishingHouse: book.publishingHouse,
            quantity: book.quantity,
            releaseDate: book.releaseDate,
            bookCategories: book.bookCategories
        })
        setOpen(true)
    }

    function handleAddAuthor() {
        setOpenAuthor(true)
    }

    function handleDelete(author) {
        const deepClone = JSON.parse(JSON.stringify(book));
        book.bookAuthors = book.bookAuthors.filter((a) => a !== author)
        ctx.changeBookDetails(book).then(function (response) {
            if (response.ok) {
                setAuthors(book.bookAuthors)
            } else {
                setBook(deepClone)
            }
        })
    }

    function handleDeleteCat(cat) {
        const deepClone = JSON.parse(JSON.stringify(book));
        book.bookCategories = book.bookCategories.filter((c) => c !== cat)
        ctx.changeBookDetails(book).then(function (response) {
            if (response.ok) {
                setCategories(book.bookCategories)
            } else {
                setBook(deepClone)
            }
        })
    }

    function handleAddCat() {
        setOpenCategories(true)
    }

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    return (
        <Box sx={MainBoxStyle}>
            <HomePageMenu/>

            <ChangeBookDetailsDialog
                book={book}
                bookCopy={bookCopy}
                publishingHouseCopy={publishingHouseCopy}
                open={open}
                onConfirm={handleConfirm}
                setBook={setBook}
                setOpen={setOpen}/>

            <AddAuthorDialog
                bookChange={book}
                open={openAuthor}
                setOpen={setOpenAuthor}
                setAuthors={setAuthors}
                handeChange={ctx.changeBookDetails}/>

            <AddCategoryDialog
                bookChange={book}
                open={openCategories}
                setOpen={setOpenCategories}
                setCategories={setCategories}
                handeChange={ctx.changeBookDetails}/>

            <GlobalStyles
                styles={GlobalStyle}
            />

            <Container>

                <BookDetailsFrontGrid
                    book={book}
                    categories={categories}
                    authors={authors}
                    handleDeleteAuthor={handleDelete}
                    handleDeleteCategory={handleDeleteCat}/>

                <Box sx={ButtonBoxStyle}>
                    <Button sx={ButtonStyle} size="medium" variant="outlined"
                            onClick={handleEdit}>Edit</Button>

                    <Button sx={ButtonStyle} size="medium" variant="outlined"
                            onClick={handleAddAuthor}>Add Author</Button>

                    <Button sx={ButtonStyle} size="medium" variant="outlined"
                            onClick={handleAddCat}>Add Category</Button>
                </Box>


                <Box sx={TabBoxStyle}>
                    <Tabs scrollButtons="auto" variant="scrollable" value={value} onChange={handleChange}
                          aria-label="basic tabs example">
                        <Tab label="Description" {...a11yProps(0)} />
                        <Tab label="Details" {...a11yProps(1)} />
                        <Tab label="Marks" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <BookDescriptionTab value={value} book={book}/>

                <BookMoreDetailsTab value={value} book={book}/>

                <BookReviewsTab value={value} book={book}/>

            </Container>

        </Box>
    );

}