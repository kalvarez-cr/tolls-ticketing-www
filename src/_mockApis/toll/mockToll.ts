export const mockToll = [
    {
        id: '1',
        toll_code: '1',
        name: 'mock1',
        state: 'caracas',
        road: 'valle-coche',
        start_point: '1KM',
        end_point: '5KM',
        tolls_lanes: '',
        location: ['10.49562', '-66.84887'],
        lanes: [
            {
                id: '123456',
                name: 'linea 1',
                state: 'capital',
                address: 'capital',
                active: false,
            },
            {
                id: '263214',
                name: 'linea 1',
                state: 'capital',
                address: 'capital',
                active: true,
            },
        ],
        equips: [
            {
                id: '1',
                node: 'equipo 1',
                company: '1',
                node_code: '32051244',
                node_type: '1',
                abbreviation: 'node',
                active: false,
                location: 'caaracas',
                monitored: true,
            },
            {
                id: '2',
                node: 'equipo22',
                company: '2',
                node_code: '32034563',
                node_type: '2',
                abbreviation: 'node',
                active: true,
                location: 'caaracas',
                monitored: false,
            },
        ],
        employers: [
            {
                id: '1',
                first_name: 'empleado 1',
                second_name: 'empleado 1',
                last_name: 'empleado',
                last_name_2: 'empleado',
                identification: 'V23333333',
                phone: '04125669898',
                sexo: 'M',
                department: 'Administrativo',
                id_user: '000000000000',
                rol: 'operator',
            },
            {
                id: '2',
                first_name: 'empleado 1',
                second_name: 'empleado 1',
                last_name: 'empleado',
                last_name_2: 'empleado',
                identification: 'V23333333',
                phone: '04125669898',
                sexo: 'M',
                departament: 'Administrativo',
                id_user: '000000000000',
                rol: 'operator',
            },
        ],
        tariff: [
            {
                id: '1',
                peso: 'liviano',
                price: '100',
                category: 'min',
                abbreviation: '1Bs',
            },
            {
                id: '2',
                peso: 'pesado',
                price: '500',
                category: 'max',
                abbreviation: '2Bs',
            },
        ],
    },
    {
        id: '2',
        name: 'peaje 1',
        state: 'Distrito Capital',
        tolls_lanes: 10,
        location: ['10.48299', '-66.84794'],
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
    },
]

export const NODE_TYPES = [
    {
        label: 'Validador',
        value: 'validator',
    },
    {
        label: 'Puerta',
        value: 'gate',
    },
    {
        label: 'Máquina de venta',
        value: 'ticketing-machine',
    },
    {
        label: 'Validador de placas',
        value: 'license-plate_validator',
    },
]
export const PESO = [
    {
        label: 'Liviano',
        value: 'liviano',
    },
    {
        label: 'Pesado',
        value: 'pesado',
    },
]
export const CATEGORY = [
    {
        label: 'Tarifa minima',
        value: 'min',
    },
    {
        label: 'Tarifa mayor',
        value: 'mmax',
    },
]

export const direction = [
    {
        label: 'Entrada',
        value: 'entering',
    },
    {
        label: 'Salida',
        value: 'exiting',
    },
]
