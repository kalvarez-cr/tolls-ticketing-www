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
import LanesIndex from './lanes/LanesIndex'
import EmployeesIndex from './employees/EmployeesIndex'
// import EquipmentForm from './equipmentForm'
// import TariffForm from './tariffForm'
import MainCard from 'ui-component/cards/MainCard'
import TollsForm from './tolls/TollForm'
import EquipsIndex from './equips/EquipsIndex'
import TariffIndex from './tariff/TariffIndex'

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
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    add?: boolean
    following?:boolean
}

export default function SimpleTabs({
    tollIdParam,
    readOnly,
    onlyView,
    tollData,
    add,
    following,
}: SimpleTabsProps) {

    const classes = useStyles()
    const [value, setValue] = React.useState(0) 
    const [create , setCreate] = React.useState( add === undefined ? true: false)
    console.log("create", create)
    console.log(tollData)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        console.log("add", add)
        if(add === undefined) setCreate(true)

    }
    console.log(tollData?.employers?.length > 0 )
    console.log(!(tollData?.employers?.length > 0 ))
    console.log(tollData?.equips?.length > 0 )
    console.log(!(tollData?.equips?.length > 0 ))
    return (
        <>
            <MainCard title="" content={false}>
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
                        disabled={!readOnly}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                        label="Empleados"
                        // {...a11yProps(2)}
                        disabled={!(tollData?.lanes?.length > 0)}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<PanoramaTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                        label="Equipos"
                        {...a11yProps(3)}
                        disabled={!(tollData?.employers?.length > 0 )}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<PanoramaTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                        label="Tarifas"
                        {...a11yProps(4)}
                        disabled={!(tollData?.equips?.length > 0)}
                    />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <TollsForm
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollData={tollData}
                    />
                </TabPanel>
                
                <TabPanel value={value} index={1}>
                    <LanesIndex 
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollsData={tollData ? tollData.lanes :""}
                        add={create}
                        following={following}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <EmployeesIndex
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollsData={tollData ? tollData.employers : ""} 
                        add={create}
                        following={following}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <EquipsIndex
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollsData={tollData ? tollData.equips :  ""} 
                        add={create}
                        following={following}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <TariffIndex
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollsData={tollData ? tollData.tariff :  ""} 
                        add={create}
                        following={following}
                    />
                </TabPanel>
            </MainCard>
        </>
    )
}
