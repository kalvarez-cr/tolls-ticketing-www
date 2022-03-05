import React from 'react'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { Box, Tab, Tabs, Typography, Theme } from '@material-ui/core'

// assets
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone'
import PanoramaTwoToneIcon from '@material-ui/icons/PanoramaTwoTone'
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone'
import RecentActorsTwoToneIcon from '@material-ui/icons/RecentActorsTwoTone'
import LineForm from './lineForm'
import EmployeesForm from './employeesForm'
import EquipmentForm from './equipmentForm'
import TariffForm from './tariffForm'

// tab content
function TabPanel(props: {
    children: React.ReactElement | string
    value: number
    index: number
}) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        p: 3,
                    }}
                >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    accountTab: {
        marginBottom: '24px',
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            marginRight: '18px',
            color: theme.palette.grey[600],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.main,
        },
        '& a > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
        },
    },
    badgeSecondary: {
        color: theme.palette.secondary.main,
        background: theme.palette.secondary.light,
        marginLeft: '10px',
    },
}))

// ================================|| UI TABS - SAMPLE ||================================ //

interface SimpleTabsProps {
    tollsIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
}

export default function SimpleTabs({
    tollsIdParam,
    readOnly,
    onlyView,
}: SimpleTabsProps) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                className={classes.accountTab}
            >
                <Tab
                    component={Link}
                    to="#"
                    icon={
                        <PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    }
                    label="Datos del peaje"
                    {...a11yProps(0)}
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={
                        <RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    }
                    label="Canales"
                    {...a11yProps(1)}
                    disabled
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label="Empleados"
                    disabled
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<PanoramaTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label="Equipos"
                    {...a11yProps(3)}
                    disabled
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <LineForm readOnly />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EmployeesForm />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <EquipmentForm />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TariffForm />
            </TabPanel>
        </>
    )
}
