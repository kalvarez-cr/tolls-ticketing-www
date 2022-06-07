// material-ui
import {
    IconButton,
    // MenuItem,
    TextField
} from '@material-ui/core'
import RefreshIcon from '@mui/icons-material/Refresh'
// import { getEarningRequest } from 'store/dasboard4/DasboardAction4'
// import { getTransitRequest } from 'store/dasboard2/DasboardAction2'
// import { getIncomeRequest } from 'store/dasboard5/DasboardAction5'
// import { getIncomeLightRequest } from 'store/dasboard6/DasboardAction6'
// import { getOrderLineChardRequest } from 'store/dasboard/DasboardActions'

// project imports

import MainCard from 'ui-component/cards/MainCard'
import SkeletonReportCard from 'ui-component/cards/Skeleton/TotalRevenueCard'
// import { useDispatch } from 'react-redux'
// import { getTotalGrowtBarRequest } from 'store/dasboard1/DasboardAction1'

// ==============================|| REPORT CARD ||============================== //

export interface ReportCardProps {
    isLoading: boolean
}

const ReportCard = ({
    // setDays,
    // handleClick,
    isLoading
}: ReportCardProps) => {
    // const dispatch = useDispatch()

    // const status = [
    //     {
    //         value: 'daily',
    //         label: 'Hoy',
    //     },
    //     {
    //         value: 'monthly',
    //         label: 'Este mes',
    //     },
    //     {
    //         value: 'annually',
    //         label: 'Este año',
    //     },
    // ]

    // const handleChange = (e) => {
    //     const days = e.target.value
    //     setDays(e.target.value)
    //     dispatch(
    //         getEarningRequest({
    //             resume_criteria: days,
    //         })
    //     )
    //     dispatch(
    //         getTransitRequest({
    //             resume_criteria: days,
    //         })
    //     )
    //     dispatch(
    //         getIncomeRequest({
    //             resume_criteria: days,
    //         })
    //     )

    //     dispatch(
    //         getIncomeLightRequest({
    //             resume_criteria: days,
    //         })
    //     )
    //     dispatch(
    //         getOrderLineChardRequest({
    //             resume_criteria: days,
    //         })
    //     )
    //     dispatch(
    //         getTotalGrowtBarRequest({
    //             resume_criteria: days,
    //             card_category: '',
    //             to_date: days === 'daily' ? 'today' : 'all',
    //         })
    //     )
    // }

    return (
        <>
            {isLoading ? (
                <SkeletonReportCard />
            ) : (
                <MainCard>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <TextField
                                select
                                className="mt-8"
                                label="Criterio"
                                fullWidth
                                // onChange={handleChange}
                                // value={days}
                            >
                                {/* {status.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))} */}
                            </TextField>
                        </div>
                        <div>
                                <IconButton
                                    // onClick={handleClick}
                                >
                                <RefreshIcon />
                            </IconButton>
                        </div>
                    </div>
                </MainCard>
            )}
        </>
    )
}

export default ReportCard
