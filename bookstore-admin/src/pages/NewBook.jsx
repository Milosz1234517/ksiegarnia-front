import {
    Button, Container,
    Tab,
    Tabs,
} from "@mui/material";
import * as React from "react";
import HomePageMenu from "../components/other/HomePageMenu";
import {Box, GlobalStyles} from "@mui/system";
import {useContext, useEffect, useState} from "react";
import Context from "../store/context";
import BookDescriptionTab from "../components/tabs/BookDescriptionTab";
import BookMoreDetailsTab from "../components/tabs/BookMoreDetailsTab";
import ChangeBookDetailsDialog from "../components/dialogs/ChangeBookDetailsDialog";
import AddAuthorDialog from "../components/dialogs/AddAuthorDialog";
import AddCategoryDialog from "../components/dialogs/AddCategoryDialog";
import BookReviewsTab from "../components/tabs/BookReviewsTab";
import BookDetailsFrontGrid from "../components/book/BookDetailsFrontGrid";

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

export default function NewBook() {

    const ctx = useContext(Context)

    const [value, setValue] = React.useState(0);
    const [book, setBook] = React.useState({
        bookAuthors: [],
        bookTitle: "New Book Template",
        description: "Enter some description",
        edition: 0,
        icon: "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png",
        price: 0,
        publishingHouse: {name: ""},
        quantity: 0,
        releaseDate: "2000-01-01",
        bookCategories: []
    });
    const [bookCopy, setBookCopy] = useState({})
    const [publishingHouseCopy, setPublishingHouseCopy] = useState({})
    const [authors, setAuthors] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openAuthor, setOpenAuthor] = useState(false)
    const [openCategories, setOpenCategories] = useState(false)

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleEdit() {
        setPublishingHouseCopy({name: book.publishingHouse.name})
        setBookCopy(JSON.parse(JSON.stringify(book)))
        setOpen(true)
    }

    function handleAddAuthor() {
        setOpenAuthor(true)
    }

    function handleDelete(author) {
        book.bookAuthors = book.bookAuthors.filter((a) => a !== author)
        setAuthors(book.bookAuthors)
    }

    function handleDeleteCat(cat) {
        book.bookCategories = book.bookCategories.filter((c) => c !== cat)
        setCategories(book.bookCategories)
    }

    function handleAddCat() {
        setOpenCategories(true)
    }

    function handleConfirm() {
        setBookCopy({})
        setPublishingHouseCopy({})
        setOpen(false);
    }

    function handleSave() {
        ctx.createBook(book).then((res) => {
            if(res){
                if(res.ok) {
                    window.location.reload()
                }
            }
        })
    }

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
                setAuthors={setAuthors}/>

            <AddCategoryDialog
                bookChange={book}
                open={openCategories}
                setOpen={setOpenCategories}
                setCategories={setCategories}/>

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

                    <Button sx={ButtonStyle} size="medium" variant="outlined"
                            onClick={handleSave}>Save Book</Button>

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