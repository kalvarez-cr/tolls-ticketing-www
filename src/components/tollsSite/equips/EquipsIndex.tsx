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
import EquipsTable from './EquipsTable'
import EquipsForm from './EquipsForm'

// project imports
// import MainCard from 'ui-component/cards/MainCard';

interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    equips: Array<any>
    following?: boolean
}

const LanesIndex = ({
    tollIdParam,
    equips,
    following,
}: laneTableProps) => {
    console.log(equips)

    // const classes = useStyles();
    // States
    // const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [editEquip, setEditEquip] = React.useState(false)
    const [dataEquips, setDataEquips] = React.useState({})
    // const [neww, setNeww] = React.useState(false)
    // const [editNew, setEditNew] = React.useState(false)
    // Customs Hooks
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // FUNCTIONS
    console.log(tollIdParam)
    const handleEditEquip = () => {
        setEditEquip(!editEquip)
        const data = equips.find((find) => find.id === tollIdParam)
        console.log('datadata', data)
        setDataEquips(data)
    }
    const handleReturn = () => {
        setEditEquip(!editEquip)
    }
    const handleCreateNew = (boo) => {
        // setNeww(boo)
    }
    const editNue = (edit) => {
        // setEditNew(edit)
    }
    const handleTable = () => {

    }

    return (
        <>
            {!editEquip ? (
                    <EquipsTable
                        tollIdParam={tollIdParam}
                        equips={equips}
                        handleEditEquip={handleEditEquip}
                        following={following}
                        handleCreateNew={handleCreateNew}
                        editNew={editNue}
                    />
                ) : (
                <EquipsForm
                    tollIdParam={tollIdParam}
                    equips={equips}
                    handleReturn={handleReturn}
                    dataEquip={dataEquips}
                    readOnly={editEquip}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />
            )}
        </>
    )
}

export default LanesIndex
