export const oneToll = {
    id: '2',
    name: 'peaje 1',
    state: 'Distrito Capital',
    tolls_lanes: 10,
    location: ['10.49562', '-66.84887'],
    lanes: [
        {
            id: '1',
            name: 'linea 1',
            state: 'Distrito Capital',
            address: 'caracas',
            active: true,
        },
        {
            id: '2',
            name: 'linea 1',
            state: 'Distrito Capital',
            address: 'caracas',
            active: true,
        },
    ],
    equips: [
        {
            id: '1',
            node: 'equipo 1',
            company: '',
            node_code: '32051244',
            node_type: 'node type',
            abbreviation: 'node',
            active: true,
            location: 'caaracas',
            monitored: true,
        },
        {
            id: '2',
            node: 'equipo 1',
            company: '',
            node_code: '32051244',
            node_type: 'node type',
            abbreviation: 'node',
            active: true,
            location: 'caaracas',
            monitored: true,
        },
    ],
    employers: [
        {
            id: '1',
            first_name: 'empleado 1',
            second_name: 'empleado 1',
            last_name: 'empleado',
            last_name_2: 'empleado',
            identification: '23333333',
            phone: '04125669898',
            sexo: 'Masculino',
            departament: 'Administrativo',
            id_user: '000000000000',
            rol: 'operator',
        },
        {
            id: '2',
            first_name: 'empleado 1',
            second_name: 'empleado 1',
            last_name: 'empleado',
            last_name_2: 'empleado',
            identification: '23333333',
            phone: '04125669898',
            sexo: 'Masculino',
            departament: 'Administrativo',
            id_user: '000000000000',
            rol: 'operator',
        },
    ],
    tariff: [
        {
            id: '2',
            peso: 'liviano',
            price: '100',
            category: 'max',
            abbreviation: '1Bs',
        },
        {
            id: '2',
            peso: 'pesado',
            price: '500',
            category: 'min',
            abbreviation: '2Bs',
        },
    ],
}