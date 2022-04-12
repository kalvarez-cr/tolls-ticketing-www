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
    const [neww, setNeww] = React.useState(false)
    const [editNew, setEditNew] = React.useState(false)

    // FUNCTIONS

    const handleEditVolver = () => {
        setEditEmployee(!editEmployee)
    }
    const handleEditEmployee = (id: string) => {
        setEditEmployee(!editEmployee)
        const data = tollData.employees.find((find) => find.id === id)
        setDataEmployee(data)
    }
    const handleTable = () => {
        setEditEmployee(false)
        add = false
        following = false
    }
    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = (edit) => {
        setEditNew(edit)
    }

    return (
        <>
            {!editEmployee &&
                !add &&
                (!following || tollData.length > 0) &&
                !neww && (
                    <EmployeesTable
                        tollIdParam={tollIdParam}
                        tollData={tollData}
                        handleEditEmployee={handleEditEmployee}
                        following={following}
                        editNew={editNue}
                        handleCreateNew={handleCreateNew}
                    />
                )}
            {editEmployee && !add && editNew && (
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
            {!editEmployee &&
                !add &&
                following &&
                tollData.length === 0 &&
                !neww && (
                    <EmployeesForm
                        tollIdParam={tollIdParam}
                        handleEditEmployee={handleEditVolver}
                        handleTable={handleTable}
                        handleCreateNew={handleCreateNew}
                    />
                )}
            {neww && (
                <EmployeesForm
                    tollIdParam={tollIdParam}
                    handleEditEmployee={handleEditVolver}
                    handleTable={handleTable}
                    handleCreateNew={handleCreateNew}
                />
            )}
        </>
    )
}

export default LanesIndex
