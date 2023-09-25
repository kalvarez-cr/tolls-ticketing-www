import AlertDialog from 'components/AlertDialog'
import TableCustom from 'components/Table'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListHistoryRequest } from 'store/history/historyActions'
import { DefaultRootStateProps } from 'types'

interface ShowImageProps {
    open: boolean
    setOpen: any
    onlyAccept?: boolean
    title: string
    categoryKey?:string 
}


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
        Header: 'Descripción',
        accessor: 'description',
    },

   
]

const HistoryDetailsTable = ({ open, setOpen,  onlyAccept , categoryKey}: ShowImageProps) => {
   
    const [loading, setLoading ] = useState(false)
    const [rowsInitial, setRowsInitial] = useState<Array<any>>([])


    const dispatch = useDispatch()
    const history = useSelector(
        (state: DefaultRootStateProps) => state.history
    )

   
    const handleAccept = () => {
        setOpen(false)
    }



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            
            const data = await  dispatch(
                ListHistoryRequest({
                    category: categoryKey
                })
            )
            setLoading(false)
            return data
        }
        
        fetchData()
    }, [categoryKey])


    


    useEffect(() => {
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

                
            })
        )
        setRowsInitial(rows)
    }, [history])

    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={() => handleAccept()}
                title={''}
                acceptButtonText="Aceptar"
                onlyAccept={onlyAccept}
            >

                    <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    loading={loading}
                   
                   
                />
                
            </AlertDialog>
        </>
    )
}

export default HistoryDetailsTable
