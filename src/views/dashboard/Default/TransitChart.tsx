import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer,
} from 'recharts'
import { useTheme } from '@material-ui/core'

// ==================== || DASHBOARD DEFAULT - TRANSIT BY CATEGORY CHART ||==================== //

export interface TransitChartProps {
    loading: boolean
    dashboard: any
}

const TransitChart = ({ loading, dashboard }: TransitChartProps) => {
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

    const theme = useTheme()

    return (
        <>
            {theme.palette.mode === 'dark' ? (
                <div className="flex flex-col p-6 rounded-xl shadow-md bg-blue-900 bg-opacity-10">
                    <h2 className="mb-6 text-lg text-white font-bold">
                        Tránsito por Categoría
                    </h2>
                    <div>
                        {dashboard?.data_by_categories ? (
                            <ResponsiveContainer width="100%" aspect={1}>
                                <PieChart>
                                    <Pie
                                        data={dashboard?.data_by_categories}
                                        nameKey="category"
                                        dataKey="vehicles"
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius="90%"
                                        fill="#8884d8"
                                    >
                                        {dashboard?.data_by_categories?.map(
                                            (item, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
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
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-row justify-center my-12">
                                <div className="w-80 h-80 bg-gray-300 rounded-full animate-pulse" />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col p-6 rounded-xl shadow-md bg-white">
                    <h2 className="mb-6 text-lg text-black font-bold">
                        Tránsito por Categoría
                    </h2>
                    <div>
                        {dashboard?.data_by_categories ? (
                            <ResponsiveContainer width="100%" aspect={1}>
                                <PieChart>
                                    <Pie
                                        data={dashboard?.data_by_categories}
                                        nameKey="category"
                                        dataKey="vehicles"
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius="90%"
                                        fill="#8884d8"
                                    >
                                        {dashboard?.data_by_categories?.map(
                                            (item, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
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
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-row justify-center my-12">
                                <div className="w-80 h-80 bg-gray-300 rounded-full animate-pulse" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default TransitChart
