import React from 'react';
import { PageHeader, SectionsList } from 'components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ThemeTabs = withStyles((theme) => ({
    root: {
        borderBottom: '1px solid #ddd'
    },
    indicator: {
        backgroundColor: theme.palette.primary.light
    }
}))(Tabs);

const ThemeTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        '&:hover': {
            color: theme.palette.primary.light,
            opacity: 1
        },
        '&$selected': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold
        },
        '&:focus': {
            color: theme.palette.primary.main
        }
    },
    selected: {}
}))((props) => <Tab disableRipple {...props} />);

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const SectionsComponent = (props) => {
    const { pageData, tab, handleTabChange, loading, error, data } = props;
    return (
        <div style={{ margin: 'auto' }}>
            <PageHeader pageData={pageData} />
            <div style={{ height: '600px', textAlign: 'center' }}>
                <div position="static" color="default">
                    <ThemeTabs
                        value={tab}
                        onChange={handleTabChange}
                        aria-label="section tabs"
                        centered
                        variant="fullWidth"
                    >
                        <ThemeTab label="All" {...a11yProps(0)} />
                        <ThemeTab label="Active" {...a11yProps(1)} />
                    </ThemeTabs>
                </div>
                {loading ? (
                    <Box textAlign="center" py={5}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box textAlign="center" py={5}>
                        An error occurred, please try reloading your browser.
                    </Box>
                ) : (
                    <>
                        <TabPanel value={tab} index={0}>
                            <SectionsList rows={data.allSections.data} />
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            Active sections here
                        </TabPanel>
                    </>
                )}
            </div>
        </div>
    );
};

export default SectionsComponent;