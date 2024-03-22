import TableStickyHead3 from 'components/TableDetails/TableStickyHead3'
import ReportLiquidationWorkShift from 'components/reportLiquidationWorkShift/ReportLiquidationWorkShift'
import React from 'react'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import SubCard from 'ui-component/cards/SubCard'

const ViewReports = () => {
    const [openForm, setOpenForm] = React.useState<boolean>(false)
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    
    const period = useSelector(
        (state: DefaultRootStateProps) => state.liquidationWork
    )
    const consolidateData = useSelector(
        (state: DefaultRootStateProps) => state.consolidateData
    )

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const formWidth = openForm && windowWidth < 768 ? 'w-full' : '30%'


    return (
        <div className='flex xss:flex-col md:flex-row '>

            <SubCard
                sx={{
                    padding: '4px',
                    display: `${openForm ? 'block' : 'none'}`,
                    width: `${formWidth}`,
                }}
            >
                <ReportLiquidationWorkShift data={consolidateData} report />
            </SubCard>

            <div className={`${openForm ? 'w-full h-full' : 'w-full'}`}>

            <TableStickyHead3 
            data={period}
            setOpenForm={setOpenForm}
            openForm={openForm}
            route={'/reportes/liquidacion-turnostrabajo'}
            />
            </div>
        </div>
    )
}

export default ViewReports
