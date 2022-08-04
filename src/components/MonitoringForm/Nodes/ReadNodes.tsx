import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
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
                <div className=" grid sm:grid-cols-1 md:grid-cols-4 ">
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
