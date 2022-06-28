import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getDashboardRequest } from 'store/dashboard/dashboardActions'
import { useEffect, useState } from 'react'

// project imports
import TotalRevenueCard from './TotalRevenueCard'
import TotalTransitCard from './TotalTransitCard'
import CriteriaMenu from './CriteriaMenu'
import TransitChart from './TransitChart'
import RevenueChart from './RevenueChart'
// import RevenueByCategoryCard from './RevenueByCategoryCard'

// ================================|| DASHBOARD ||================================ //

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [criteria, setCriteria] = useState('monthly')
    const dispatch = useDispatch()
    const site = useSelector(
        (state: DefaultRootStateProps) =>
            state.login?.user?.employee_info?.toll_site
    )
    const dashboard = useSelector(
        (state: DefaultRootStateProps) => state.dashboard
    )

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await dispatch(
                getDashboardRequest({
                    group_criteria: criteria,
                    site: site,
                })
            )
            setLoading(false)
            return data
        }
        fetchData()
    }, [criteria])

    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true)
            const data = await dispatch(
                getDashboardRequest({
                    group_criteria: criteria,
                    site: site,
                })
            )
            // setLoading(false)
            return data
        }
        setTimeout(() => {
            fetchData()
        }, 600000)
    }, [])

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-5">
                <TotalRevenueCard loading={loading} dashboard={dashboard} />
            </div>
            <div className="col-span-12 lg:col-span-5">
                <TotalTransitCard loading={loading} dashboard={dashboard} />
            </div>
            <div className="col-span-12 lg:col-span-2 order-first lg:order-none">
                <CriteriaMenu
                    setCriteria={setCriteria}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
            <div className="col-span-12 lg:col-span-6">
                <TransitChart loading={loading} dashboard={dashboard} />
            </div>
            <div className="col-span-12 lg:col-span-6">
                <RevenueChart loading={loading} dashboard={dashboard} />
            </div>
        </div>
    )
}

export default Dashboard
