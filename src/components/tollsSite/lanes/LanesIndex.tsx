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
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

// project imports
// import MainCard from 'ui-component/cards/MainCard';

interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    add?: boolean
    following?: boolean
    created?: number
}

const LanesIndex = ({
    tollIdParam,
    tollData,
    add,
    following,
    created,
}: laneTableProps) => {
    // const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [editLane, setEditLane] = React.useState(false)
    const [dataLane, setDataLane] = React.useState<any>({})
    const [neww, setNeww] = React.useState(false)
    const [selectedLaneId, setSelectedLaneId] = React.useState('')
    const lanes = useSelector((state: DefaultRootStateProps) => state.lanes)
    // const [editNew, setEditNew] = React.useState(false)
    // Customs Hooks
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // FUNCTIONS
    // console.log(tollsData)
    // console.log('lanes', tollData.lanes)
    const handleEditLanes = (id) => {
        setEditLane(!editLane)
        const data = lanes.find((find) => find.id === id)
        setDataLane(data)
    }
    const handleEditVolver = () => {
        setEditLane(!editLane)
    }
    const handleTable = () => {}
    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = () => {}

    return (
        <>
            {!editLane && !neww ? (
                <LanesTable
                    tollIdParam={tollIdParam}
                   
                    handleEditLanes={handleEditLanes}
                    following={following}
                    handleCreateNew={handleCreateNew}
                    editNue={editNue}
                    setSelectedLaneId={setSelectedLaneId}
                />
            ) : (
                <LineForm
                    tollIdParam={tollIdParam}
                    tollData={tollData}
                    handleEditLanes={handleEditVolver}
                    dataLane={dataLane}
                    readOnly={editLane}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                    selectedLaneId={selectedLaneId}
                    setEditLane={setEditLane}
                    setNeww={setNeww}
                />
            )}
        </>
    )
}

export default LanesIndex
