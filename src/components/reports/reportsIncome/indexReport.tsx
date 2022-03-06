/* eslint-disable no-lone-blocks */
import React from 'react'
// material-ui
import { makeStyles } from '@material-ui/styles';
import { useTheme, Theme } from '@material-ui/core/styles';
import {  Grid, Typography, useMediaQuery } from '@material-ui/core';

// project imports
// import MarketShareAreaChartCard from './MarketShareAreaChartCard';
import TotalRevenueCard from './TotalRevenueCard';
import LatestCustomerTableCard from './LatestCustomerTableCard';
import MainCard from 'ui-component/cards/MainCard';
import RevenueCard from 'ui-component/cards/RevenueCard';
// import UserCountCard from 'ui-component/cards/UserCountCard';
import { gridSpacing } from 'store/constant';

// assets
// import { IconShare, IconAccessPoint, IconCircles, IconCreditCard } from '@tabler/icons';
// import { IconAccessPoint } from '@tabler/icons';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import AccountBalance from '@mui/icons-material/AccountBalance';
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
// import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { RESPONSE } from '../../../_mockApis/summary_criterias/reports'
// import { DefaultRootStateProps } from 'types';
// import { useSelector } from 'react-redux';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    flatCardBody: {
        '& >div': {
            padding: '0px !important'
        },
        '& svg': {
            width: '50px',
            height: '50px',
            color: theme.palette.secondary.main,
            borderRadius: '14px',
            padding: '10px',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light
        }
    },
    incomingRequestsCard: {
        padding: '0px',
        paddingBottom: '0px !important'
    },
    ScrollHeight: {
        height: '300px',
        '& svg': {
            width: '32px',
            margin: '-6px 6px -6px -6px'
        }
    },
    flatCardBlock: {
        padding: '20px',
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    }
}));

// ==============================|| ANALYTICS DASHBOARD ||============================== //

const Analytics = (props:{ handleViewTable: () => void }) => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    // const response = useSelector(
    //     (state: DefaultRootStateProps) => state.reportsIncome
    // )
    const [ view, setView] = React.useState<boolean>(false)
    const response = RESPONSE

    const showCArdsTotal= ( code, name ) => {

        // const header = RESPONSE.header
        const total = response.global_total
        
        // let resss: any 
        let count: any[] = []
        // let nominal: any 
        
        {total.map((total) => {
            {Object.keys(total).find((key, value) => { 
                if(key.includes(code)){
                    
                    count.push(<>
                        <Grid item xs={12} sm={6} className={classes.flatCardBlock}>
                            <Grid
                                container
                                alignItems="center"
                                spacing={1}
                                justifyContent={matchDownXs ? 'space-between' : 'center'}
                            >
                                <Grid item>
                                    {key.includes("nominal") ? (<><MonetizationOnTwoToneIcon  /></>):(<><AccountBalance /></>)}
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        { total[key]}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        {/* {`Total de ${name}`} */}
                                        {key.includes("nominal") ? (<>{`Monto total de operaciones ${name}`}</>):(<>{`Cantida total de operaciones ${name}`}</>)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>)
                }
                return key
            })}
            return total
        })}
        console.log(count)
      
        return  <>
            <Grid container alignItems="center" spacing={0}>
                {count}
            </Grid>
        </>
    }
    React.useEffect(()=>{
        setView(true)
    },[response])


    return  view ? (
            <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={8} md={6}>
                <Grid container spacing={gridSpacing}>
                {/* <CardContent className={classes.incomingRequestsCard}> */}
                    {/* <PerfectScrollbar className={classes.ScrollHeight}> */}
                    
            
                    <Grid item xs={12} lg={6}>
                        {response.global_total && response.global_total.map((map) =>{
                            return map.nominal_amount_total ?(
                                <RevenueCard
                                    primary="Ingresos"
                                    secondary={`Bs ${map.nominal_amount_total} `}
                                    content={`Monto total de las fechas seleccionadas.`}
                                    iconPrimary={MonetizationOnTwoToneIcon} 
                                    color={theme.palette.secondary.main}
                                />) : (<></>)
                            
                        })

                        }
                        
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        {response.global_total && response.global_total.map((map) =>{
                            return map.transaction_amount_total ? (
                                <RevenueCard
                                    primary="Cantidades"
                                    secondary={`${map.transaction_amount_total}`}
                                    content={"Cantidad total de transacciones  "}
                                    iconPrimary={AccountCircleTwoTone}
                                    color={theme.palette.primary.main}
                                />
                            ) : (<></>)
                        })}
                    </Grid>
                   
                    {/* </PerfectScrollbar> */}
                    {/* </CardContent> */}
                    <Grid item xs={12} >
                        <LatestCustomerTableCard handleViewTable={() => props.handleViewTable()} title="Total por compañias" />
                    </Grid>
                    {/* <Grid item xs={12} >
                        <MarketShareAreaChartCard />
                    </Grid> */}
                </Grid>
                
            </Grid>
            <Grid item xs={12} lg={4} md={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MainCard className={classes.flatCardBody}>
                            <PerfectScrollbar className={classes.ScrollHeight}> 
                                {response.header && response.header.map((map)=>{
                                    return map.action_code !== "total" ? showCArdsTotal(map.action_code, map.name): <></>
                                })}
                            </PerfectScrollbar> 
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <TotalRevenueCard title="Sub total por fecha" />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <UserCountCard
                            primary="Daily user"
                            secondary="1,658"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UserCountCard
                            primary="Daily page view"
                            secondary="1K"
                            iconPrimary={DescriptionTwoToneIcon}
                            color={theme.palette.primary.main}
                        /> 
                    </Grid>*/}
                </Grid>
            </Grid>
        </Grid>
        
        ) : <></>
};

export default Analytics;
