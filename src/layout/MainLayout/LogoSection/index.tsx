import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase } from '@material-ui/core'

// project imports
import config from 'config'
import LogoDark from 'components/icons/LogoDark'
import LogoLight from 'components/icons/LogoLight'
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
                    <LogoDark className="px-6 w-2/3" />
                ) : (
                    <LogoLight className="px-6 w-2/3" />
                )}
            </ButtonBase>
        </>
    )
}

export default LogoSection
