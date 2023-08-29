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
    // TextField,
    // InputAdornment,
    Theme,
    Tooltip,
} from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction'
import { KeyedObject } from 'types'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { useDispatch } from 'react-redux'
import { getExcelReportRequest } from 'store/exportReportExcel/ExportExcelAction'
import { useNavigate } from 'react-router'


import { getPdfReportRequest } from 'store/exportReportPdf/ExportPdfAction'
import { axiosRequest } from 'store/axios'
import ShowImage from 'components/removeForms/ShowImage'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { SNACKBAR_OPEN } from 'store/actions'
import GetAppIcon from '@mui/icons-material/GetApp'
import CancelIcon from '@mui/icons-material/Cancel'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ExcelIcon from '../icons/ExcelIcon'
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
    searchControl: {
        paddingRight: '16px',
        // paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
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
    const [base64, setBase64] = React.useState<any>()
    const [showActions, setShowActions] = React.useState(false)
    // const [filteredRows, setFilteredRows] = React.useState(
    //     data.data.map((x) => x)
    // )
    // const [searchText, setSearchText] = React.useState('')

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
        const { value, api, accessor } = e.currentTarget.dataset
        const body = {}
        body[accessor] = value
        try {
            setLoading(true)
            // const responseType = 'arraybuffer'
            // const { data } = await axiosRequest('post', api, body, {
            //     responseType,
            // })
            // const change = btoa(data)

            // setBase64(change)

            const headers: object = {
                'Content-Type': 'application/json',
            }
            const responseType = 'arraybuffer'
            setOpen(true)
            const data = await axiosRequest(
                'post',
                api,
                body,
                headers,
                responseType
            )
            const base64data = new Buffer(data.data).toString('base64')
            setBase64(base64data)
            // const url = window.URL.createObjectURL(new Blob([data.data]))
            // const link = document.createElement('a')
            // link.href = url
            // link.setAttribute('download', `imagen.jpeg`)
            // document.body.appendChild(link)
            // link.click()
            setLoading(false)
        } catch (error) {
            const snackbarOpen = (message, type) => {
                return {
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alertSeverity: type,
                }
            }
            dispatch(snackbarOpen(error, 'error'))
            setLoading(false)
            setOpen(false)
        }
    }

    // const handleChange = (value) => {
    //     setSearchText(value)
    //     filterData(value)
    // }

    // const filterData = (value) => {
    //     const lowercasedValue = value.toLowerCase().trim()
    //     if (lowercasedValue === '') {
    //         setFilteredRows(rows)
    //     } else {
    //         const filteredData = rows.map((r) => {
    //             r.rows.map((el) => {
    //                 el.filter((item) => {
    //                     return Object.keys(item).some((key) =>
    //                         item[key]
    //                             .toString()
    //                             .toLowerCase()
    //                             .includes(lowercasedValue)
    //                     )
    //                 })
    //             })
    //         })
    //         console.log(filteredData)
    //         setFilteredRows(filteredData)
    //     }
    // }

    return (
        <MainCard
            content={false}
            title={title}
            secondary={
                <>
                    <Grid item sx={{ display: 'flex' }}>
                        {/* <TextField
                            label="Filtro"
                            size="small"
                            autoComplete="off"
                            value={searchText}
                            onChange={(e) => {
                                handleChange(e.target.value)
                            }}
                            className={classes.searchControl}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    </InputAdornment>
                                ),
                            }}
                        /> */}

                        {data.report_title === 'Transito' ? null : (
                            <>
                                <div className="fixed right-6 bottom-4 z-20">
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        onClick={() =>
                                            setShowActions(!showActions)
                                        }
                                        onMouseEnter={() =>
                                            setShowActions(true)
                                        }
                                    >
                                        {showActions ? (
                                            <CancelIcon />
                                        ) : (
                                            <GetAppIcon />
                                        )}
                                    </Fab>

                                    {showActions && (
                                        <div className="absolute bottom-16 right-0 ">
                                            <Tooltip
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
                                            </Tooltip>
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
                                                   <ExcelIcon className='w-7' />
                                                </Fab>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

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
            <ShowImage open={open} setOpen={setOpen} onlyAccept>
                {loading ? (
                    <div className="w-96 h-56  flex justify-center items-center">
                        <svg
                            role="status"
                            className="inline w-6 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                ) : (
                    <img src={`data:image/jpeg;base64,${base64}`} alt="placa" />
                )}
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
                                                                    <VisibilityIcon />
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
                                                    {i === columns.length - 2
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
                                                className={classes.total1}
                                            >
                                                {i === columns.length - 2
                                                    ? 'Total'
                                                    : null}

                                                {column.id === 'amount'
                                                    ? value
                                                    : null}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
        </MainCard>
    )
}
