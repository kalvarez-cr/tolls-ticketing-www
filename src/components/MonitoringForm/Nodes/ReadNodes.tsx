import { useNavigate } from 'react-router-dom'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { Button, Grid } from '@material-ui/core'
import MainCard from 'ui-component/cards/MainCard'

interface monitoringProps {
    monitoringData?: any
}

const ReadNodes = ({ monitoringData }: monitoringProps) => {
    const navigate = useNavigate()

    const handleReturn = () => {
        navigate(-1)
    }

    const prodImage = require.context('../../../../public/', true)

    return (
        <>
            <MainCard content={true}>
                <div className=" grid sm:grid-cols-2 md:grid-cols-4 place-content-center">
                    {monitoringData.map(({ image, node_code, online }) => {
                        const prodProfile =
                            image && prodImage(`./${image}`).default
                        return (
                            <>
                                <div className="flex flex-col xs:mt-8 sm:mt-8">
                                    <img
                                        src={prodProfile}
                                        alt="monitorizacion"
                                        width="70px"
                                        height="70px"
                                    />
                                    <div className="font-bold uppercase mt-1 ">
                                        <span>{node_code}</span>
                                    </div>
                                    <div className="">
                                        <div className="mt-2">
                                            {online ? (
                                                <div className=" rounded-full w-4 h-4 bg-green-500 border-2 border-black">
                                                    <p className="ml-5 font-semibold">
                                                        En línea
                                                    </p>
                                                </div>
                                            ) : online === 'Unknown' ? (
                                                <div className="rounded-full w-4 h-4 bg-yellow-300 border-2 border-black">
                                                    <p className="ml-5 font-semibold">
                                                        {' '}
                                                        Conexión lenta{' '}
                                                    </p>
                                                </div>
                                            ) : online === 'Offline' ? (
                                                <div className="rounded-full w-4 h-4 bg-red-700 border-2 border-black">
                                                    <p className="ml-5 font-semibold">
                                                        {' '}
                                                        Sin conexión{' '}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>

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
