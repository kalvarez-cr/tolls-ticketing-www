import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Avatar,
    Button,
    CardActions,
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
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined'
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined'
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined'

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

export interface PopularCardProps {
    isLoading: boolean
}

const PopularCard = ({ isLoading }: PopularCardProps) => {
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
                                            Estadisticas de ganancia
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
                                                    Vehiculos livianos
                                                </Typography>
                                            </Grid>
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
                                                            Bs 10000
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
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
                                    <Grid item>
                                        <Typography
                                            variant="subtitle2"
                                            className={classes.successDark}
                                        >
                                            10% de ganancia
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid container direction="column">
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
                                                    Carga pesada 3 ejes
                                                </Typography>
                                            </Grid>
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
                                                            Bs 5000
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            variant="rounded"
                                                            className={
                                                                classes.avatarError
                                                            }
                                                        >
                                                            <KeyboardArrowDownOutlinedIcon
                                                                fontSize="small"
                                                                color="inherit"
                                                            />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="subtitle2"
                                            className={classes.errorDark}
                                        >
                                            5% de perdida
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid container direction="column">
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
                                                    Carga pesada de 4 ejes
                                                </Typography>
                                            </Grid>
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
                                                            Bs 80000
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
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
                                    <Grid item>
                                        <Typography
                                            variant="subtitle2"
                                            className={classes.successDark}
                                        >
                                            50% de ganancia
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid container direction="column">
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
                                                    Carga pesada de 5 ejes y mas
                                                </Typography>
                                            </Grid>
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
                                                            Bs 7500
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            variant="rounded"
                                                            className={
                                                                classes.avatarError
                                                            }
                                                        >
                                                            <KeyboardArrowDownOutlinedIcon
                                                                fontSize="small"
                                                                color="inherit"
                                                            />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="subtitle2"
                                            className={classes.errorDark}
                                        >
                                            20% de perdida
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid container direction="column">
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
                                                    Moto alta cilindrada
                                                </Typography>
                                            </Grid>
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
                                                            Bs 800
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            variant="rounded"
                                                            className={
                                                                classes.avatarError
                                                            }
                                                        >
                                                            <KeyboardArrowDownOutlinedIcon
                                                                fontSize="small"
                                                                color="inherit"
                                                            />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="subtitle2"
                                            className={classes.errorDark}
                                        >
                                            70% de perdida
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button size="small" disableElevation>
                            Expandir
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    )
}

export default PopularCard
