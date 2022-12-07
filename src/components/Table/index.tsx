import * as React from 'react'
import {
    useSortBy,
    useTable,
    usePagination,
    useFilters,
    useGlobalFilter,
    useRowSelect,
} from 'react-table'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { useTheme, Theme } from '@material-ui/core/styles'
import {
    Fab,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { visuallyHidden } from '@material-ui/utils'
import AddIcon from '@material-ui/icons/Add'

// project imports
import MainCard from 'ui-component/cards/MainCard'

// assets
// import FileCopyIcon from "@material-ui/icons/FileCopyTwoTone";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import SearchIcon from '@mui/icons-material/Search'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import Pagination from './Pagination'
import DefaultColumnFilter from './Filters/DefaultColumnFilter'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
// import TopOptions from './TopOptions'

// import {User} from '../../_mockApis/user-profile/user_create'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    sortSpan: { ...visuallyHidden },
    searchControl: {
        width: '30%',
        '& input': {
            background: 'transparent !important',
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
        },
    },
}))

// ==============================|| TABLA ||============================== //

interface TableCustomProps {
    columns:
        | {
              Header: string
              accessor: string
              Filter?: undefined
              filter?: undefined
              disableFilters?: undefined
              align?: string | undefined
          }
        | {
              Header: string
              accessor: string
              align: string | undefined
              Filter: ({
                  column: { filterValue, setFilter, preFilteredRows, id },
              }: {
                  column: {
                      filterValue: any
                      setFilter: any
                      preFilteredRows: any
                      id: any
                  }
              }) => JSX.Element
              filter: string
              disableFilters?: undefined
          }
        | {}[]
    data: { any }[]
    title?: string
    handleCreate?: React.MouseEventHandler<HTMLButtonElement>
    extraOptionIcon?: React.ReactNode
    extraOptionAction?: React.MouseEventHandler<HTMLButtonElement>
    addIconTooltip?: string
    onClickCell?: (value: string) => void
    loading?: boolean
    perPageParam?: number
    setPerPageParam?: any
    pageParam?: number
    setPageParam?: any
    countPage?: number
    setSearchInputValue?: any
    createRolNotAllowed?: string[]
    setSelectedRows?: any
}

const TableCustom = ({
    columns,
    data,
    title,
    extraOptionIcon,
    handleCreate,
    extraOptionAction,
    addIconTooltip,
    onClickCell,
    loading,
    perPageParam,
    setPerPageParam,
    pageParam,
    setPageParam,
    countPage,
    setSearchInputValue,
    createRolNotAllowed = [],
    setSelectedRows,
}: TableCustomProps) => {
    const classes = useStyles()
    const theme = useTheme()
    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const IndeterminateCheckbox = React.forwardRef(
        //@ts-ignore
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                //@ts-ignore
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return (
                <>
                    {
                        //@ts-ignore
                        <input type="checkbox" ref={resolvedRef} {...rest} />
                    }
                </>
            )
        }
    )
    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 0 }, defaultColumn },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            if (setSelectedRows) {
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox
                                    {...getToggleAllRowsSelectedProps()}
                                />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox
                                    {...row.getToggleRowSelectedProps()}
                                />
                            </div>
                        ),
                    },
                    ...columns,
                ])
            }
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        // state,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize },
        // setGlobalFilter,
    } = tableInstance

    const [state, setState] = React.useState('')
    const onChange = (e) => {
        setState(e.target.value)
    }
    const onClick = () => {
        setSearchInputValue(state)
    }

    console.log(selectedFlatRows.map((d) => d.original))
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchInputValue(state)
        }
    }
    // const [filters, setFilters] = React.useState<boolean>(false)

    return (
        <MainCard title={title} content={false}>
            {setSearchInputValue && (
                <div className="flex justify-end align-middle p-6">
                    <TextField
                        className={classes.searchControl}
                        label="Buscar"
                        size="small"
                        autoComplete="off"
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={onClick}>
                        <Tooltip title="Buscar">
                            <SearchIcon className="mx-2" />
                        </Tooltip>
                    </button>
                    {extraOptionIcon ? (
                        <Tooltip title="Mapa">
                            <IconButton onClick={extraOptionAction}>
                                {extraOptionIcon}
                            </IconButton>
                        </Tooltip>
                    ) : null}
                    {/* <TopOptions
                    handleCreate={handleCreate}
                    // globalFilterState={state}
                    setFilters={setFilters}
                    // setGlobalFilter={setGlobalFilter}
                    filters={filters}
                    extraOptionIcon={extraOptionIcon}
                    extraOptionAction={extraOptionAction}
                /> */}
                </div>
            )}

            {/* table */}
            {!loading ? (
                <TableContainer>
                    <Table
                        {...getTableProps()}
                        className={classes.table}
                        aria-labelledby="tableTitle"
                    >
                        {headerGroups.map((headerGroup) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                className="my-6 text-bold"
                            >
                                {headerGroup.headers.map((column) => (
                                    <th className="text-left px-4">
                                        <div
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                        >
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <ArrowUpwardIcon />
                                                    ) : (
                                                        <ArrowDownwardIcon />
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </div>
                                        {/* {filters ? (
                                            <div>
                                                {column.canFilter
                                                    ? column.render('Filter')
                                                    : null}
                                            </div>
                                        ) : null} */}
                                    </th>
                                ))}
                            </tr>
                        ))}

                        <TableBody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <TableRow
                                        {...row.getRowProps()}
                                        // selected={isSelected(row.name)}
                                        hover
                                    >
                                        {row.cells.map((cell) => {
                                            return (
                                                <TableCell
                                                    component="th"
                                                    {...cell.getCellProps()}
                                                    scope="row"
                                                    sx={{}}
                                                    align={cell?.column?.align}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            color:
                                                                theme.palette
                                                                    .mode ===
                                                                'dark'
                                                                    ? 'grey.600'
                                                                    : 'grey.900',
                                                        }}
                                                    >
                                                        {cell.render('Cell')}
                                                    </Typography>
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    {page.length > 0 ? null : (
                        <p className="text-center w-full font-semibold mb-12  mt-20 text-lg">
                            No hay información registrada
                        </p>
                    )}
                </TableContainer>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                    <div className="h-8 mx-6 bg-gray-300 rounded animate-pulse" />
                    <div className="border-b" />
                </div>
            )}

            {handleCreate !== undefined &&
            addIconTooltip &&
            !createRolNotAllowed.includes(role) ? (
                <div className="fixed right-4 bottom-10">
                    <Tooltip title={addIconTooltip} placement="top">
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={handleCreate}
                            // disabled={open}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            ) : null}

            {/* table pagination */}
            <Pagination
                previousPage={previousPage}
                canPreviousPage={canPreviousPage}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                canNextPage={canNextPage}
                nextPage={nextPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setPerPageParam}
                countPage={countPage}
            />
        </MainCard>
    )
}

export default TableCustom
