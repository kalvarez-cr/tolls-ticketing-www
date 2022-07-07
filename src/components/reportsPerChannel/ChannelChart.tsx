import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { Tab } from '@headlessui/react'
import { useNavigate } from 'react-router'

interface ChannelChartProps {
    data?: any
}

const ChannelChart = ({ data }: ChannelChartProps) => {
    const navigate = useNavigate()

    const totalKeys = Object.keys(data.total[0])
    totalKeys.shift()

    const vehicleKeys = Object.keys(data.vehicles[0])
    vehicleKeys.shift()

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handleReturn = () => {
        navigate(-1)
    }

    return (
        <div className="p-4 bg-white rounded-xl">
            <Tab.Group>
                <div className="flex flex-col w-full mb-8 justify-center items-center gap-6 lg:flex-row lg:justify-between">
                    <Tab.List className="flex p-2 space-x-2 order-last rounded-xl bg-green-700 bg-opacity-60 lg:order-first">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg p-4 text-sm font-bold text-white',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-100 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-green-200 bg-opacity-40 shadow-md'
                                        : 'text-white hover:bg-opacity-50 hover:text-white'
                                )
                            }
                        >
                            Ingresos
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg p-4 text-sm font-bold text-white',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-100 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-green-200 bg-opacity-40 shadow-md'
                                        : 'text-white hover:bg-green-200 hover:bg-opacity-30 hover:text-white'
                                )
                            }
                        >
                            Vehículos
                        </Tab>
                    </Tab.List>
                    <h2 className="font-bold text-2xl pb-1 mt-0 mr-0 sm:mt-3 ">
                        Análisis de flujo
                    </h2>
                    <button
                        type="button"
                        className="lg:mr-1 bg-green-700 bg-opacity-70 hover:bg-opacity-50 rounded-lg shadow-lg p-4 font-bold text-white"
                        onClick={handleReturn}
                    >
                        Nuevo reporte
                    </button>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <ResponsiveContainer width="100%" height={730}>
                            <LineChart
                                width={1100}
                                height={600}
                                data={data.total}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x_axis" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {totalKeys.map((key, index) => {
                                    return (
                                        <Line
                                            type="monotone"
                                            dataKey={key}
                                            name={key}
                                            stroke={
                                                COLORS[index % COLORS.length]
                                            }
                                        />
                                    )
                                })}
                            </LineChart>
                        </ResponsiveContainer>
                    </Tab.Panel>
                    <Tab.Panel>
                        <ResponsiveContainer width="100%" height={730}>
                            <LineChart
                                width={1100}
                                height={600}
                                data={data.vehicles}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x_axis" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                {vehicleKeys.map((key, index) => {
                                    return (
                                        <Line
                                            type="monotone"
                                            dataKey={key}
                                            name={key}
                                            stroke={
                                                COLORS[index % COLORS.length]
                                            }
                                        />
                                    )
                                })}
                            </LineChart>
                        </ResponsiveContainer>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default ChannelChart
