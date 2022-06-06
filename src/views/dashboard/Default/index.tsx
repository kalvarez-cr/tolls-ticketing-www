import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getDashboardRequest } from 'store/dashboard/dashboardActions'
import { useEffect, useState } from 'react'

// material-ui
import { Grid } from '@material-ui/core'

// project imports
import TotalRevenueCard from './TotalRevenueCard'
import TransitPerChannelCard from './TransitPerChannelCard'
import ReportCard from './ReportCard'
import PopularCard from './PopularCard'
// import TotalIncomeDarkCard from './TotalIncomeDarkCard'
// import TotalIncomeLightCard from './TotalIncomeLightCard'
import TransitChart from './TransitChart'
import { gridSpacing } from 'store/constant'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [])

    const dispatch = useDispatch()
    // const [groupCriteria, setGroupCriteria] = useState('')
    const site = useSelector(
        (state: DefaultRootStateProps) =>
            state.login?.user?.employee_info?.toll_site
    )

    const dashboard = useSelector(
        (state: DefaultRootStateProps) => state.dashboard
    )

    React.useEffect(() => {
        const fetchData = async () => {
            await dispatch(
                getDashboardRequest({
                    group_criteria: 'yearly',
                    site: site,
                })
            )
        }
        fetchData()
    }, [dashboard])

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={5} md={7} sm={8} xs={12}>
                            <TotalRevenueCard
                                isLoading={isLoading}
                                dashboard={dashboard}
                            />
                        </Grid>
                        <Grid item lg={5} md={7} sm={8} xs={12}>
                            <TransitPerChannelCard isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={2} md={4} sm={4} xs={12}>
                            <ReportCard isLoading={isLoading} />
                        </Grid>
                        {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeDarkCard
                                        isLoading={isLoading}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard
                                        isLoading={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={8}>
                            <TransitChart isLoading={isLoading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PopularCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
