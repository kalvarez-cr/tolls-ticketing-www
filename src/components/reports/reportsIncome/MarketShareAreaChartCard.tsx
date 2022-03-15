
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';

// third party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import chartData from './market-share-area-chart';
import { Props } from 'react-apexcharts';

// assets
import { IconBrandFacebook, IconBrandYoutube, IconBrandTwitter } from '@tabler/icons';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { DefaultRootStateProps } from 'types';

// ===========================|| DASHBOARD ANALYTICS - MARKET SHARE AREA CHART CARD ||=========================== //

const chartData: Props = {
    height: 200,
    type: 'area',
    options: {
        chart: {
            id: 'market-share-area-chart',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 80, 100]
            }
        },
        legend: {
            show: false
        },
        yaxis: {
            min: 1,
            max: 100,
            labels: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'Youtube',
            data: [10, 90, 65, 85, 40, 80, 30]
        },
        {
            name: 'Facebook',
            data: [50, 30, 25, 15, 60, 10, 25]
        },
        {
            name: 'Twitter',
            data: [5, 50, 40, 55, 20, 40, 20]
        }
    ]
};
const MarketShareAreaChartCard = () => {
    const theme = useTheme();

    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    const { navType } = customization;

    const secondaryMain = theme.palette.secondary.main;
    const errorMain = theme.palette.error.main;
    const primaryDark = theme.palette.primary.dark;


    

    React.useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [secondaryMain, errorMain, primaryDark],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };
        ApexCharts.exec(`market-share-area-chart`, 'updateOptions', newChartData);
    }, [navType, secondaryMain, errorMain, primaryDark]);

    return (
        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
            <Box
                sx={{
                    p: 3
                }}
            >
                <Grid container direction="column" spacing={3}>
                    <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                            <Typography variant="h3">Market Share</Typography>
                        </Grid>
                        <Grid item xs zeroMinWidth />
                        <Grid item>
                            <TrendingDownIcon fontSize="large" color="error" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h3">27, 695.65</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ mt: '-20px', fontWeight: '400' }} color="inherit" variant="h5">
                            Department wise monthly sales report
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent="space-around" alignItems="center" spacing={3}>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            color: theme.palette.secondary.main,
                                            borderRadius: '12px',
                                            padding: '8px',
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.default
                                                    : theme.palette.secondary.light
                                        }}
                                    >
                                        <IconBrandFacebook stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">+45.36%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            color: theme.palette.primary.main,
                                            borderRadius: '12px',
                                            padding: '8px',
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.default
                                                    : theme.palette.primary.light
                                        }}
                                    >
                                        <IconBrandTwitter stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">- 50.69%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            color: theme.palette.error.main,
                                            borderRadius: '12px',
                                            padding: '8px',
                                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffe9e9'
                                        }}
                                    >
                                        <IconBrandYoutube stroke={2} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">+ 16.85%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs zeroMinWidth />
                    </Grid>
                </Grid>
            </Box>
            <div className='h-80'>
                <Chart {...chartData} />
            </div>
        </MainCard>
    );
};
export default MarketShareAreaChartCard;
