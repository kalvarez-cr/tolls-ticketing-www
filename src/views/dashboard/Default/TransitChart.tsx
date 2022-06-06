// import React from 'react'
// import { useSelector } from 'react-redux'

// material-ui
// import { useTheme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

// third-party
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart'
import MainCard from 'ui-component/cards/MainCard'
import { gridSpacing } from 'store/constant'

// chart data
// import { DefaultRootStateProps } from 'types'

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

export interface TotalGrowthBarChartProps {
    isLoading: boolean
}

const TransitChart = ({ isLoading }: TotalGrowthBarChartProps) => {
    // const [value, setValue] = React.useState('today')
    // const theme = useTheme()
    // const customization = useSelector(
    //     (state: DefaultRootStateProps) => state.customization
    // )

    const data = [
        {
            name: 'Autobus',
            vehicles: 244,
            total: 'Bs 855.0',
        },
        {
            name: 'Autobuses Expresos',
            vehicles: 82,
            total: 'Bs 2430.0',
        },
        {
            name: 'Carga 750',
            vehicles: 1824,
            total: 'Bs 20.0',
        },
        {
            name: 'Carga 3 y 4 ejes',
            vehicles: 332,
            total: 'Bs 9975.36',
        },
        {
            name: 'Carga 350',
            vehicles: 3689,
            total: 'Bs 43308.0',
        },
        {
            name: 'Carga 5 ejes',
            vehicles: 1223,
            total: 'Bs 43985.73',
        },
        {
            name: 'Exonerado',
            vehicles: 473,
            total: 'Bs 0.0',
        },
        {
            name: 'Minibus',
            vehicles: 250,
            total: 'Bs 318.0',
        },
        {
            name: 'Particular',
            vehicles: 19575,
            total: 'Bs 19575.0',
        },
        {
            name: 'Vehiculo ligero',
            vehicles: 5238,
            total: 'Bs 5231.0',
        },
        {
            name: 'Vehiculos de 6+ Ejes',
            vehicles: 986,
            total: 'Bs 34841.11',
        },
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

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
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <Grid
                                        container
                                        direction="column"
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Typography variant="h3">
                                                Tránsito por Categoría
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    {/* <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                    >
                                        {status.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            className="flex items-center justify-center"
                        >
                            <PieChart width={600} height={400}>
                                <Pie
                                    data={data}
                                    dataKey="vehicles"
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                >
                                    {data.map((item, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                                <Tooltip />
                            </PieChart>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    )
}

export default TransitChart
