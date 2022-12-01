import HomePageMenu from "../components/other/HomePageMenu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/system";
import {Tab, Tabs,} from "@mui/material";
import AccountDetailsTab from "../components/tabs/AccountDetailsTab";
import OrderItemsTab from "../components/tabs/OrderItemsTab";
import UserReviewsTab from "../components/tabs/UserReviewsTab";

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

    return (
        <div>
            <HomePageMenu/>
            <Typography variant="h2"
                        component="a"
                        sx={{
                            margin: 4,
                        }}>
                Account
            </Typography>

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