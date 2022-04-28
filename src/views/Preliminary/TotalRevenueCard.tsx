// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    CardContent,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
} from '@material-ui/core'

// third party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MainCard from 'ui-component/cards/MainCard'

// assets
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    incomingRequestsCard: {
        padding: '0px',
        paddingBottom: '0px !important',
    },
    textSuccess: {
        color: theme.palette.success.dark,
    },
    textError: {
        color: theme.palette.error.main,
    },
    ScrollHeight: {
        height: '370px',
        '& svg': {
            width: '32px',
            margin: '-6px 6px -6px -6px',
        },
    },
    coinText: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

// ===========================|| DASHBOARD ANALYTICS - TOTAL REVENUE CARD ||=========================== //

export interface TotalRevenueCardProps {
    title?: string
}

const TotalRevenueCard = ({ title }: TotalRevenueCardProps) => {
    const classes = useStyles()

    return (
        <MainCard title={title} content={false}>
            <CardContent className={classes.incomingRequestsCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropUpIcon
                                    className={classes.textSuccess}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Vehiculos livianos</span>
                                        <span className={classes.textSuccess}>
                                            50
                                        </span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon
                                    className={classes.textError}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Moto alta cilindrada</span>
                                        <span className={classes.textError}>
                                            30
                                        </span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropUpIcon
                                    className={classes.textSuccess}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Buses y expresos</span>
                                        <span className={classes.textSuccess}>
                                            80
                                        </span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon
                                    className={classes.textError}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>MicroBus</span>
                                        <span className={classes.textError}>
                                            10
                                        </span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon
                                    className={classes.textError}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Camión 350</span>
                                        <span className={classes.textError}>
                                            60
                                        </span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropUpIcon
                                    className={classes.textSuccess}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Camión 750</span>
                                        <span className={classes.textSuccess}>
                                            50
                                        </span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                    </List>
                </PerfectScrollbar>
            </CardContent>
        </MainCard>
    )
}

export default TotalRevenueCard
