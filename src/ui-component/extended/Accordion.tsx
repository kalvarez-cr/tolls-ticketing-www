import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { useTheme, Theme } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
// import { BlockPicker } from 'react-color'
// Icons

import DeleteIcon from '@material-ui/icons/Delete'
// import EditIcon from '@material-ui/icons/Edit'

// assets
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { TRoutesAndZones } from 'types'
import { TextField, Tooltip } from '@material-ui/core'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography?.pxToRem(15)!,
        fontWeight: theme.typography?.fontWeightRegular!,
    },
    searchControl: {
        width: '100%',
        marginTop: '8px',
        marginBottom: '8px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
    },

    borderDebug: {
        border: '1px solid red',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
}))

// ==============================|| ACCORDION ||============================== //

// type AccordionItem = {
//     id: string
//     title: React.ReactElement | string
//     content: React.ReactElement | string
//     disabled?: boolean
//     expanded?: boolean
//     defaultExpand?: boolean | undefined
// }

export interface accordionProps {
    data: Array<any>
    defaultExpandedId?: string | boolean | null
    expandIcon?: React.ReactElement
    square?: boolean
    toggle?: boolean
    routesAndZonesData?: TRoutesAndZones
    setData: React.Dispatch<React.SetStateAction<TRoutesAndZones>>
    setZoneId?: any
    value: number
    zoneId: string
}

const Accordion = ({
    data,
    defaultExpandedId = null,
    expandIcon,
    square,
    toggle,
    setZoneId,
    value,
    setData,
    routesAndZonesData,
    zoneId,
}: accordionProps) => {
    const classes = useStyles()
    const theme = useTheme()

    const [expanded, setExpanded] = React.useState<string | boolean | null>(
        null
    )
    console.log(expanded, data)
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent<Element, Event>, newExpanded: boolean) => {
            toggle && setExpanded(newExpanded ? panel : false)
            setZoneId(panel)
        }
    React.useEffect(() => {
        setExpanded(defaultExpandedId)
    }, [defaultExpandedId])

    const handleDeleteZone = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation()
        const { id } = e.currentTarget.dataset
        const findZone = data.filter((zone) => zone._id !== id)
        if (value === 1) {
            setData({
                ...routesAndZonesData,
                legs: [
                    {
                        // ...routesAndZonesData?.legs[0],

                        zones: [...findZone],
                    },
                    //@ts-ignore
                    {
                        ...routesAndZonesData?.legs[1],
                    },
                ],
            })
        }
        if (value === 2) {
            setData({
                ...routesAndZonesData,
                legs: [
                    //@ts-ignore
                    {
                        ...routesAndZonesData?.legs[0],
                    },
                    {
                        // ...routesAndZonesData?.legs[0],

                        zones: [...findZone],
                    },
                ],
            })
        }
    }

    const handleDeleteStop = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const { id } = e.currentTarget.dataset
        const findZone = data.find((zone) => zone._id === zoneId)
        const findStop = findZone.stops.filter((stop) => stop.stop_code !== id)
        findZone.stops = findStop

        setData({
            ...routesAndZonesData,
            legs: [
                //@ts-ignore
                {
                    ...routesAndZonesData?.legs[0],
                },
                //@ts-ignore
                {
                    ...routesAndZonesData?.legs[1],
                },
            ],
        })
    }

    const handleChangeZoneName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const findZone = data.find((zone) => zone._id === zoneId)
        findZone.name = e.currentTarget.value
        setData({
            ...routesAndZonesData,
            legs: [
                //@ts-ignore
                {
                    ...routesAndZonesData?.legs[0],
                },
                //@ts-ignore
                {
                    ...routesAndZonesData?.legs[1],
                },
            ],
        })
    }
    const handleChangeZoneCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const findZone = data.find((zone) => zone._id === zoneId)
        findZone.zone_code = e.currentTarget.value
        setData({
            ...routesAndZonesData,
            legs: [
                //@ts-ignore
                {
                    ...routesAndZonesData?.legs[0],
                },
                //@ts-ignore
                {
                    ...routesAndZonesData?.legs[1],
                },
            ],
        })
    }

    const handleColorPicker = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        console.log(e)
        e.stopPropagation()
        console.log('color picker')
    }
    return (
        <div className={classes.root}>
            {data.length <= 0 ? (
                <p className="m-2">Pulsa + para crear una zona</p>
            ) : null}
            {data &&
                data.map((item) => (
                    <MuiAccordion
                        key={item._id}
                        defaultExpanded={!item.disabled && item.defaultExpand}
                        expanded={
                            (!toggle && !item.disabled && item.expanded) ||
                            (toggle && expanded === item._id)
                        }
                        disabled={item.disabled}
                        square={square}
                        onChange={handleChange(item._id)}
                    >
                        <MuiAccordionSummary
                            expandIcon={
                                expandIcon || expandIcon === false ? (
                                    expandIcon
                                ) : (
                                    <ExpandMoreIcon />
                                )
                            }
                            sx={{
                                color:
                                    theme.palette.mode === 'dark'
                                        ? 'grey.500'
                                        : 'grey.800',
                                fontWeight: 500,
                            }}
                        >
                            <div className="flex w-full align-middle">
                                <div className="w-full">
                                    <TextField
                                        defaultValue={item.name}
                                        className={classes.searchControl}
                                        fullWidth
                                        label="Nombre"
                                        size="small"
                                        autoComplete="off"
                                        onChange={handleChangeZoneName}
                                    />
                                    {/* <TextField
                                        className={classes.searchControl}
                                        fullWidth
                                        label="Código"
                                        size="small"
                                        autoComplete="off"
                                        // error={!!errors.legal_representative}
                                        // helperText={errors.legal_representative?.message}
                                        // disabled={readOnly}
                                    /> */}
                                </div>
                                {/* <div className="absolute top-0 right-14 z-10">
                                    <BlockPicker color={item.color} triangle="hide" />
                                </div> */}
                                <div className="flex justify-between">
                                    <Tooltip
                                        title="Color picker"
                                        placement="top"
                                    >
                                        <button
                                            className=""
                                            onClick={handleColorPicker}
                                            type="button"
                                        >
                                            <div
                                                className={`w-5 h-5 rounded-3xl mx-2`}
                                                style={{
                                                    backgroundColor: `${item.color}`,
                                                }}
                                            ></div>
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Eliminar" placement="top">
                                        <button
                                            data-id={item._id}
                                            onClick={handleDeleteZone}
                                            type="button"
                                        >
                                            <DeleteIcon className="w-5 mx-2" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </MuiAccordionSummary>
                        <MuiAccordionDetails>
                            <TextField
                                className={classes.searchControl}
                                fullWidth
                                label="Código"
                                size="small"
                                autoComplete="off"
                                defaultValue={item.zone_code}
                                onChange={handleChangeZoneCode}
                            />
                            {item?.stops?.length <= 0 ? (
                                <p className="mt-4">
                                    Selecciona una parada en el mapa
                                </p>
                            ) : null}
                            {item?.stops?.map((stops) => (
                                <div className="flex justify-between">
                                    <div className="my-2">
                                        <p>{stops.name}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleDeleteStop}
                                            data-id={stops.id}
                                            data-zoneId={item._id}
                                        >
                                            <DeleteIcon className="w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </MuiAccordionDetails>
                    </MuiAccordion>
                ))}
        </div>
    )
}

export default Accordion
