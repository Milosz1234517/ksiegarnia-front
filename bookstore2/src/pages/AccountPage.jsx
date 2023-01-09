import HomePageMenu from "../components/HomePageMenu";
import * as React from "react";
import {Box} from "@mui/system";
import {Container, Tab, Tabs,} from "@mui/material";
import AccountDetailsTab from "../components/account/AccountDetailsTab";
import OrderItemsTab from "../components/order/OrderItemsTab";
import UserReviewsTab from "../components/account/UserReviewsTab";
import PageTitle from "../components/PageTitle";

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

    const MainBoxStyle = {
        width: '100%'
    }

    const BoxStyle = {
        borderBottom: 1, borderColor: 'divider'
    }

    return (
        <div>
            <HomePageMenu/>
            <Container>
                <PageTitle title="Account" center={false}/>

                <Box sx={MainBoxStyle}>

                    <Box sx={BoxStyle}>
                        <Tabs value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable"
                              aria-label="basic tabs example">
                            <Tab label="Account Details" {...a11yProps(0)} />
                            <Tab label="Orders" {...a11yProps(1)} />
                            <Tab label="Reviews" {...a11yProps(2)} />
                        </Tabs>
                    </Box>

                    <AccountDetailsTab value={value}/>
                    <OrderItemsTab value={value}/>
                    <UserReviewsTab value={value}/>

                </Box>
            </Container>
        </div>
    );
}