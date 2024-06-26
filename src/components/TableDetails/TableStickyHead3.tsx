import React from 'react'
// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Button,
    Fab,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Tooltip,
} from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction'
import { KeyedObject } from 'types'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { useDispatch } from 'react-redux'
import { getExcelReportWorkRequest } from 'store/exportReportExcel/ExportExcelAction'
import { useNavigate } from 'react-router'
import GetAppIcon from '@mui/icons-material/GetApp'
import CancelIcon from '@mui/icons-material/Cancel'
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ExcelIcon from '../icons/ExcelIcon'

// import { getPdfReportRequest } from 'store/exportReportPdf/ExportPdfAction'

// table columns

export interface ColumnProps {
    id: string
    label: any
    minWidth: number
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined
    format?: (value: Date | number) => string | boolean
    type?: string
    api?: string
    external?: boolean
}
// const columns: ColumnProps[] = [
//     { id: 'name', label: (<div><p>hola</p><p>hola2</p></div>), minWidth: 170 },
//     { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//     {
//         id: 'population',
//         label: 'Population',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US')
//     },
//     {
//         id: 'size',
//         label: 'Size\u00a0(km\u00b2)',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US')
//     },
//     {
//         id: 'density',
//         label: 'Density',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => typeof value === 'number' && value.toFixed(2)
//     }
// ];

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        overflow: 'hidden',
    },
    container: {
        maxHeight: '71vh',
    },
    total1: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.primary.dark
                : theme.palette.secondary.light,
        fontWeight: 'bold',
    },
    total2: {
        // backgroundColor:
        //     theme.palette.mode === 'dark'
        //         ? theme.palette.primary.dark
        //         : theme.palette.secondary.light,
        borderTop: '1px solid #279d85',
    },
    total3: {
        // borderTop: '1px solid #279d85',
        fontWeight: 'bold',
        color: '#ffff',
        backgroundColor: theme.palette.mode === 'dark' ? '#2a4d7d' : '#92B8B0',
    },
}))

interface TStickyHeadTableProps {
    data?: any
}

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable({ data }: TStickyHeadTableProps) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const [showActions, setShowActions] = React.useState(false)
    console.log(loading)

    const columns: ColumnProps[] = data.col_titles.map((col) => ({
        id: col.accessor,
        label: col.header,
        minWidth: 1,
        type: col.type,

        api: col.api,
        external: col.external,
        align: col.align,
    }))

    // table data

    const rows = data.data.map((x) => x)
    const title = data.report_title
    const handleExcel = () => {
        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                getExcelReportWorkRequest(data)
            )
            setLoading(false)
            return responseData1
        }

        fetchData1()
    }

    const handleReturn = () => {
        navigate(-1)
    }
    // const handlePdf = () => {
    //     const fetchData1 = async () => {
    //         setLoading(true)
    //         const responseData1 = await dispatch(getPdfReportRequest(data))
    //         setLoading(false)
    //         return responseData1
    //     }

    //     fetchData1()
    // }

    return (
        <MainCard
            content={false}
            title={title}
            secondary={
                <>
                    <Grid item sx={{ display: 'flex' }}>
                        <div className="fixed right-6 bottom-4 z-20">
                            <Fab
                                color="primary"
                                aria-label="add"
                                onClick={() => setShowActions(!showActions)}
                                onMouseEnter={() => setShowActions(true)}
                            >
                                {showActions ? <CancelIcon /> : <GetAppIcon />}
                            </Fab>

                            {showActions && (
                                <div className="absolute bottom-16 right-0 ">
                                    {/* <Tooltip
                                        title={'Exportar Pdf'}
                                        placement="top"
                                    >
                                        <Fab
                                            color="inherit"
                                            aria-label="icon1"
                                            className="mt-2 bg-blue-700 hover:bg-blue-700"
                                            onClick={handlePdf}
                                        >
                                            <PictureAsPdfIcon
                                                sx={{ color: '#fff' }}
                                            />
                                        </Fab>
                                    </Tooltip> */}
                                    <Tooltip
                                        title={'Exportar Excel'}
                                        placement="top"
                                    >
                                        <Fab
                                            color="inherit"
                                            aria-label="icon2"
                                            className="mt-2 bg-green-700 hover:bg-green-700"
                                            onClick={handleExcel}
                                        >
                                            <ExcelIcon className="w-7" />
                                        </Fab>
                                    </Tooltip>
                                </div>
                            )}
                        </div>

                        <AnimateButton>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={handleReturn}
                            >
                                Nuevo reporte
                            </Button>
                        </AnimateButton>
                    </Grid>
                </>
            }
        >
            {/* table */}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    sx={{ py: 3 }}
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {rows.map((r, index) => (
                        <TableBody>
                            {r.rows.map((row: KeyedObject, i, arr) => {
                                return (
                                    <TableRow
                                        sx={{ py: 3 }}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        // className={`${classes.total1} ${
                                        //     row.color ? `font-bold` : ''
                                        // }`}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id]
                                            let previousRow = arr[i - 1]
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    className={`${
                                                        !row.period
                                                            .toString()
                                                            .includes(
                                                                previousRow?.period
                                                            )
                                                            ? classes.total2
                                                            : ''
                                                    }`}
                                                >
                                                    {column.id === 'date' &&
                                                        !row.period
                                                            .toString()
                                                            .includes(
                                                                previousRow?.period
                                                            ) &&
                                                        value}
                                                    {column.id === 'site' &&
                                                        !row.period
                                                            .toString()
                                                            .includes(
                                                                previousRow?.period
                                                            ) &&
                                                        value}
                                                    {column.id === 'lane' &&
                                                        !row.period
                                                            .toString()
                                                            .includes(
                                                                previousRow?.period
                                                            ) &&
                                                        value}    
                                                    {column.id === 'employee' &&
                                                        !row.period
                                                            .toString()
                                                            .includes(
                                                                previousRow?.period
                                                            ) &&
                                                        value}
                                                    {column.id === 'period' &&
                                                        !value
                                                            .toString()
                                                            .includes(
                                                                previousRow?.period
                                                            ) &&
                                                        value}
                                                        {column.id === 'start_hour'
                                                        ? value
                                                        : null}
                                                        {column.id === 'end_hour'
                                                        ? value
                                                        : null}
                                                   
                                                   

                                                    {column.id === 'amount'
                                                        ? value
                                                        : null}
                                                    {column.id === 'exchange'
                                                        ? value
                                                        : null}
                                                    {column.id === 'exchanged'
                                                        ? value
                                                        : null}
                                                    {column.id === 'diferencia'
                                                        ? value
                                                        : null}
                                                    {column.id ===
                                                    'payment_method'
                                                        ? value
                                                        : null}
                                                    {column.id === 'raised'
                                                        ? value
                                                        : null}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                            {r.summary && (
                                <TableRow
                                    sx={{ py: 3 }}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={r.summary.fecha}
                                    // className="bg-blue-900"
                                >
                                    {columns.map((column, i) => {
                                        const value: string =
                                            r.summary[column.id]

                                        return (
                                            <TableCell
                                                key={r.summary.fecha}
                                                align={column.align}
                                                // className="font-bold text-base bg-gray-900"
                                                className={`${classes.total1} ${
                                                    value?.includes('-')
                                                        ? 'text-red-600'
                                                        : null
                                                }`}
                                            >
                                                {/* {column.format &&
                                                typeof value === 'number'
                                                    ? column.format(value)
                                                    : value} */}

                                                {i === columns.length - 6
                                                    ? 'SubTotal'
                                                    : null}
                                                {i === columns.length - 1
                                                    ? r.summary.subtotal
                                                    : null}
                                                {column.id === 'amount'
                                                    ? value
                                                    : null}
                                                {column.id === 'exchanged'
                                                    ? value
                                                    : null}
                                                {column.id === 'difference'
                                                    ? value
                                                    : null}
                                                {column.id === 'debit/credit'
                                                    ? value
                                                    : null}
                                                {column.id === 'cash'
                                                    ? value
                                                    : null}
                                                {column.id === 'raised'
                                                    ? value
                                                    : null}
                                                
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )}
                        </TableBody>
                    ))}
                    {data.summary.map((su) => (
                        <>
                            <TableRow
                                sx={{ py: 3 }}
                                role="checkbox"
                                tabIndex={-1}
                                key={data?.summary}
                                // className="bg-blue-900"
                            >
                                {columns.map((column, i) => {
                                    const value = su[column.id]

                                    return (
                                        <TableCell
                                            key={data?.summary}
                                            align={column.align}
                                            // className="font-bold text-base bg-gray-900"
                                            className={classes.total3}
                                        >
                                            {i === columns.length - 6
                                                ? 'Total'
                                                : null}

                                            {column.id === 'amount'
                                                ? value
                                                : null}
                                            {column.id === 'exchanged'
                                                ? value
                                                : null}
                                            {column.id === 'raised'
                                                ? value
                                                : null}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </>
                    ))}
                </Table>
            </TableContainer>

            {/* table pagination */}
        </MainCard>
    )
}
