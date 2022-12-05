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
import {useContext, useState} from "react";
import Grid from "@mui/material/Grid";
import Context from "../store/context";
import BookDescriptionTab from "../components/tabs/BookDescriptionTab";
import BookMoreDetailsTab from "../components/tabs/BookMoreDetailsTab";
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
    const [size] = useWindowResize();

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
                    setAuthors={setAuthors}/>

                <AddCategoryDialog
                    bookChange={book}
                    open={openCategories}
                    setOpen={setOpenCategories}
                    setCategories={setCategories}/>

                <Box sx={{display: "grid", overflow: "auto"}}>

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

                    <Button sx={{margin: 2}} size="medium" variant="outlined"
                            onClick={handleSave}>Save Book</Button>
                </Box>


                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs scrollButtons="auto" variant="scrollable" value={value} onChange={handleChange}
                          aria-label="basic tabs example">
                        <Tab label="Description" {...a11yProps(0)} />
                        <Tab label="Details" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <BookDescriptionTab value={value} book={book}/>
                <BookMoreDetailsTab value={value} book={book}/>

            </div>
        </Box>
    );

}