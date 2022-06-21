import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

import { Tab } from '@headlessui/react'

interface TimeAnalysisChartProps {
    data?: any
}

const TimeAnalysisChart = ({ data }: TimeAnalysisChartProps) => {
    const summaries: any[] = []

    for (const item of data.data) {
        summaries.push(item.summary)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="p-4 bg-white rounded-xl">
            <Tab.Group>
                <div className="flex flex-col w-full mb-8 justify-center items-center gap-6 lg:flex-row lg:w-7/12">
                    <Tab.List className="flex p-2 space-x-2 order-last rounded-xl bg-green-700 bg-opacity-50 lg:mr-auto lg:order-first">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg p-4 text-sm font-bold text-white',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-100 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-green-200 bg-opacity-50 shadow-md'
                                        : 'text-white hover:bg-green-200 hover:bg-opacity-50 hover:text-white'
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
                                        ? 'bg-green-200 bg-opacity-50 shadow-md'
                                        : 'text-white hover:bg-green-200 hover:bg-opacity-30 hover:text-white'
                                )
                            }
                        >
                            Vehículos
                        </Tab>
                    </Tab.List>
                    <h2 className="font-bold text-2xl pb-1 mt-0 mr-0 sm:mt-3 lg:mr-4">
                        Análisis de flujo
                    </h2>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <ResponsiveContainer width="100%" height={730}>
                            <BarChart
                                width={1100}
                                height={600}
                                data={summaries}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    type="monotone"
                                    dataKey="subtotal_value"
                                    name="Ingresos"
                                    fill="#60A5FA"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Tab.Panel>
                    <Tab.Panel>
                        <ResponsiveContainer width="100%" height={730}>
                            <BarChart
                                width={1100}
                                height={600}
                                data={summaries}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    type="monotone"
                                    dataKey="vehicles"
                                    name="Vehículos"
                                    fill="#60A5FA"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default TimeAnalysisChart
