import ArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import { MenuItem, Select } from '@material-ui/core'
import { IconButton } from '@material-ui/core'

const Pagination = ({
    previousPage,
    canPreviousPage,
    pageIndex,
    pageOptions,
    canNextPage,
    nextPage,
    pageSize,
    setPageSize,
    pageParam,
    setPageParam,
    perPageParam,
    setPerPageParam,
    countPage,
}) => {
    return (
        <>
            {pageParam ? (
                <div className="h-20 flex justify-end items-center mx-10">
                    <button
                        onClick={() => setPageParam(pageParam - 1)}
                        disabled={pageParam == 1}
                        className="mx-3"
                    >
                        {
                            <IconButton color="primary">
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        }
                    </button>{' '}
                    <span>
                        Página{' '}
                        <strong>
                            {pageParam} de {countPage}
                        </strong>{' '}
                    </span>
                    <button
                        onClick={() => setPageParam(pageParam + 1)}
                        disabled={pageParam >= countPage}
                        className="mx-3"
                    >
                        {
                            <IconButton color="primary">
                                <ArrowRightOutlinedIcon />
                            </IconButton>
                        }
                    </button>{' '}
                    <Select
                        className="rounded-xl bg-transparent"
                        value={perPageParam}
                        onChange={(e) => {
                            // setPageSize(Number(e.target.value))
                            setPerPageParam(Number(e.target.value))
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((perPageParam) => (
                            <MenuItem key={perPageParam} value={perPageParam}>
                                Mostrar {perPageParam}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            ) : null}
        </>
    )
}

export default Pagination
