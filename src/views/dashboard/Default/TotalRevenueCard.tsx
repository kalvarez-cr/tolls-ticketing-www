import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getDashboardRequest } from 'store/dashboard/dashboardActions'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Avatar,
    // Grid,
    // Menu,
    // MenuItem,
    Theme,
    Typography,
} from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import SkeletonTotalRevenue from 'ui-component/cards/Skeleton/TotalRevenueCard'

// assets
import IngresosIcon from '../../../components/icons/IngresosIcon'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
// import GetAppTwoToneIcon from '@material-ui/icons/GetAppOutlined'
// import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined'
// import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined'
// import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveOutlined'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    card: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.dark.dark
                : theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background:
                theme.palette.mode === 'dark'
                    ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                    : theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px',
            },
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background:
                theme.palette.mode === 'dark'
                    ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                    : theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px',
            },
        },
    },
    content: {
        padding: '20px !important',
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.secondary[800],
        marginTop: '8px',
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.dark.dark
                : theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1,
    },
    // cardHeading: {
    //     fontSize: '2.125rem',
    //     fontWeight: 500,
    //     marginRight: '8px',
    //     marginTop: '14px',
    //     marginBottom: '6px',
    // },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color:
            theme.palette.mode === 'dark'
                ? theme.palette.text.secondary
                : theme.palette.secondary[200],
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark,
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)',
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem',
    },
}))

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

export interface TotalRevenueCardProps {
    isLoading: boolean
}

const TotalRevenueCard = ({ isLoading }: TotalRevenueCardProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    // const [groupCriteria, setGroupCriteria] = useState('')
    const site = useSelector(
        (state: DefaultRootStateProps) =>
            state.login?.user?.employee_info?.toll_site
    )

    // const [anchorEl, setAnchorEl] = React.useState<
    //     Element | ((element: Element) => Element) | null | undefined
    // >(null)

    // const handleClick = (event: React.SyntheticEvent) => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }

    const dashboard = useSelector(
        (state: DefaultRootStateProps) => state.dashboard
    )
    
    


    React.useEffect(() => {
        const fetchData = async () => {
            await dispatch(
                getDashboardRequest({
                    group_criteria: 'yearly',
                    site: site,
                })
            )
        }
        fetchData()
    }, [dashboard])

    console.log(dashboard)

    return (
        <>
            {isLoading ? (
                <SkeletonTotalRevenue />
            ) : (
                <MainCard
                    border={false}
                    className={classes.card}
                    contentClass={classes.content}
                >
                    <div className="flex flex-col">
                        <>
                            <div>
                                <div className="flex justify-between">
                                    <div>
                                        <Avatar
                                            variant="rounded"
                                            className={classes.avatar}
                                        >
                                            <IngresosIcon />
                                        </Avatar>
                                    </div>
                                    <div>
                                        <Avatar
                                            variant="rounded"
                                            className={classes.avatarRight}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            // onClick={handleClick}
                                        >
                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <div>
                                        {dashboard.map((option) => {
                                            return (
                                                <Typography className="mt-5 mb-1.5 mr-8 font-medium text-4xl">
                                                    {option.taking_summary}
                                                </Typography>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <Avatar
                                            className={classes.avatarCircle}
                                        >
                                            <ArrowUpwardIcon
                                                fontSize="inherit"
                                                className={classes.circleIcon}
                                            />
                                        </Avatar>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Typography className={classes.subHeading}>
                                    Recaudación Total
                                </Typography>
                            </div>
                        </>
                    </div>
                </MainCard>
            )}
        </>
    )
}

export default TotalRevenueCard
