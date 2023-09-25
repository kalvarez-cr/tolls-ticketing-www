import React from 'react'


import TableCustom from '../../components/Table'

import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

import { ListHistoryRequest } from 'store/history/historyActions'
import HistoryDetails from 'components/removeForms/HistoryDetails'
import { Button } from '@material-ui/core'

const columns = [
    {
        Header: 'Usuario',
        accessor: 'updated_by_username',
    },

    {
        Header: 'Fecha/Hora ',
        accessor: 'updated_on',
    },

    {
        Header: 'Cliente IP',
        accessor: 'host_ip',
    },

    {
        Header: 'Categoría',
        accessor: '',
    },

    {
        Header: 'Descripción',
        accessor: 'description',
    },

    // {
    //     Header: 'Acciones',
    //     accessor: 'edit',
    //     disableFilters: true,
    // },
]

const ReadHistory = () => {
    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')


    const [loading, setLoading] = React.useState(false)
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)

    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
  

    // ==================== REDUX ====================

    const history = useSelector(
        (state: DefaultRootStateProps) => state.history
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

   const handleDetails = (e) => {
    setSelectedId(e.currenTarget.dataset.id)
    setModal('details')
    setOpen(true)
   }

  

   

   
    
     
    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
           
                const data = await dispatch(
                    ListHistoryRequest({
                        
                    })
                )
                setLoading(false)
                return data
            }
        
        fetchData()
    }, [perPageParam, pageParam])

    React.useEffect(() => {
        const rows = history?.map(
            ({id,
                updated_by_username,
                updated_on,
                host_ip,
                description,



            }) => ({
                id,
                updated_by_username,
                updated_on,
                host_ip,
                description,

                edit: (
                    <div className="flex">
                       
                       <Button
                variant="contained"
                size="medium"
                data-id={id}
               onClick={handleDetails}
            >
                     Detalles
             </Button>         
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [history])

    return (
        <>
            <div className="my-6">
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title="Histórico de cambios"
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    
                />
            </div>

          {modal === 'details' ?
          
          <HistoryDetails
          open={open}
          setOpen={setOpen}
          onlyAccept
          title=''
          
          >
          
          {'aqui va el detalle'}
          {selectedId}
          
          </HistoryDetails>
          : null }


        </>
    )
}

export default ReadHistory
