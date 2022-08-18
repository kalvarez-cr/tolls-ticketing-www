import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { Button, Grid } from '@material-ui/core'
import MainCard from 'ui-component/cards/MainCard'
import { Stage, Layer, Group, Image, Text, Rect } from 'react-konva'
import useImage from 'use-image'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateMonitoringRequest } from 'store/monitoring/MonitoringAction'

interface monitoringProps {
    monitoringData?: any
}

const ReadNodes = ({ monitoringData }: monitoringProps) => {
    const [draggedId, setDraggedId] = useState('')
    const [xCoords, setXCoords] = useState(10)
    const [yCoords, setYCoords] = useState(10)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleReturn = () => {
        navigate(-1)
    }

    useEffect(() => {
        dispatch(
            updateMonitoringRequest({
                node: draggedId,
                x_axis: xCoords,
                y_axis: yCoords,
            })
        )
    }, [xCoords, yCoords])

    const [imageGate] = useImage(
        'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/barrier_open.png'
    )

    const [imageMachine] = useImage(
        'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/monitor.png'
    )

    const [imageScanner] = useImage(
        'https://cdn-icons-png.flaticon.com/512/3082/3082030.png'
    )

    const [imageCamera] = useImage('https://cdn-icons.flaticon.com/png/512/2062/premium/2062684.png?token=exp=1660855799~hmac=6d651575a418ff164c47afe12f0a51c8')

    console.log(monitoringData)
    // console.log(draggedId)
    // const prodImage = require.context('../../../../public/', true)

    return (
        <>
            <MainCard content={true}>
                <Stage height={300} width={window.innerWidth}>
                    <Layer>
                        {monitoringData.map(
                            ({
                                id,
                                node_type,
                                node_code,
                                active,
                                x_axis,
                                y_axis,
                            }) => {
                                return (
                                    <Group
                                        id={id}
                                        draggable
                                        x={x_axis}
                                        y={y_axis}
                                        onDragEnd={(e) => {
                                            setDraggedId(id)
                                            // console.log(e.target.attrs.x)
                                            setXCoords(e.target.attrs.x)
                                            setYCoords(e.target.attrs.y)
                                        }}
                                    >
                                        <Image
                                            image={
                                                node_type === 'Maquina de Venta'
                                                    ? imageMachine
                                                    : node_type === 'Puerta'
                                                    ? imageGate
                                                    : node_type === 'Validador'
                                                    ? imageScanner
                                                    : imageCamera
                                            }
                                            height={90}
                                            width={90}
                                        />
                                        <Text
                                            text={node_code}
                                            fontStyle="bold"
                                            fontSize={14}
                                            fill="#4B5563"
                                            x={5}
                                            y={100}
                                        />
                                        <Rect
                                            stroke={
                                                active ? '#A7F3D0' : '#FECDD3'
                                            }
                                            strokeWidth={5}
                                            fill={
                                                active ? '#A7F3D0' : '#FECDD3'
                                            }
                                            cornerRadius={6}
                                            height={16}
                                            width={80}
                                            x={10}
                                            y={120}
                                        />
                                        <Text
                                            text="Activo"
                                            fontStyle="bold"
                                            fontSize={12}
                                            fill={
                                                active ? '#34D399' : '#FB7185'
                                            }
                                            align="center"
                                            x={32}
                                            y={122}
                                        />
                                    </Group>
                                )
                            }
                        )}
                    </Layer>
                </Stage>
                {/* <div className=" grid sm:grid-cols-1 md:grid-cols-4 ">
                    {monitoringData.map(({ image, node_code, active }) => {
                        const prodProfile =
                            image && prodImage(`./${image}`).default
                        return (
                            <>
                                <div className="flex flex-col ml-28">
                                    <img
                                        src={prodProfile}
                                        alt="monitorizacion"
                                        width="70px"
                                        height="70px"
                                    />
                                    <div className="font-bold uppercase mt-1 ">
                                        <span>{node_code}</span>
                                    </div>
                                    <div className="mt-2">
                                        {active ? (
                                            <Chip
                                                label="Activo"
                                                size="small"
                                                chipcolor="success"
                                                sx={{ width: '96px' }}
                                            />
                                        ) : (
                                            <Chip
                                                label="Inactivo"
                                                size="small"
                                                chipcolor="orange"
                                                sx={{ width: '96px' }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div> */}

                <Grid
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '15px',
                    }}
                >
                    <AnimateButton>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleReturn}
                        >
                            Volver
                        </Button>
                    </AnimateButton>
                </Grid>
            </MainCard>
        </>
    )
}

export default ReadNodes
