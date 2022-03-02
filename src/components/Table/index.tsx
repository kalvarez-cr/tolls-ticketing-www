import * as React from 'react'
import {
    useSortBy,
    useTable,
    usePagination,
    useFilters,
    useGlobalFilter,
} from 'react-table'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { useTheme, Theme } from '@material-ui/core/styles'
import {
    Fab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import Pagination from './Pagination'
import DefaultColumnFilter from './Filters/DefaultColumnFilter'
import TopOptions from './TopOptions'

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
          }
        | {
              Header: string
              accessor: string
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
    title: string
    handleCreate? : React.MouseEventHandler<HTMLButtonElement>
    extraOptionIcon?: React.ReactNode
    extraOptionAction?: React.MouseEventHandler<HTMLButtonElement>
    addIconTooltip?: string
}

const TableCustom = ({
    columns,
    data,
    title,
    extraOptionIcon,
    handleCreate,
    extraOptionAction,
    addIconTooltip,
}: TableCustomProps) => {
    const classes = useStyles()
    const theme = useTheme()
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 0 }, defaultColumn },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
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
        state: { pageIndex, pageSize },
        // setGlobalFilter,
    } = tableInstance

    const [filters, setFilters] = React.useState<boolean>(false)

    return (
        <MainCard title={title} content={false}>
            <TopOptions
                handleCreate={handleCreate}
                // globalFilterState={state}
                setFilters={setFilters}
                // setGlobalFilter={setGlobalFilter}
                filters={filters}
                extraOptionIcon={extraOptionIcon}
                extraOptionAction={extraOptionAction}
            />
            {/* table */}
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
                                    {filters ? (
                                        <div>
                                            {column.canFilter
                                                ? column.render('Filter')
                                                : null}
                                        </div>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    ))}

                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()} hover>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell
                                                component="th"
                                                {...cell.getCellProps()}
                                                scope="row"
                                                sx={{}}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        color:
                                                            theme.palette
                                                                .mode === 'dark'
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
            </TableContainer>
                {handleCreate != undefined &&  addIconTooltip ? (
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
            />
        </MainCard>
    )
}

export default TableCustom
