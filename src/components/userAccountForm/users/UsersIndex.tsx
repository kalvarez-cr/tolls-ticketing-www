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
    console.log('userData', userData)
    return (
        <>
            {!editUser && !neww ? (
                <ReadUserAccount
                    userData={userData}
                    handleEditUser={handleEditUser}
                    editNew={editNue}
                    handleCreateNew={handleCreateNew}
                    userId={userId}
                    dataUser={[userData]}
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
