import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
// import TableCustom from '../../../components/Table'

import { makeStyles } from '@material-ui/styles';
// import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from "components/Table/Filters/SelectColumnFilter";
import { IconButton } from '@material-ui/core'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { DefaultRootStateProps } from 'types/index'
// import { getCardsRequest } from 'store/cards/tollsActions'
import PerfectScrollbar from 'react-perfect-scrollbar';
// import Chip from 'ui-component/extended/Chip'

// project imports
// import MainCard from 'ui-component/cards/MainCard';
import {
    // Button,
    // CardActions,
    CardContent,
    // CardMedia,
    // Divider,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Fab,
    Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
const useStyles = makeStyles((theme: Theme) => ({
    projectTableCard: {
        padding: '0px'
    },
    projectTableFooter: {
        justifyContent: 'flex-end'
    },
    imgFlag: {
        width: '30px',
        height: 'auto'
    },
    ScrollHeight: {
        height: '345px',
        padding: 0
    }
}));
// const columns = [
//     {
//         Header: 'Nombre ',
//         accessor: 'first_name',
//     },
//     {
//         Header: 'Segundo nombre',
//         accessor: 'second_name',
//     },
//     {
//         Header: 'Apellido',
//         accessor: 'last_name',
//     },
//     {
//         Header: 'Segundo apellido',
//         accessor: 'last_name_2',
//     },
//     {
//         Header: 'Identificacion',
//         accessor: 'identification',
//     },
//     {
//         Header: 'Telefono',
//         accessor: 'phone',
//     },
//     {
//         Header: 'Departamento',
//         accessor: 'department',
//     },
//     // {
//     //     Header: 'Admite recarga via web',
//     //     accessor: 'web_rechargable',
//     // },
//     // {
//     //     Header: 'Activo',
//     //     accessor: 'active',
//     //     disableFilters: true,
//     // },
//     {
//         Header: 'Acciones',
//         accessor: 'edit',
//         disableFilters: true,
//     },
// ]
interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollsData?: any
    handleEditLanes: (id:string) => void
    following?: boolean 
    editNew:(edit:boolean)=>void 
    handleCreateNew:(boo:boolean)=> void
}

const TariffTable = ({tollIdParam, tollsData, handleEditLanes, following,editNew, handleCreateNew}:laneTableProps) => {
    const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // const permissions = useSelector(
    //     (state: DefaultRootStateProps) => state.login?.user?.content?.permissions
    // )
    // FUNCTIONS
    const handleEdit = useCallback((e) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        console.log(id)
        // navigate(`/peajes/editar/${id}`)
        editNew(true)
        handleCreateNew(false)
        handleEditLanes(id)
    }, [ handleEditLanes,editNew, handleCreateNew])
    const handleCreate =()=>{
        console.log("console",tollIdParam )
        handleCreateNew(true)
        navigate(`/peajes/editar/${tollIdParam}&&following&&1`)
    }

    // const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
    //     e.preventDefault()
    //     navigate(`/peajes/crear`)
    // }
    // const onClickCell = (value: string) => {
    //     console.log('desde tabla')
    //     // e.preventDefault()

    //     // const id = e.currentTarget.dataset.id
    //     console.log('id', value)
    //     navigate(`/peajes/editar/${value}`)
    // }

    //EFFECTS
    // React.useEffect(() => {
    //     console.log(tollsData)
    //     const rows = tollsData.map(({
    //         _id,
    //         first_name,
    //         second_name,
    //         last_name,
    //         last_name_2,
    //         identification,
    //         phone,
    //         sexo,
    //         department,
    //         rol
    //     }) => ({
    //         _id,
    //         first_name,
    //         second_name,
    //         last_name,
    //         last_name_2,
    //         identification,
    //         phone,
    //         sexo,
    //         department,
    //         rol,
    //         edit: (
    //             <div className="flex">
    //                 <button data-id={_id} onClick={handleEdit}>
    //                     <IconButton color="primary">
    //                         <EditIcon sx={{ fontSize: '1.3rem' }} />
    //                     </IconButton>
    //                 </button>
    //             </div>
    //         ),
    //     }))
    //     setRowsInitial(rows)
    // }, [tollsData, handleEdit])

    return (
        // <MainCard  content={false} >
        <>
            <Typography variant="h4" sx={{ marginLeft:'15px',marginBottom: '20px' }}> Datos de las tarifas</Typography>
            <CardContent className={classes.projectTableCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Peso</TableCell>
                                    <TableCell>Abreviacion</TableCell>
                                    <TableCell>Categoria</TableCell>
                                    <TableCell>Precio</TableCell>
                                    {/* {!following && */}
                                        <TableCell>Accion</TableCell>
                                    {/* }    */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tollsData && tollsData.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>{row.peso}</TableCell>
                                        <TableCell>{row.abbreviation}</TableCell>
                                        <TableCell>{row.category }</TableCell>
                                        <TableCell>{row.price }</TableCell>
                                        {/* {!following && */}
                                            <TableCell>
                                                <div className="flex">
                                                    <button data-id={row._id} onClick={handleEdit}>
                                                        <IconButton color="primary">
                                                            <EditIcon sx={{ fontSize: '1.3rem' }} />
                                                        </IconButton>
                                                    </button>
                                                </div>
                                            </TableCell>
                                        {/* } */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PerfectScrollbar>
            </CardContent>
            <div className="fixed right-4 bottom-10">
                    <Tooltip title={"Crear Tarjeta"} placement="top">
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
            {/* // <Divider />
        // </MainCard> */}
        </>
    )
}

export default TariffTable
