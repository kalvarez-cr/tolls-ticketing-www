import React from 'react'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { Box, Tab, Tabs, Typography, Theme } from '@material-ui/core'

// assets
import PeajeIcon from '../icons/PeajeIcon'
import CanalIcon from '../icons/CanalIcon'
import EmpleadoIcon from '../icons/EmpleadoIcon'
import EquipoIcon from '../icons/EquipoIcon'
import TarifIcon from '../icons/TarifIcon'
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
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    add?: boolean
    following?: boolean
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
                        icon={<PeajeIcon />}
                        label="Datos del peaje"
                        {...a11yProps(0)}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<EmpleadoIcon />}
                        label="Empleados"
                        {...a11yProps(1)}
                        // disabled={!(tollData?.lanes?.length > 0)}
                    />

                    <Tab
                        component={Link}
                        to="#"
                        icon={<EquipoIcon />}
                        label="Nodos"
                        {...a11yProps(2)}
                        // disabled={!(tollData?.employees?.length > 0)}
                    />

                    <Tab
                        component={Link}
                        to="#"
                        icon={<TarifIcon />}
                        label="Tarifas"
                        {...a11yProps(3)}
                        // disabled={!(tollData?.equips?.length > 0)}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<CanalIcon />}
                        label="Canales"
                        {...a11yProps(4)}
                        disabled={!readOnly}
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
                    <EmployeesIndex
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollData={tollData}
                        following={following}
                    />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <EquipsIndex
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        equips={tollData.nodes}
                        following={following}
                    />
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <TariffIndex
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollData={tollData}
                        following={following}
                    />
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <LanesIndex
                        tollIdParam={tollIdParam}
                        readOnly={readOnly}
                        tollData={tollData}
                        following={following}
                        // created={created}
                    />
                </TabPanel>
            </MainCard>
        </>
    )
}
