import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase } from '@material-ui/core'

// project imports
import config from 'config'
// import LogoDark from 'components/icons/LogoDark'
// import LogoLight from 'components/icons/LogoLight'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getImageDark, getImageLight } from 'utils/getImage'
import { useEffect, useState } from 'react'


// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const theme = useSelector(
        (state: DefaultRootStateProps) => state.customization.navType
    )
    const [imageLight, setImageLight] = useState('');
    const [imageDark, setImageDark] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          const response = await getImageLight();
          setImageLight(response);
        };
    
        fetchData();
      }, [theme]);


      useEffect(() => {
        const fetchData = async () => {
          const response = await getImageDark();
          setImageDark(response);
        };
    
        fetchData();
      }, [theme]);
  


    return (
        <>
            <ButtonBase disableRipple component={Link} to={config.defaultPath}>
                {theme === 'dark' ? (
                    <div dangerouslySetInnerHTML={{__html:imageDark}} className='px-6 w-32' ></div>
                ) : (
                  
                    <div dangerouslySetInnerHTML={{__html:imageLight}} className='px-6 w-32' ></div>
                )}



            </ButtonBase>
        </>
    )
}

export default LogoSection
