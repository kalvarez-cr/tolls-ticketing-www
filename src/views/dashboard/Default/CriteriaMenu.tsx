
// ==================== || DASHBOARD DEFAULT - TRANSIT BY CATEGORY CHART ||==================== //

export interface CriteriaMenuProps {
    setCriteria: any
}

const CriteriaMenu = ({ setCriteria }: CriteriaMenuProps) => {
    return (
        <div className="flex flex-col justify-between h-full p-6 rounded-xl shadow-md bg-green-800">
            <button
                autoFocus
                type="button"
                onClick={() => setCriteria('yearly')}
                className="p-2 rounded-xl font-bold text-base text-white bg-green-700 shadow-md hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
            >
                Anual
            </button>
            <button
                type="button"
                onClick={() => setCriteria('monthly')}
                className="p-2 rounded-xl font-bold text-base text-white bg-green-700 shadow-md hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
            >
                Mensual
            </button>
            {/* <button
                type="button"
                onClick={() => setCriteria('daily')}
                className="p-2 rounded-xl font-bold text-base text-white bg-green-700 shadow-md hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
            >
                Diario
            </button> */}
        </div>
    )
}

export default CriteriaMenu
