import { TRoutesAndZones } from 'types'

export const routesAndZonesData = [
    {
        _id: '1',
        name: 'Ruta 1',
        going: [
            {
                zone_code: '12345678',
                name: 'zona 1',
                stops: [
                    {
                        stop_code: '1',
                        trans_means: 'bus',
                        name: 'parada-1',
                        abbreviation: 'rta1',
                        route: 'plaza venezuela - chacao',
                        location: {
                            type: 'urbana',
                            state: 'Distrito Capital',
                            municipality: 'Libertador',
                            coordinates: ['10.49562', '-66.84887'],
                        },
                        municipality_code: '1170001',
                        state_code: 'ccs',
                        is_public_stop: false,
                    },
                ],
                location: {
                    type: 'Polygon',
                },
            },
        ],
        return: [
            {
                zone_code: '12345679',
                name: 'zona 2',
                stops: [
                    {
                        stop_code: '2',
                        trans_means: 'bus',
                        name: 'parada-2',
                        abbreviation: 'rta2',
                        route: 'plaza venezuela - chacao',
                        location: {
                            type: 'urbana',
                            state: 'Distrito Capital',
                            municipality: 'Libertador',
                            coordinates: ['10.48386', '-66.85115'],
                        },
                        municipality_code: '117002',
                        state_code: '4567',
                        is_public_stop: true,
                    },
                ],
                location: {
                    type: 'Polygon',
                },
            },
        ],
    },
]

export const routes_Mock: Array<TRoutesAndZones> = [
    {
        _id: '1',
        route_code: '1',
        name: 'Ruta 1',
        description: 'de un bunto A a un punto b',
        abbreviation: 'PuntoAB',
        route_type: 'urban',
        ring: false,
        legs: [
            {
                direction: 'AB',
                stops: [],
                zones: [
                    {
                        _id: '11',
                        zone_code: '12345678',
                        name: 'zona 1',
                        color: '#fff',
                        stops: [
                            {
                                stop_code: '1',
                                trans_means: 'bus',
                                name: 'parada-1',
                                abbreviation: 'rta1',
                                route: 'plaza venezuela - chacao',
                                location: {
                                    type: 'urbana',
                                    coordinates: ['10.49562', '-66.84887'],
                                },
                                municipality_code: '1170001',
                                state_code: 'ccs',
                                is_public_stop: false,
                            },
                        ],
                    },
                ],
                estimated_time: 10,
                distance: 20,
            },
            {
                direction: 'BA',
                stops: [],
                zones: [
                    {
                        _id: '1',
                        zone_code: '12345679',
                        name: 'zona 2',
                        color: '#000',
                        stops: [
                            {
                                stop_code: '2',
                                trans_means: 'bus',
                                name: 'parada-2',
                                abbreviation: 'rta2',
                                route: 'plaza venezuela - chacao',
                                location: {
                                    type: 'urbana',
                                    coordinates: ['10.48386', '-66.85115'],
                                },
                                municipality_code: '117002',
                                state_code: '4567',
                                is_public_stop: true,
                            },
                        ],
                    },
                ],
                estimated_time: 10,
                distance: 20,
            },
        ],
        active: true,
    },
]
