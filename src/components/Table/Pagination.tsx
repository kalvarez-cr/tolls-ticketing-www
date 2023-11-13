import React from 'react'
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

    const [pageSelect, setPageSelect ] = React.useState<number[]>([])
   

   React.useEffect(() => {

    let options: number[] = []
    for(let i=1 ; i<= countPage ; i++){
      options.push(i)
    }
    setPageSelect(options)
   },[countPage])


    return (
      <>
      <div className="flex flex-col m-3  lg:flex-row lg:justify-between lg:h-16 lg:m-4 ">
        {countPage > 1 ? (
          <div className="self-start">
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
            </button>{" "}
            <span>
              Página{" "}
        

            <Select
              className=" mx-3 w-16 rounded-sm bg-transparent"
              defaultValue={1}
              value={pageParam}
              onChange={(e) => {
               
                setPageParam(Number(e.target.value));
                
              }}
            >
             {pageSelect.map((page) => (

              <MenuItem key={page} value={page}>
              {page}
              </MenuItem>

             ))
              
             }
              
             
            </Select>
             
             <strong>
             de {countPage}
             </strong>
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
            </button>{" "}
           
          </div>
        ) : (
          null
          // <div className="flex justify-between items-center mx-10">
          //   <button
          //     onClick={() => previousPage()}
          //     disabled={!canPreviousPage}
          //     className="mx-3"
          //   >
          //     {
          //       <IconButton color="primary">
          //         <KeyboardArrowLeftIcon />
          //       </IconButton>
          //     }
          //   </button>{" "}
          //   <span>
          //     Página{" "}
          //     <strong>
          //       {pageIndex + 1} de {pageOptions.length}
          //     </strong>{" "}
          //   </span>
          //   <button
          //     onClick={() => nextPage()}
          //     disabled={!canNextPage}
          //     className="mx-3"
          //   >
          //     {
          //       <IconButton color="primary">
          //         <ArrowRightOutlinedIcon />
          //       </IconButton>
          //     }
          //   </button>{" "}
          //   <Select
          //     className="rounded-xl bg-transparent"
          //     value={pageSize}
          //     onChange={(e) => {
          //       setPageSize(Number(e.target.value));
          //     }}
          //   >
          //     {[10, 20, 30, 40, 50].map((pageSize) => (
          //       <MenuItem key={pageSize} value={pageSize}>
          //         Mostrar {pageSize}
          //       </MenuItem>
          //     ))}
          //   </Select>
          // </div>
        )}
         {perPageParam && 
         <div className="self-end ml-auto">
         <Select
              className="max-w-xs  rounded-sm bg-transparent "
              value={perPageParam}
              onChange={(e) => {
                // setPageSize(Number(e.target.value))
                setPerPageParam(Number(e.target.value));
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((perPageParam) => (
                <MenuItem key={perPageParam} value={perPageParam}>
                  Mostrar {perPageParam}
                </MenuItem>
              ))}
            </Select>
            </div>}
      </div>
    </>
    )
}

export default Pagination
