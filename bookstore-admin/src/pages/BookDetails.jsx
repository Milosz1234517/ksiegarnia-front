import {
    Button,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tabs,
    Typography
} from "@mui/material";
import * as React from "react";
import HomePageMenu from "../components/other/HomePageMenu";
import {Box} from "@mui/system";
import {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Context from "../store/context";
import BookDescriptionTab from "../components/tabs/BookDescriptionTab";
import BookMoreDetailsTab from "../components/tabs/BookMoreDetailsTab";
import BookReviewsTab from "../components/tabs/BookReviewsTab";
import BookDetailsPhoto from "../components/book/BookDetailsPhoto";
import {useWindowResize} from "../components/other/WindowResizer";
import ChangeBookDetailsDialog from "../components/dialogs/ChangeBookDetailsDialog";
import AddAuthorDialog from "../components/dialogs/AddAuthorDialog";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCategoryDialog from "../components/dialogs/AddCategoryDialog";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab panel-${index}`,
    };
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
    const [size] = useWindowResize();

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
            `http://localhost:8080/api/bookstore/getBookWithDetails?bookHeaderId=${bookHeaderId}`,
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
            }else{
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
        <Box sx={{flexGrow: 1}}>
            <HomePageMenu/>

            <div>

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

                <Box sx={{display: "grid"}}>

                    <Grid container spacing={2} alignItems={"center"}>

                        <BookDetailsPhoto size={size} icon={book.icon}/>

                        <Grid item xs sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>

                                    <Typography sx={{margin: 2, marginTop: 4}} variant="h2">
                                        {book.bookTitle}
                                    </Typography>

                                    <Typography sx={{margin: 2}} variant="h5">
                                        Authors:
                                        <TableContainer>
                                            <Table aria-label="simple table">
                                                <TableBody>
                                                    {authors?.map((author) => (
                                                        <TableRow
                                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                                            <TableCell align="left">
                                                                <Typography Typography variant="body2"
                                                                            color="text.secondary"
                                                                            align={"left"}>
                                                                    {author.name} {author.surname}
                                                                </Typography>
                                                            </TableCell>

                                                            <TableCell align="left">
                                                                <IconButton onClick={() => handleDelete(author)}>
                                                                    <DeleteIcon/>
                                                                </IconButton>
                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>

                                    <Typography sx={{margin: 2}} variant="h5">
                                        Categories:
                                        <TableContainer>
                                            <Table aria-label="simple table">
                                                <TableBody>
                                                    {categories?.map((cat) => (
                                                        <TableRow
                                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                                            <TableCell align="left">
                                                                <Typography Typography variant="body2"
                                                                            color="text.secondary"
                                                                            align={"left"}>
                                                                    {cat.description}
                                                                </Typography>
                                                            </TableCell>

                                                            <TableCell align="left">
                                                                <IconButton onClick={() => handleDeleteCat(cat)}>
                                                                    <DeleteIcon/>
                                                                </IconButton>
                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{display: "grid"}}>
                    <Button sx={{margin: 2}} size="medium" variant="outlined"
                            onClick={handleEdit}>Edit</Button>

                    <Button sx={{margin: 2}} size="medium" variant="outlined"
                            onClick={handleAddAuthor}>Add Author</Button>

                    <Button sx={{margin: 2}} size="medium" variant="outlined"
                            onClick={handleAddCat}>Add Category</Button>
                </Box>


                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
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

            </div>
        </Box>
    );

}