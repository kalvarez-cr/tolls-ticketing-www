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
import TariffTable from './TariffTable'
import TariffForm from './TariffForm'

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
    tollData?: any
    add?: boolean
    following?: boolean
}

const TariffIndex = ({
    tollIdParam,
    tollData,
    add,
    following,
}: laneTableProps) => {
    // const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [editTariff, setEditTariff] = React.useState(false)
    const [dataTariff, setDataTariff] = React.useState({})
    const [neww, setNeww] = React.useState(false)

    // Customs Hooks
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // FUNCTIONS

    const handleEditLanes = (id: string) => {
        setEditTariff(!editTariff)

        const data = tollData.find((find) => find.id === id)

        setDataTariff(data)
    }
    const handleEditVolver = () => {
        setEditTariff(!editTariff)
    }
    const handleTable = () => {}
    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = () => {}

    return (
        <>
            {!editTariff && !neww ? (
                <TariffTable
                    tollIdParam={tollIdParam}
                    tollData={tollData}
                    handleEditLanes={handleEditLanes}
                    following={following}
                    editNew={editNue}
                    handleCreateNew={handleCreateNew}
                />
            ) : (
                <TariffForm
                    tollIdParam={tollIdParam}
                    tollData={tollData}
                    handleEditLanes={handleEditVolver}
                    dataTariff={dataTariff}
                    readOnly={editTariff}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />
            )}
        </>
    )
}

export default TariffIndex
