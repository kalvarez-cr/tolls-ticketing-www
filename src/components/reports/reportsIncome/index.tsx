import React from 'react'
import { useSelector } from 'react-redux'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    // CardActions,
    CardContent,
    Grid,
    Tab,
    Tabs,
    Theme,
    Typography,
} from '@material-ui/core'

// project imports

import MainCard from 'ui-component/cards/MainCard'
import { gridSpacing } from 'store/constant'

// assets
import { DefaultRootStateProps } from 'types'
import DetailsIncomeReportsForm from './DetailsIncomeReportsForm'
// import ReportsTypeEquipment from 'components/icons/ReportsTypeEquipment'
import ReportsIcome from '../../icons/ReportsIcome'
import DetailsTable from './DetailsTable'
import Analytics from './indexReport'
import { RESPONSE } from '../../../_mockApis/summary_criterias/reports'
// import {  useNavigate } from 'react-router'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    profileTab: {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none',
        },
        '& button': {
            color:
                theme.palette.mode === 'dark'
                    ? theme.palette.grey[600]
                    : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[50],
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
            marginTop: '10px',
            height: '20px',
            width: '20px',
        },
        '& button > div > span': {
            display: 'block',
        },
        '& > div > span': {
            display: 'none',
        },
    },
    cardPanels: {
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.mode === 'dark' ? '#333d5e' : '#eeeeee',
        height: '100%',
    },
}))

// tabs
function TabPanel(props: {
    children: React.ReactElement
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
            {value === index && <div>{children}</div>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

// tabs option
const tabsOption = [
    {
        label: 'Detalles por consolidados',
        icon: <ReportsIcome />,
        caption: 'Detalles de tipos de consolidados',
    },
    // {
    //     label: 'Billing',
    //     icon: <ReportsIcome />,
    //     caption: 'Billing Information',
    //     url: '/profile'
    // },
    // {
    //     label: 'Payment',
    //     icon: <CreditCardTwoToneIcon />,
    //     caption: 'Add & Update Card',
    // },
    // {
    //     label: 'Change Password',
    //     icon: <VpnKeyTwoToneIcon />,
    //     caption: 'Update Profile Security',
    // },
]

// ==============================|| PROFILE 2 ||============================== //
interface Date {
    initial: string
    final: string 
}
const DetailsReportsIncomeIndex = () => {
    const classes = useStyles()
    // const navigate = useNavigate()
    const customization = useSelector(
        (state: DefaultRootStateProps) => state.customization
    )
    // const response = useSelector(
    //     (state: DefaultRootStateProps) => state.reportsIncome
    // )

    const response = RESPONSE
    const [value, setValue] = React.useState<number>(0)
    const [viewTable, setViewTable] = React.useState<boolean>(false)
    const [viewAnalytics, setViewAnalytics] = React.useState<boolean>(false)
    const [date, setDate] = React.useState<Date | {}>({})

    const handleViewTable = () => {
        console.log('handleViewTable')
        setViewTable(true)
        setViewAnalytics(false)
        return
    }
    const handleViewAnalytics = () => {
        console.log('handleViewTable')
        setViewAnalytics(true)
        setViewTable(false)
        return

    }
    const handleDate =(val: Object)=> {
        console.log('set - date')
        setDate(val)
        console.log(date)
        // return date
    }

    const handleChange = (event: React.SyntheticEvent) => {
        console.log(event)
        // navigate()
        setValue(0)
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                { !viewTable && !viewAnalytics && (
                    <>
                        <MainCard title="" content={false}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} lg={4}>
                                    <CardContent>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            orientation="vertical"
                                            className={classes.profileTab}
                                            variant="scrollable"
                                            sx={{
                                                '& button': {
                                                    borderRadius: `${customization.borderRadius}px`,
                                                },
                                            }}
                                        >
                                            {tabsOption.map((tab, index) => (
                                                <Tab
                                                    key={index}
                                                    icon={tab.icon}
                                                    label={
                                                        <Grid
                                                            container
                                                            direction="column"
                                                        >
                                                            <Typography
                                                                variant="subtitle1"
                                                                color="inherit"
                                                            >
                                                                {tab.label}
                                                            </Typography>
                                                            <Typography
                                                                component="div"
                                                                variant="caption"
                                                                sx={{
                                                                    textTransform:
                                                                        'none',
                                                                }}
                                                            >
                                                                {tab.caption}
                                                            </Typography>
                                                        </Grid>
                                                    }
                                                    {...a11yProps(index)}
                                                />
                                            ))}
                                        </Tabs>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={12} lg={8}>
                                    <CardContent className={classes.cardPanels}>
                                        <TabPanel value={value} index={0}>
                                            <DetailsIncomeReportsForm
                                                handleView={() => {
                                                    handleViewAnalytics()
                                                }}
                                                handleData={(val) => {handleDate(val)}}
                                            />
                                        </TabPanel>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </>
                )}
                {viewAnalytics && response && (
                    <div>
                    {/* <MainCard title="" content={false}> */}
                        <div className="">
                            {/* <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} lg={4}> */}
                                {/* <CardContent> */}
                                <Analytics   handleViewTable={() => {
                                        handleViewTable()
                                    }}  
                                    />
                                {/* <DetailsTable  
                                    handleView={() => {
                                        handleViewTable()
                                    }} 
                                    date={date} 
                                /> */}
                                {/* </CardContent> */}
                            {/* </Grid>
                            </Grid>         */}
                        </div>
                        {/* </MainCard> */}
                    </div>
                )}
                {viewTable && (
                    <div>
                        <MainCard title="" content={false}>
                                    <DetailsTable  
                                        handleView = {() => handleViewAnalytics()}
                                        date = {date} 
                                    />
                        </MainCard>
                    </div>
                )}
            </Grid>
        </Grid>
    )
}

export default DetailsReportsIncomeIndex
