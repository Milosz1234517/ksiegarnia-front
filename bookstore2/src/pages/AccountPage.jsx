import HomePageMenu from "../components/other/HomePageMenu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/system";
import {Tab, Tabs,} from "@mui/material";
import AccountDetailsTab from "../components/tabs/AccountDetailsTab";
import OrderItemsTab from "../components/tabs/OrderItemsTab";
import UserReviewsTab from "../components/tabs/UserReviewsTab";
import PageTitle from "../components/cart/PageTitle";
import {useContext, useEffect} from "react";
import Context from "../store/context";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab panel-${index}`,
    };
}

export default function AccountPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const ctx = useContext(Context)

    return (
        <div>
            <HomePageMenu/>
            <PageTitle title="Account"/>

            <Box sx={{width: '100%'}}>

                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable" aria-label="basic tabs example">
                        <Tab label="Account Details" {...a11yProps(0)} />
                        <Tab label="Orders" {...a11yProps(1)} />
                        <Tab label="Reviews" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <AccountDetailsTab value={value}/>
                <OrderItemsTab value={value}/>
                <UserReviewsTab value={value}/>

            </Box>
        </div>
    );
}