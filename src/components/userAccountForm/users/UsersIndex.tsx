import React from 'react'
import AccountForm from '../AccountForm'
import ReadUserAccount from './ReadUserAccount'

interface laneTableProps {
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    add?: boolean
    following?: boolean
    userData?: any
    userId?: string
}

const UsersIndex = ({ userData, userId }: laneTableProps) => {
    const [editUser, setEditUser] = React.useState(false)
    const [dataUser] = React.useState([userData])
    const [neww, setNeww] = React.useState(false)
    // const [selectedVehicleId, setSelectedVehicleId] = React.useState('')

    // const handleEditVolver = () => {
    //     setEditUser(!editUser)
    // }
    const handleEditUser = () => {
        setEditUser(!editUser)
    }

    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = () => {}

    return (
        <>
            {!editUser && !neww ? (
                <ReadUserAccount
                    userData={userData}
                    handleEditUser={handleEditUser}
                    editNew={editNue}
                    handleCreateNew={handleCreateNew}
                    userId={userId}
                    dataUser={dataUser}
                />
            ) : (
                <AccountForm
                    userData={userData}
                    setEditUser={setEditUser}
                    setNeww={setNeww}
                />
            )}
        </>
    )
}

export default UsersIndex
