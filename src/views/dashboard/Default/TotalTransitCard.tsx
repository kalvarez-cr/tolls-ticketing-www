// import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Avatar,
    // Grid,
    Typography,
    Theme
} from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import SkeletonTotalTransitCard from 'ui-component/cards/Skeleton/TotalRevenueCard'

// assets
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    card: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.dark.dark
                : theme.palette.primary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&>div': {
            position: 'relative',
            zIndex: 5,
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background:
                theme.palette.mode === 'dark'
                    ? `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                    : theme.palette.primary[800],
            borderRadius: '50%',
            zIndex: 1,
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
            zIndex: 1,
            width: '210px',
            height: '210px',
            background:
                theme.palette.mode === 'dark'
                    ? `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 82.50%)`
                    : theme.palette.primary[800],
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
                : theme.palette.primary[800],
        color: '#fff',
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
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px',
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color:
            theme.palette.mode === 'dark'
                ? theme.palette.text.secondary
                : theme.palette.primary[200],
    },
    avatarCircle: {
        ...theme.typography.smallAvatar,
        cursor: 'pointer',
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.primary.dark,
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)',
    },
}))

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

export interface TotalTransitCardProps {
    isLoading: boolean
    dashboard: any
}

const TotalTransitCard = ({ isLoading, dashboard }: TotalTransitCardProps) => {
    const classes = useStyles()

    // const [timeValue, setTimeValue] = React.useState<boolean>(false)
    // const handleChangeTime = (
    //     event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    //     newValue: boolean
    // ) => {
    //     setTimeValue(newValue)
    // }

    return (
        <>
            {isLoading ? (
                <SkeletonTotalTransitCard />
            ) : (
                <MainCard
                    border={false}
                    className={classes.card}
                    contentClass={classes.content}
                >
                    <div className="flex flex-col ml-2 mb-1">
                        <div>
                            <div className="flex justify-between">
                                <div>
                                    <Avatar
                                        variant="rounded"
                                        className={classes.avatar}
                                    >
                                        <LocalMallOutlinedIcon />
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
                                    {dashboard.summary ? (
                                        <Typography className="mt-5 mb-1.5 mr-8 font-medium text-4xl">
                                            {dashboard.summary[0].vehicles} vehículos
                                        </Typography>
                                    ) : (
                                        <Typography className="mt-5 mb-1.5 mr-8 font-medium text-4xl">
                                            <>
                                                <svg
                                                    role="status"
                                                    className="inline w-5 h-5 mr-3 text-white animate-spin"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                Actualizando...
                                            </>
                                        </Typography>
                                    )}
                                </div>
                                <div>
                                    <Avatar className={classes.avatarCircle}>
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
                                Tránsito Total
                            </Typography>
                        </div>
                    </div>
                </MainCard>
            )}
        </>
    )
}

export default TotalTransitCard
