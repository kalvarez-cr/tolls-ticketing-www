import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
// import TableCustom from '../../../components/Table'

// import { makeStyles } from '@material-ui/styles';
// import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from "components/Table/Filters/SelectColumnFilter";
// import { IconButton } from '@material-ui/core'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { DefaultRootStateProps } from 'types/index'
// import { getCardsRequest } from 'store/cards/tollsActions'
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import Chip from 'ui-component/extended/Chip'
import EmployeesTable from './employessTable'
import EmployeesForm from './employeesForm'

// project imports
// import MainCard from 'ui-component/cards/MainCard';
import {
    // Button,
    // CardActions,
    // CardContent,
    // CardMedia,
    // Divider,
    // Typography,
    // Table,
    // TableBody,
    // TableCell,
    // TableContainer,
    // TableHead,
    // TableRow,
    // Theme
} from '@material-ui/core';

interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollsData?: any
    add?:boolean
    following?:boolean
    
    
}

const LanesIndex = ({tollIdParam, tollsData, add, following}:laneTableProps) => {
    // const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [editEmployee, setEditEmployee] = React.useState(false)
    const [dataEmployee, setDataEmployee] = React.useState({})
    const [neww , setNeww] = React.useState(false)
    const [editNew, setEditNew]=React.useState(false)
    // Customs Hooks
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    console.log("employee",tollsData)
    // FUNCTIONS

    const handleEditVolver = () => {
        setEditEmployee(!editEmployee)
    }
    const handleEditEmployee= ( id:string) => {
        setEditEmployee(!editEmployee)
        console.log(id)
        const data = tollsData.find((find) => find._id === id)
        console.log(data)
        console.log(data.phone.substr(0,4))
        setDataEmployee(data)

    }
    const handleTable = () => {
        setEditEmployee(false)
        add = false
        following =false
    }
    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue =(edit) =>{
        setEditNew(edit)
    }
    return (
        <>
            {!editEmployee && !add && (!following || tollsData.length > 0) &&  !neww&&
                <EmployeesTable 
                    tollIdParam={tollIdParam}
                    tollsData={tollsData}
                    handleEditEmployee={handleEditEmployee}
                    following={following}
                    editNew={editNue}
                    handleCreateNew={handleCreateNew}
                />

            }
            {editEmployee && !add && editNew &&
                <EmployeesForm 
                    tollIdParam={tollIdParam}
                    tollsData={tollsData}
                    handleEditEmployee={handleEditVolver}
                    dataEmployee={dataEmployee}
                    readOnly={editEmployee}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />

            }
            {!editEmployee && !add && following && tollsData.length === 0  && !neww&&
                <EmployeesForm 
                    tollIdParam={tollIdParam}
                    handleEditEmployee={handleEditVolver}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                    
                />

            }
            {neww &&
                <EmployeesForm 
                    tollIdParam={tollIdParam}
                    handleEditEmployee={handleEditVolver}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                    
                />

            }
           
        </>
    )
}

export default LanesIndex
