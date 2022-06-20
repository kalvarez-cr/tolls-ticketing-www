import {
    BarChart,
    Bar,
    // LineChart,
    // Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
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

    // const data = [
    //     {
    //         date: '01:00',
    //         vehicles: 2,
    //         subtotal_value: 2.0,
    //     },
    //     {
    //         date: '04:00',
    //         vehicles: 7,
    //         subtotal_value: 7.0,
    //     },
    //     {
    //         date: '05:00',
    //         vehicles: 37,
    //         subtotal_value: 93.0,
    //     },
    //     {
    //         date: '06:00',
    //         vehicles: 53,
    //         subtotal_value: 53.0,
    //     },
    //     {
    //         date: '08:00',
    //         vehicles: 61,
    //         subtotal_value: 131.0,
    //     },
    //     {
    //         date: '09:00',
    //         vehicles: 106,
    //         subtotal_value: 300.0,
    //     },
    //     {
    //         date: '10:00',
    //         vehicles: 89,
    //         subtotal_value: 838.02,
    //     },
    //     {
    //         date: '11:00',
    //         vehicles: 84,
    //         subtotal_value: 511.03,
    //     },
    //     {
    //         date: '12:00',
    //         vehicles: 42,
    //         subtotal_value: 621.1,
    //     },
    //     {
    //         date: '13:00',
    //         vehicles: 50,
    //         subtotal_value: 291.02,
    //     },
    //     {
    //         date: '14:00',
    //         vehicles: 121,
    //         subtotal_value: 317.24,
    //     },
    //     {
    //         date: '15:00',
    //         vehicles: 218,
    //         subtotal_value: 669.06,
    //     },
    //     {
    //         date: '16:00',
    //         vehicles: 209,
    //         subtotal_value: 784.05,
    //     },
    //     {
    //         date: '17:00',
    //         vehicles: 276,
    //         subtotal_value: 864.07,
    //     },
    //     {
    //         date: '18:00',
    //         vehicles: 144,
    //         subtotal_value: 604.03,
    //     },
    //     {
    //         date: '19:00',
    //         vehicles: 92,
    //         subtotal_value: 308.03,
    //     },
    //     {
    //         date: '20:00',
    //         vehicles: 96,
    //         subtotal_value: 388.03,
    //     },
    //     {
    //         date: '21:00',
    //         vehicles: 42,
    //         subtotal_value: 211.03,
    //     },
    //     {
    //         date: '22:00',
    //         vehicles: 56,
    //         subtotal_value: 390.06,
    //     },
    //     {
    //         date: '23:00',
    //         vehicles: 33,
    //         subtotal_value: 372.08,
    //     },
    // ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="p-4 bg-white rounded-xl">
            <Tab.Group>
                <div className="flex flex-row w-7/12 mb-8 justify-start items-center">
                    <Tab.List className="flex p-2 mr-auto space-x-2 rounded-xl bg-green-700 bg-opacity-50">
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
                    <h2 className="font-bold text-2xl pb-1">
                        Análisis de flujo
                    </h2>
                </div>
                <Tab.Panels className="flex flex-col items-center">
                    <Tab.Panel>
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
                                // activeDot={{ r: 8 }}
                            />
                        </BarChart>
                    </Tab.Panel>
                    <Tab.Panel>
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
                                // activeDot={{ r: 8 }}
                            />
                        </BarChart>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default TimeAnalysisChart
