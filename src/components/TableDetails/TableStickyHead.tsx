import React from 'react'
// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
} from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction'
import { KeyedObject } from 'types'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { useDispatch } from 'react-redux'
import { getExcelReportRequest } from 'store/exportReportExcel/ExportExcelAction'
import { useNavigate } from 'react-router'
import PdfButton from '../buttons/PdfButton'
import ExcelButton from '../buttons/ExcelButton'

import { getPdfReportRequest } from 'store/exportReportPdf/ExportPdfAction'
import { axiosRequest } from 'store/axios'
import ShowImage from 'components/removeForms/ShowImage'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

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
    const [open, setOpen] = React.useState<boolean>(false)
    // const [base64, setBase64] = React.useState<any>()

    const columns: ColumnProps[] = data.col_titles.map((col) => ({
        id: col.accessor,
        label: col.header,
        minWidth: 1,
        type: col.type,

        api: col.api,
        external: col.external,
        // align: x.type === 'number' ? 'right' : 'left'
    }))

    // table data

    const rows = data.data.map((x) => x)
    const title = data.report_title
    const handleExcel = () => {
        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(getExcelReportRequest(data))
            setLoading(false)
            return responseData1
        }

        fetchData1()
    }

    const handleReturn = () => {
        navigate(-1)
    }
    const handlePdf = () => {
        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(getPdfReportRequest(data))
            setLoading(false)
            return responseData1
        }

        fetchData1()
    }

    const handleClick = async (e) => {
        const { value, api, external, accessor } = e.currentTarget.dataset
        console.log(`${value} ${api} ${external} ${accessor}`)
        const body = {}
        body[accessor] = value
        try {
            // const responseType = 'arraybuffer'
            // const { data } = await axiosRequest('post', api, body, {
            //     responseType,
            // })
            // const change = btoa(data)

            // setBase64(change)
            // setOpen(true)

            const headers: object = {
                'Content-Type': 'application/json',
            }
            const responseType = 'arraybuffer'
            const data = await axiosRequest(
                'post',
                api,
                body,
                headers,
                responseType
            )
            const url = window.URL.createObjectURL(new Blob([data.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `imagen.jpeg`)
            document.body.appendChild(link)
            link.click()
        } catch (error) {}
    }

    return (
        <MainCard
            content={false}
            title={title}
            secondary={
                <>
                    <Grid item sx={{ display: 'flex' }}>
                        <ExcelButton
                            handleExcel={handleExcel}
                            loading={loading}
                        />

                        <PdfButton handlePdf={handlePdf} loading={loading} />

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
            <ShowImage open={open} setOpen={setOpen}>
                {/* <img src={'data:image/jpeg;base64,' + `${base64}`} /> */}
            </ShowImage>
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
                    <TableBody>
                        {rows.map((r) => (
                            <>
                                {r.rows.map((row: KeyedObject, i) => {
                                    return (
                                        <TableRow
                                            sx={{ py: 3 }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                        >
                                            {columns.map((column, i) => {
                                                const value = row[column.id]

                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.type ===
                                                        'api-call' ? (
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                data-value={
                                                                    value
                                                                }
                                                                data-api={
                                                                    column.api
                                                                }
                                                                data-external={
                                                                    column.external
                                                                }
                                                                data-accessor={
                                                                    column.id
                                                                }
                                                                onClick={
                                                                    handleClick
                                                                }
                                                            >
                                                                {!column.external ? (
                                                                    <ArrowDownwardIcon />
                                                                ) : (
                                                                    <div>
                                                                        Verificar
                                                                    </div>
                                                                )}
                                                            </Button>
                                                        ) : (
                                                            value
                                                        )}
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
                                            const value = r.summary[column.id]
                                            return (
                                                <TableCell
                                                    key={r.summary.fecha}
                                                    // align={column.align}
                                                    // className="font-bold text-base bg-gray-900"
                                                    className={classes.total1}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                    {i === columns.length - 4
                                                        ? 'SubTotal'
                                                        : null}
                                                    {i === columns.length - 1
                                                        ? r.summary.subtotal
                                                        : null}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )}
                            </>
                        ))}
                        {data.summary && (
                            <TableRow
                                sx={{ py: 3 }}
                                role="checkbox"
                                tabIndex={-1}
                                key={data?.summary?.total}
                                // className="bg-blue-900"
                            >
                                {columns.map((column, i) => {
                                    const value = data.summary[column.id]

                                    return (
                                        <TableCell
                                            key={data?.summary?.total}
                                            // align={column.align}
                                            // className="font-bold text-base bg-gray-900"
                                            className={classes.total1}
                                        >
                                            {column.format &&
                                            typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                            {i === columns.length - 4
                                                ? 'Total'
                                                : null}
                                            {i === columns.length - 1
                                                ? data?.summary?.total
                                                : null}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
        </MainCard>
    )
}
