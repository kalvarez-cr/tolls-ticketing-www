import { AnyAction } from 'redux'
import { AuditProps } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const auditReducer = (
    state: Array<AuditProps> | undefined = [
        {
            id: '6387abb939c493a3b5931e64',
            site_code: 'ZUL003',
            node_code: 'TVMPEAJEPRUEBA',
            lane_code: '789528',
            company_code: '1010101010101',
            collected_amount: 3.0,
            collected_iso_code: '928',
            reported_fare_category: 'vehiculo ligero',
            reported_axles: 2,
            reported_weight: 15000.0,
            reported_on: '2022-11-29T14:17:15.573000',
            operator: 'karel-operator',
            status: 'audited',
            vehicle_plate: 'AA158TB',
            plate_img: 'None',
            transaction: '6387abb939c493a3b5931e63',
        },
        {
            id: '6387ac9939c493a3b5931e67',
            site_code: 'ZUL003',
            node_code: 'TVMPEAJEPRUEBA',
            lane_code: '789528',
            company_code: '1010101010101',
            collected_amount: 3.0,
            collected_iso_code: '928',
            reported_fare_category: 'vehiculo ligero',
            reported_axles: 2,
            reported_weight: 15000.0,
            reported_on: '2022-11-29T14:17:15.573000',
            operator: 'karel-operator',
            status: 'pending',
            vehicle_plate: 'AA158TB',
            plate_img: 'None',
            transaction: '6387ac9939c493a3b5931e66',
        },
        {
            id: '6387accd39c493a3b5931e6a',
            site_code: 'ZUL003',
            node_code: 'TVMPEAJEPRUEBA',
            lane_code: '789528',
            company_code: '1010101010101',
            collected_amount: 3.0,
            collected_iso_code: '928',
            reported_fare_category: 'vehiculo ligero',
            reported_axles: 2,
            reported_weight: 15000.0,
            reported_on: '2022-11-29T14:17:15.573000',
            operator: 'karel-operator',
            status: 'pending',
            vehicle_plate: 'AA158TB',
            plate_img: 'None',
            transaction: '6387accb39c493a3b5931e69',
        },
    ],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_AUDIT':
            return action.payload
        case 'UPDATE_AUDIT': {
            return state
        }
        default:
            return state
    }
}

export default auditReducer
