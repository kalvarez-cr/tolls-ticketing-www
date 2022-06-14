import { Divider } from '@material-ui/core'

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

export interface RevenueByCategoryCardProps {
    loading: boolean
    dashboard: any
}

const RevenueByCategoryCard = ({
    loading,
    dashboard,
}: RevenueByCategoryCardProps) => {
    return (
        <div className="flex flex-col h-4/5 relative overflow-y-auto p-6 rounded-xl shadow-md bg-white">
            <h2 className="mb-6 text-lg text-black font-bold">
                Recaudos por Categoría
            </h2>
            {dashboard.data_by_categories ? (
                dashboard.data_by_categories.map((option) => {
                    return (
                        <>
                            <div className="flex flex-row justify-between">
                                <h4 className="my-1 text-sm font-semibold">
                                    {option.category}
                                </h4>
                                <h5 className="text-xs font-semibold">
                                    {option.total}
                                </h5>
                            </div>
                            <Divider className="my-3" />
                        </>
                    )
                })
            ) : (
                <div className="flex flex-col gap-3">
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-7 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                </div>
            )}
        </div>
    )
}

export default RevenueByCategoryCard
