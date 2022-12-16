import React from 'react'
import AssociateTagProfile from './AssociateTagProfile'
import ReadTags from './ReadTags'

interface laneTableProps {
    readOnly?: boolean
    onlyView?: boolean
    userData?: any
    add?: boolean
    following?: boolean
    vehiclesData?: any
    userId?: string
    isCompany?: boolean
    tagData?: any
}

const TagsIndex = ({
    userData,
    userId,
    isCompany,
    tagData,
}: laneTableProps) => {
    const [editTag, setEditTag] = React.useState(false)
    const [dataTag, setDataTag] = React.useState({})
    const [neww, setNeww] = React.useState(false)
    // const [selectedVehicleId, setSelectedVehicleId] = React.useState('')

    const handleEditVolver = () => {
        setEditTag(!editTag)
    }
    const handleEditTag = (e) => {
        setEditTag(!editTag)
        const id = e.currentTarget.dataset.id
        const data = userData.find((find) => find.id === id)
        setDataTag(data)
    }
    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = () => {}

    return (
        <>
            {!editTag && !neww ? (
                <ReadTags
                    userData={userData}
                    setEditTag={setEditTag}
                    handleEditTag={handleEditTag}
                    editNew={editNue}
                    setDataTag={setDataTag}
                />
            ) : (
                <AssociateTagProfile
                    readOnly={editTag}
                    handleEditVehicle={handleEditVolver}
                    handleCreateNew={handleCreateNew}
                    dataTag={dataTag}
                    userId={userId}
                    setEditTag={setEditTag}
                    setNeww={setNeww}
                    isCompany={isCompany}
                    tagData={tagData}
                    setDataTag={setDataTag}
                />
            )}
        </>
    )
}

export default TagsIndex
