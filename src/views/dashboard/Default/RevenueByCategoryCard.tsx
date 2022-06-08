import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Avatar,
    CardContent,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Theme,
    Typography,
} from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard'
import { gridSpacing } from 'store/constant'

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined'
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center',
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer',
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px',
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px',
    },
    successDark: {
        color: theme.palette.success.dark,
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px',
    },
    errorDark: {
        color: theme.palette.orange.dark,
    },
}))

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

export interface RevenueByCategoryCardProps {
    isLoading: boolean
    dashboard: any
}

const RevenueByCategoryCard = ({
    isLoading,
    dashboard,
}: RevenueByCategoryCardProps) => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState<
        Element | ((element: Element) => Element) | null | undefined
    >(null)

    const handleClick = (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    alignContent="center"
                                    justifyContent="space-between"
                                >
                                    <Grid item>
                                        <Typography variant="h4">
                                            Recaudos por Categoría
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            className={classes.primaryLight}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                {' '}
                                                Hoy
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                {' '}
                                                Este mes
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                {' '}
                                                Este año{' '}
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column">
                                    {dashboard.data_by_categories ? (
                                        dashboard.data_by_categories.map(
                                            (option) => {
                                                return (
                                                    <>
                                                        <Grid item>
                                                            <Grid
                                                                container
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                            >
                                                                <Grid item>
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="inherit"
                                                                    >
                                                                        {
                                                                            option.category
                                                                        }
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid
                                                                        container
                                                                        alignItems="center"
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Grid
                                                                            item
                                                                        >
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                color="inherit"
                                                                            >
                                                                                {
                                                                                    option.total
                                                                                }
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                        >
                                                                            <Avatar
                                                                                variant="rounded"
                                                                                className={
                                                                                    classes.avatarSuccess
                                                                                }
                                                                            >
                                                                                <KeyboardArrowUpOutlinedIcon
                                                                                    fontSize="small"
                                                                                    color="inherit"
                                                                                />
                                                                            </Avatar>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider
                                                            className={
                                                                classes.divider
                                                            }
                                                        />
                                                    </>
                                                )
                                            }
                                        )
                                    ) : (
                                        <Typography
                                            variant="subtitle1"
                                            color="inherit"
                                        >
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

                                    
                                </Grid>

                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    )
}

export default RevenueByCategoryCard
