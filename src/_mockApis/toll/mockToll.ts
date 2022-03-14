export const mockToll = [
    {
        _id: '1',
        name: 'peaje 1',
        state: 'Distrito Capital',
        tolls_lanes:10,
        location:'Peaje de caracas',
        lanes: [
            {
                _id: '1',
                name: 'linea 1',
                state:'capital',
                address:'capital',
                active: false,
            },
            {
                _id: '2',
                name: 'linea 1',
                state:'capital',
                address:'capital',
                active: true,
            },
        ],
        equips: [
            {
                _id: '1',
                node: 'equipo 1',
                company:'1',
                node_code:'32051244',
                node_type:'1',
                abbreviation:'node',
                active: false,
                location:'caaracas',
                monitored:true,

            },
            {
                _id: '2',
                node: 'equipo 1',
                company:'2',
                node_code:'32051244',
                node_type:'2',
                abbreviation:'node',
                active: true,
                location:'caaracas',
                monitored:false,

            },
        ],
        employers: [
            {
                _id: '1',
                first_name: 'empleado 1',
                second_name:'empleado 1',
                last_name:'empleado',
                last_name_2: 'empleado', 
                identification:'V23333333',
                phone:'04125669898',
                sexo:'M',
                department:'Administrativo',
                id_user:'000000000000',
                rol:'operator'
            },
            {
                _id: '2',
                first_name: 'empleado 1',
                second_name:'empleado 1',
                last_name:'empleado',
                last_name_2: 'empleado', 
                identification:'V23333333',
                phone:'04125669898',
                sexo:'M',
                departament:'Administrativo',
                id_user:'000000000000',
                rol:'operator'
            },
        ],
        tariff: [
            {
                _id:"1",
                peso:"liviano",
                price:"100",
                category: "min",
                abbreviation:"1Bs"
            },
            {   
                _id:"2",
                peso:"pesado",
                price:"500",
                category: "max",
                abbreviation:"2Bs"
            }
        ]
    },
    {
        _id: '2',
        name: 'peaje 1',
        state: 'Distrito Capital',
        tolls_lanes:10,
        location:'Peaje de caracas',
        lanes: [
            {
                _id: '1',
                name: 'linea 1',
                state:'Distrito Capital',
                address:'caracas',
                active: true,
            },
            {
                _id: '2',
                name: 'linea 1',
                state:'Distrito Capital',
                address:'caracas',
                active: true,
            },
        ],
        equips: [
            {
                _id: '1',
                node: 'equipo 1',
                company:'',
                node_code:'32051244',
                node_type:'node type',
                abbreviation:'node',
                active: true,
                location:'caaracas',
                monitored:true,

            },
            {
                _id: '2',
                node: 'equipo 1',
                company:'',
                node_code:'32051244',
                node_type:'node type',
                abbreviation:'node',
                active: true,
                location:'caaracas',
                monitored:true,

            },
        ],
        employers: [
            {
                _id: '1',
                first_name: 'empleado 1',
                second_name:'empleado 1',
                last_name:'empleado',
                last_name_2: 'empleado', 
                identification:'23333333',
                phone:'04125669898',
                sexo:'Masculino',
                departament:'Administrativo',
                id_user:'000000000000',
                rol:'operator'
            },
            {
                _id: '2',
                first_name: 'empleado 1',
                second_name:'empleado 1',
                last_name:'empleado',
                last_name_2: 'empleado', 
                identification:'23333333',
                phone:'04125669898',
                sexo:'Masculino',
                departament:'Administrativo',
                id_user:'000000000000',
                rol:'operator'
            },
        ],
        tariff: [
            {
                _id:"2",
                peso:"liviano",
                price:"100",
                category: "max",
                abbreviation:"1Bs"
            },
            {
                _id:"2",
                peso:"pesado",
                price:"500",
                category: "min",
                abbreviation:"2Bs"
            }
        ]
    },
]


export const NODE_TYPES = [
    {
        label:"equipo 1",
        value:"1"
    },
    {
        label:"equipo 2",
        value:"2"
    },
    {
        label:"equipo 3",
        value:"3"
    },
    {
        label:"equipo 4",
        value:"4"
    }

]
export const PESO = [
    {
        label:"Liviano",
        value:"liviano"

    },
    {
        label:"Pesado",
        value:"pesado"

    }
]
export const CATEGORY = [
    {
        label:"Tarifa minima",
        value:"min"
    },
    {
        label:"Tarifa mayor",
        value:"mmax"
    }
]