import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase } from '@material-ui/core'

// project imports
import config from 'config'
import LogoLightAragua from 'components/icons/LogoLightAragua'
import LogoDarkAragua from 'components/icons/LogoDarkAragua'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const theme = useSelector(
        (state: DefaultRootStateProps) => state.customization.navType
    )

    return (
        <>
            <ButtonBase disableRipple component={Link} to={config.defaultPath}>
                {theme === 'dark' ? (
                    <LogoDarkAragua className="px-2 w-2/5 " />
                ) : (
                    <LogoLightAragua className="px-2 w-2/5" />
                )}
            </ButtonBase>
        </>
    )
}

export default LogoSection
