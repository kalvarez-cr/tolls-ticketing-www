// import React from 'react'
// Redux
import { useSelector } from 'react-redux'

// material-ui
// import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core'

// project imports
// import AuthWrapper1 from '../AuthWrapper1'
import AuthCardWrapper from '../AuthCardWrapper'
// import FirebaseLogin from '../login/FirebaseLogin'
// import LoginForm from '../login/loginForm'
// import BackgroundPattern1 from 'ui-component/cards/BackgroundPattern1'
// import cintillo from '../../../../assets/images/cintillo.png'

// import AuthSlider from 'ui-component/cards/AuthSlider'
import { DefaultRootStateProps } from 'types'

// assets
// import AuthBlueCard from 'assets/images/auth/auth-blue-card.svg'
// import collage from 'assets/images/auth/collage.jpg'
// import login_dark from 'assets/images/auth/login_dark.png'
// import login_light from 'assets/images/auth/login_light.png'
// import login_light_dark from 'assets/images/auth/login-01.png'
// import AuthPurpleCard from 'assets/images/auth/auth-purple-card.svg'
import LogoLight from 'components/icons/LogoLight'
import LogoDark from 'components/icons/LogoDark'
// import LogoGobDark from 'components/icons/LogoGobDark'
// import LogoGobLight from 'components/icons/LogoGobLight'
// import CintilloLight from 'components/icons/CintilloLight'
// import CintilloDark from 'components/icons/CintilloDark'
// import Recover fro./Recoverver'

const RecoverCardWrapper = () => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))
    const themeState = useSelector(
        (state: DefaultRootStateProps) => state.customization.navType
    )
    return (
        <>
            <AuthCardWrapper sx={{ marginTop: '110px' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction={matchDownSM ? 'column-reverse' : 'row'}
                            alignItems={matchDownSM ? 'center' : 'center'}
                            justifyContent={matchDownSM ? 'center' : 'center'}
                        >
                            <Grid item sx={{ mb: { xs: 3, sm: 0 } }}>
                                {themeState === 'dark' ? (
                                    <LogoDark className="w-52" />
                                ) : (
                                    <LogoLight className="w-52" />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction={matchDownSM ? 'column-reverse' : 'row'}
                            alignItems={matchDownSM ? 'center' : 'inherit'}
                            justifyContent={
                                matchDownSM ? 'center' : 'space-between'
                            }
                        >
                            <Grid item>
                                <Stack
                                    justifyContent={
                                        matchDownSM ? 'center' : 'flex-start'
                                    }
                                    textAlign={
                                        matchDownSM ? 'center' : 'inherit'
                                    }
                                >
                                    <Typography
                                        color={theme.palette.secondary.main}
                                        gutterBottom
                                        variant={matchDownSM ? 'h3' : 'h2'}
                                    >
                                        Hola, recuperamos tu contrasena
                                    </Typography>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                    >
                                        Enviaremos su nueva contrasena a su
                                        correo registrado en el sistema
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        {/* <FirebaseLogin login={1} /> */}
                        {/* <Recover /> */}
                    </Grid>
                </Grid>
            </AuthCardWrapper>
        </>
    )
}
export default RecoverCardWrapper
