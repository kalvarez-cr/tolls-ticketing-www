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
    
    
}

const LanesIndex = ({tollIdParam, tollsData}:laneTableProps) => {
    // const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [editEmployee, setEditEmployee] = React.useState(false)
    const [dataEmployee, setDataEmployee] = React.useState({})
    // Customs Hooks
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    
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
    
    return (
        <>
            {!editEmployee &&
                <EmployeesTable 
                    tollIdParam={tollIdParam}
                    tollsData={tollsData}
                    handleEditEmployee={handleEditEmployee}
                />

            }
            {editEmployee &&
                <EmployeesForm 
                    tollIdParam={tollIdParam}
                    tollsData={tollsData}
                    handleEditEmployee={handleEditVolver}
                    dataEmployee={dataEmployee}
                    readOnly={editEmployee}
                />

            }
           
        </>
    )
}

export default LanesIndex
