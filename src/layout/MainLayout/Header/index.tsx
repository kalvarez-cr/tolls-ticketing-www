import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { Avatar, Box, ButtonBase, Theme } from '@material-ui/core'

// project imports
import LogoSection from '../LogoSection'
// import MobileSection from './MobileSection'
import ProfileSection from './ProfileSection'
// import NotificationSection from './NotificationSection'
import ToggleTheme from './ToggleTheme'

// assets
import { IconMenu2 } from '@tabler/icons'
import LogoGobDark from 'components/icons/LogoGobDark'
import LogoGobLight from 'components/icons/LogoGobLight'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    grow: {
        flexGrow: 1,
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: 'transparent',
        color:
            theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.secondary.dark,
        '&:hover': {
            background: 'transparent',
            color:
                theme.palette.mode === 'dark'
                    ? theme.palette.secondary.light
                    : theme.palette.secondary.light,
        },
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        },
    },
}))

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export interface HeaderProps {
    handleLeftDrawerToggle: () => void
}

const Header = ({ handleLeftDrawerToggle }: HeaderProps) => {
    const classes = useStyles()
    const theme = useSelector(
        (state: DefaultRootStateProps) => state.customization.navType
    )

    return (
        <>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box
                    component="span"
                    sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
                >
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvatar}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={3} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>

            {/* header search */}
            {theme === 'dark' ? (
                <LogoGobDark className="w-96 mx-2" />
            ) : (
                <LogoGobLight className="w-96 mx-2" />
            )}
            <div className={classes.grow} />

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {/* usar para colocar el toogle del theme */}
            </Box>

            {/* notification & profile */}
            <ToggleTheme />
            {/* <NotificationSection /> */}
            <ProfileSection />
            {/* mobile header */}
            {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box> */}
        </>
    )
}

export default Header
