import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase } from '@material-ui/core'

// project imports
import config from 'config'
import LogoLightAragua from 'components/icons/LogoLightAragua'
import LogoDarkAragua from 'components/icons/LogoDarkAragua'
import LogoDarkFon from 'components/icons/LogoDarkFon'
import LogoLightFon from 'components/icons/LogoLightFon'
import LogoDarkPao from 'components/icons/LogoDarkPao'
import LogoLightPao from 'components/icons/LogoLightPao'
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
                {theme === 'dark' &&
                window.location.hostname ===
                    process.env.REACT_APP__URL_FRONT_ARAGUA ? (
                    <LogoDarkAragua className="px-6 w-2/3" />
                ) : window.location.hostname ===
                  process.env.REACT_APP__URL_FRONT_ARAGUA ? (
                    <LogoLightAragua className="px-6 w-2/3" />
                ) : theme === 'dark' &&
                  window.location.hostname ===
                      process.env.REACT_APP__URL_FRONT_FONTUR ? (
                    <LogoDarkFon className="px-6 w-2/3" />
                ) : theme === 'light' &&
                  window.location.hostname ===
                      process.env.REACT_APP__URL_FRONT_FONTUR ? (
                    <LogoLightFon className="px-6 w-2/3" />
                ) : theme === 'dark' &&
                  window.location.hostname ===
                      process.env.REACT_APP__URL_FRONT_PAO ? (
                    <LogoDarkPao className="px-6 w-2/4" />
                ) : theme === 'light' &&
                  window.location.hostname ===
                      process.env.REACT_APP__URL_FRONT_PAO ? (
                    <LogoLightPao className="px-6 w-2/4" />
                ) : null}
            </ButtonBase>
        </>
    )
}

export default LogoSection
