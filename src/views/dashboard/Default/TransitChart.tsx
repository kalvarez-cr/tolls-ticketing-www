import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'

// ==================== || DASHBOARD DEFAULT - TRANSIT BY CATEGORY CHART ||==================== //

export interface TotalGrowthBarChartProps {
    dashboard: any
}

const TransitChart = ({ dashboard }: TotalGrowthBarChartProps) => {
    const COLORS = [
        '#F87171',
        '#FB923C',
        '#FACC15',
        '#34D399',
        '#22D3EE',
        '#60A5FA',
        '#F43F5E',
        '#C084FC',
        '#F472B6',
        '#2DD4BF',
    ]

    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    return (
        <>
            <div className="flex flex-col h-4/5 p-6 rounded-xl shadow-md bg-white">
                <h2 className="mb-6 text-lg text-black font-bold">
                    Tránsito por Categoría
                </h2>
                <div className="h-4/5">
                    {dashboard.data_by_categories ? (
                        <PieChart width={600} height={400}>
                            <Pie
                                data={dashboard.data_by_categories}
                                nameKey="category"
                                dataKey="vehicles"
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={150}
                                fill="#8884d8"
                            >
                                {dashboard.data_by_categories.map(
                                    (item, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    )
                                )}
                            </Pie>
                            <Legend
                                // payload={[{value: 'category'}]}
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                            />
                            <Tooltip />
                        </PieChart>
                    ) : (
                        <div className="ml-20 mt-12 mb-40 w-80 h-80 rounded-full bg-gray-300 opacity-5 animate-pulse" />
                    )}
                </div>
            </div>
        </>
    )
}

export default TransitChart
