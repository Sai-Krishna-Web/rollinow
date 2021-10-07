import React from 'react';
import { PageHeader, SectionsList } from 'components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
}

const ThemeTabs = withStyles((theme) => ({
    root: {
        borderBottom: '1px solid #ddd'
    },
    indicator: {
        backgroundColor: theme.palette.primary[800]
    }
}))(Tabs);

const ThemeTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        '&:hover': {
            color: theme.palette.primary[800],
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
    const { pageData, tab, handleTabChange, loading, error, data, columns, onRowClick } = props;
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
                {!data || loading ? (
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
                            <SectionsList
                                rows={data.allSections.data}
                                columns={columns}
                                onRowClick={onRowClick}
                                editClick={props.editClick}
                                deleteClick={props.deleteClick}
                                refetch={props.refetch}
                                count={data.allSections.hits}
                            />
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <SectionsList
                                rows={data.allSections.data.filter((section) => section.shown)}
                                columns={columns}
                                onRowClick={onRowClick}
                                editClick={props.editClick}
                                deleteClick={props.deleteClick}
                                refetch={props.refetch}
                                //count={data.allSections.hits}
                            />
                        </TabPanel>
                    </>
                )}
            </div>
        </div>
    );
};

export default SectionsComponent;
