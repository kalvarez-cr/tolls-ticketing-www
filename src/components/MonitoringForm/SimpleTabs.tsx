import React from 'react'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { Box, Tab, Tabs, Typography, Theme } from '@material-ui/core'

// assets
import MainCard from 'ui-component/cards/MainCard'
import EquipoIcon from '../icons/EquipoIcon'
import CanalIcon from '../icons/CanalIcon'
import ReadNodes from './Nodes/ReadNodes'
import ReadLanes from './Lanes/ReadLanes'

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
            color: theme.palette.grey[400],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.dark,
        },
        '& a > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
        },
    },
    badgeSecondary: {
        color: theme.palette.primary.light,
        background: theme.palette.primary.dark,
        marginLeft: '10px',
    },
}))

// ================================|| UI TABS - SAMPLE ||================================ //

interface SimpleTabsProps {
    userId?: string
    readOnly?: boolean
    onlyView?: boolean
    userData?: any
    add?: boolean
    following?: boolean
}

export default function SimpleTabs({
    userId,
    readOnly,
    onlyView,
    userData,
    add,
    following,
}: SimpleTabsProps) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    // const [create, setCreate] = React.useState(add === undefined ? true : false)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

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
                        icon={<EquipoIcon />}
                        label="Nodos del peaje "
                        {...a11yProps(0)}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<CanalIcon />}
                        label="Canales del peaje"
                        {...a11yProps(1)}
                        // disabled={!(tollData?.lanes?.length > 0)}
                    />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ReadNodes />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <ReadLanes />
                </TabPanel>
            </MainCard>
        </>
    )
}
