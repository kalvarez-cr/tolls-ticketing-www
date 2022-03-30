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
import // Button,
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
'@material-ui/core'

interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollsData?: any
    add?: boolean
    following?: boolean
    created?: number
}

const LanesIndex = ({
    tollIdParam,
    tollsData,
    add,
    following,
    created,
}: laneTableProps) => {
    // const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [editLane, setEditLane] = React.useState(false)
    const [dataLane, setDataLane] = React.useState({})
    const [neww, setNeww] = React.useState(false)
    const [editNew, setEditNew] = React.useState(false)
    // Customs Hooks
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // FUNCTIONS
    // console.log(tollsData)

    const handleEditLanes = (id: string) => {
        setEditLane(!editLane)
        // console.log(id)
        const data = tollsData.find((find) => find.id === id)
        // console.log('lanesData', data)
        setDataLane(data)
    }
    const handleEditVolver = () => {
        setEditLane(!editLane)
    }
    const handleTable = () => {
        setEditLane(false)
        // add = false
        following = false
    }
    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = (edit) => {
        setEditNew(edit)
    }

    // console.log(editLane)
    // console.log(add)
    // console.log(following)
    // console.log(tollIdParam)
    // console.log(created)
    return (
        <>
            {!editLane &&
                !add &&
                (!following || tollsData.length > 0) &&
                !neww && (
                    // {add === 3 &&
                    <LanesTable
                        tollIdParam={tollIdParam}
                        tollsData={tollsData}
                        handleEditLanes={handleEditLanes}
                        following={following}
                        handleCreateNew={handleCreateNew}
                        editNue={editNue}
                    />
                )}
            {editLane && !add && editNew && (
                // {add === 2 &&
                <LineForm
                    tollIdParam={tollIdParam}
                    tollData={tollsData}
                    handleEditLanes={handleEditVolver}
                    dataLane={dataLane}
                    readOnly={editLane}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />
            )}
            {!editLane && !add && following && tollsData.length === 0 && !neww && (
                // {add===1 &&
                <LineForm
                    handleEditLanes={handleEditVolver}
                    tollIdParam={tollIdParam}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />
            )}

            {neww && (
                <LineForm
                    handleEditLanes={handleEditVolver}
                    tollIdParam={tollIdParam}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />
            )}
        </>
    )
}

export default LanesIndex
