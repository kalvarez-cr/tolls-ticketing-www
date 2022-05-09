import React from 'react'
import EmployeesTable from './employessTable'
import EmployeesForm from './employeesForm'

interface laneTableProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    add?: boolean
    following?: boolean
}

const LanesIndex = ({
    tollIdParam,
    tollData,
    add,
    following,
}: laneTableProps) => {
    const [editEmployee, setEditEmployee] = React.useState(false)
    const [dataEmployee, setDataEmployee] = React.useState({})
    // const [neww, setNeww] = React.useState(false)
    // const [editNew, setEditNew] = React.useState(false)

    // FUNCTIONS

    const handleEditVolver = () => {
        setEditEmployee(!editEmployee)
    }
    const handleEditEmployee = () => {
        setEditEmployee(!editEmployee)
        const data = tollData.employees.find((find) => find.id === tollIdParam)
        setDataEmployee(data)
    }
    const handleTable = () => {}
    const handleCreateNew = () => {}
    const editNue = () => {}

    return (
        <>
            {!editEmployee ? (
                <EmployeesTable
                    tollIdParam={tollIdParam}
                    tollData={tollData}
                    handleEditEmployee={handleEditEmployee}
                    following={following}
                    editNew={editNue}
                    handleCreateNew={handleCreateNew}
                />
            ) : (
                <EmployeesForm
                    tollIdParam={tollIdParam}
                    tollData={tollData}
                    handleEditEmployee={handleEditVolver}
                    dataEmployee={dataEmployee}
                    readOnly={editEmployee}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />
            )}
        </>
    )
}

export default LanesIndex
