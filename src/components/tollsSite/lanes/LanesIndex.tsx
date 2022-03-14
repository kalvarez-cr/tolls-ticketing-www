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
import LanesTable from './LanesTable'
import LineForm from './lineForm'

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

const LanesIndex = ({tollIdParam, tollsData, add,following}:laneTableProps) => {
    // const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [editLane, setEditLane] = React.useState(false)
    const [dataLane, setDataLane] = React.useState({})
    // Customs Hooks
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    
    // FUNCTIONS
    console.log(tollsData)

    const handleEditLanes = ( id:string) => {
        setEditLane(!editLane)
        console.log(id)
        const data = tollsData.find((find) => find._id === id)
        console.log(data)
        setDataLane(data)

    }
    const handleEditVolver = ( ) => {
        setEditLane(!editLane)
        

    }
    console.log(!!!editLane)
    console.log(!!!add)
    console.log(!following)
    return (
        <>
            {!editLane && !add && (!following || tollsData.length > 0) && 
                <LanesTable 
                    tollIdParam={tollIdParam}
                    tollsData={tollsData}
                    handleEditLanes={handleEditLanes}
                />

            }
            {editLane && !add && !following &&
                <LineForm 
                    tollIdParam={tollIdParam}
                    tollData={tollsData}
                    handleEditLanes={handleEditVolver}
                    dataLane={dataLane}
                    readOnly={editLane}
                />

            }
            {!editLane && !add && following && tollsData.length === 0  &&
                <LineForm 
                    handleEditLanes={handleEditVolver}
                    tollIdParam={tollIdParam}
                />

            }
           
        </>
    )
}

export default LanesIndex
