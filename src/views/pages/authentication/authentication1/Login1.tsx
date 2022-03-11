// Redux
import { useSelector } from 'react-redux'

// material-ui
// import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core'

// project imports
import AuthWrapper1 from '../AuthWrapper1'
import AuthCardWrapper from '../AuthCardWrapper'
// import FirebaseLogin from '../login/FirebaseLogin'
import LoginForm from './loginForm'
import BackgroundPattern1 from 'ui-component/cards/BackgroundPattern1'
// import cintillo from '../../../../assets/images/cintillo.png'

// import AuthSlider from 'ui-component/cards/AuthSlider'
import { DefaultRootStateProps } from 'types'

// assets
// import AuthBlueCard from 'assets/images/auth/auth-blue-card.svg'
// import collage from 'assets/images/auth/collage.jpg'
// import login_dark from 'assets/images/auth/login_dark.png'
// import login_light from 'assets/images/auth/login_light.png'
import login_img from 'assets/images/auth/login-03.png'
// import AuthPurpleCard from 'assets/images/auth/auth-purple-card.svg'
import LogoLight from 'components/icons/LogoLight'
import LogoDark from 'components/icons/LogoDark'
import LogoGobDark from 'components/icons/LogoGobDark'
import LogoGobLight from 'components/icons/LogoGobLight'
import CintilloLight from 'components/icons/CintilloLight'
import CintilloDark from 'components/icons/CintilloDark'

// style constant
// const useStyles = makeStyles((theme: Theme) => ({
//     // authPurpleCard: {
//     //     '&:after': {
//     //         content: '""',
//     //         // position: 'absolute',
//     //         top: '32%',
//     //         left: '40%',
//     //         width: '313px',
//     //         backgroundSize: '100%',
//     //         height: '100%',
//     //         backgroundImage: `url(${collage})`,
//     //         backgroundRepeat: 'no-repeat',
//     //         backgroundPosition: 'center',
//     //         // animation: '15s wings ease-in-out infinite',
//     //     },
//         // '&:before': {
//         //     content: '""',
//         //     position: 'absolute',
//         //     top: '23%',
//         //     left: '37%',
//         //     width: '243px',
//         //     height: '210px',
//         //     backgroundSize: '380px',
//         //     backgroundImage: `url(${AuthBlueCard})`,
//         //     backgroundRepeat: 'no-repeat',
//         //     backgroundPosition: 'center',
//         //     animation: '15s wings ease-in-out infinite',
//         //     animationDelay: '1s',
//         // },
//     },
// }))

// carousel items
// const items: AuthSliderProps[] = [
//     {
//         title: 'Components Based Design Systems',
//         description: 'Powerful and easy to use multipurpose theme',
//     },
//     {
//         title: 'Components Based Design System',
//         description: 'Powerful and easy to use multipurpose theme',
//     },
//     {
//         title: 'Components Based Design System',
//         description: 'Powerful and easy to use multipurpose theme',
//     },
// ]

// ================================|| AUTH1 - LOGIN ||================================ //

const Login = () => {
    // const classes = useStyles()
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))
    const themeState = useSelector(
        (state: DefaultRootStateProps) => state.customization.navType
    )

    return (
        <>
            <AuthWrapper1 className="relative">
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    // sx={{ minHeight: '100vh' }}
                >
                    <Grid
                        item
                        container
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        // justifyContent="center"
                        md={6}
                        lg={7}
                        sx={{ my: 3 }}
                    >
                        <div className="flex justify-between w-full">
                            <div className="mx-4 w-80">
                                {themeState === 'dark' ? (
                                    <LogoGobDark className="w-full" />
                                ) : (
                                    <LogoGobLight className="w-full" />
                                )}
                            </div>
                            <div className="mx-4 w-32">
                                {themeState === 'dark' ? (
                                    <CintilloDark />
                                ) : (
                                    <CintilloLight />
                                )}
                            </div>
                        </div>
                        <div className="m-7">
                            <AuthCardWrapper sx={{ marginTop: '110px' }}>
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={
                                                matchDownSM
                                                    ? 'column-reverse'
                                                    : 'row'
                                            }
                                            alignItems={
                                                matchDownSM
                                                    ? 'center'
                                                    : 'center'
                                            }
                                            justifyContent={
                                                matchDownSM
                                                    ? 'center'
                                                    : 'center'
                                            }
                                        >
                                            <Grid
                                                item
                                                sx={{ mb: { xs: 3, sm: 0 } }}
                                            >
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
                                            direction={
                                                matchDownSM
                                                    ? 'column-reverse'
                                                    : 'row'
                                            }
                                            alignItems={
                                                matchDownSM
                                                    ? 'center'
                                                    : 'inherit'
                                            }
                                            justifyContent={
                                                matchDownSM
                                                    ? 'center'
                                                    : 'space-between'
                                            }
                                        >
                                            <Grid item>
                                                <Stack
                                                    justifyContent={
                                                        matchDownSM
                                                            ? 'center'
                                                            : 'flex-start'
                                                    }
                                                    textAlign={
                                                        matchDownSM
                                                            ? 'center'
                                                            : 'inherit'
                                                    }
                                                >
                                                    <Typography
                                                        color={
                                                            theme.palette
                                                                .secondary.main
                                                        }
                                                        gutterBottom
                                                        variant={
                                                            matchDownSM
                                                                ? 'h3'
                                                                : 'h2'
                                                        }
                                                    >
                                                        Hola, bienvenido de
                                                        nuevo
                                                    </Typography>
                                                    <Typography
                                                        color="textPrimary"
                                                        gutterBottom
                                                        variant="h4"
                                                    >
                                                        Inicia sesión con tu
                                                        usuario
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* <FirebaseLogin login={1} /> */}
                                        <LoginForm login={1} />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </div>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        lg={5}
                        sx={{
                            position: 'relative',
                            alignSelf: 'stretch',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <BackgroundPattern1>
                            <Grid
                                item
                                container
                                alignItems="flex-end"
                                justifyContent="center"
                                spacing={3}
                            >
                                <Grid item xs={12}>
                                    <span />
                                    <img
                                        src={login_img}
                                        alt="fondo"
                                        className="h-screen w-screen mt-1"
                                    />
                                    {/* {themeState === 'dark' ? (
                                            <img
                                                src={login_light_dark}
                                                alt="fondo"
                                                className="h-screen w-screen mt-3"
                                            />
                                        ) : (
                                            <img
                                                src={login_light}
                                                alt="fondo"
                                                className="h-screen w-screen mt-3"
                                                
                                            />
                                        )
                                    } */}
                                    {/* <span className={classes.authPurpleCard} /> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid
                                        item
                                        container
                                        justifyContent="center"
                                        sx={{ pb: 8 }}
                                    >
                                        <Grid
                                            item
                                            xs={10}
                                            lg={8}
                                            sx={{ '& .slick-list': { pb: 2 } }}
                                        >
                                            {/* <AuthSlider items={items} /> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </BackgroundPattern1>
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </>
    )
}

export default Login
