import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

//REDUX
// import { useSelector } from 'react-redux'
// import {
//     createFleetRequest,
//     updateFleetRequest,
// } from 'store/fleetCompany/FleetCompanyActions'
// material-ui
import {
    Grid,
    TextField,
    Theme,
    Typography,
    CardActions,
   
    Button,
    InputAdornment,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router'
import AcceptButton from 'components/buttons/AcceptButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import CancelButton from 'components/buttons/CancelButton'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { updateFareGeneralRequest } from 'store/fare/FareActions'
import { getCategoryRequest } from 'store/Category/CategoryActions'
import Loader from '../../components/buttons/Loader'

const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        marginRight: '5px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
        marginLeft: '-15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
    searchControl: {
        marginTop:'20px',
        width: '100%',
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
        },
    },
}))

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //
interface Inputs {
    nominal_amount:string 
    name:string 
}

const Schema = yup.object().shape({
    name:yup.string(),
    nominal_amount:yup.
    string()
    .matches(/[0-9]+(,[0-9]{0,3})?$/, "Debe ser un número válido ")
    .min(1, 'Debe tener al menos un dígito'),
 
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const FareChangeProfile = ({
    fleetId,
    onlyView,
    readOnly,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
        mode: 'onChange',
    })

    const [loading, setLoading] = React.useState(false)
  const [amounts, setAmounts] = React.useState({});


    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const categories = useSelector(
        (state: DefaultRootStateProps) => state.category
    )



    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        

      
        
        const payload = categories.map((category) => {
            
            
            if (category.id) {
              return {
                category: category.id,
                data: {
                    nominal_amount: amounts[category.id] || 0,
                },
              };
            }
           
          })

       

        
          const filterAmount = payload.map((item) => {
            if (item?.data && typeof item?.data?.nominal_amount === 'string') {
             
              item.data.nominal_amount = parseFloat(item.data.nominal_amount.replace(',', '.'));
            }
            return item;
          }).filter((p) => p?.data?.nominal_amount > 0);

       
        

        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                updateFareGeneralRequest(filterAmount)
            )
            setLoading(false)
            return responseData1
        }
        
        if (!editable) {
           try {
            await  fetchData1()
            navigate(`/`)
           } catch (error) {
            console.log(error)
            
           }
        }

        

    }

    const handleTable = () => {
        navigate(`/`)
    }

    React.useEffect(() => {
        dispatch(getCategoryRequest({per_page: 50,}))
    }, [])

    const handleReturnTable = () => {
        navigate(-1)
    }



    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Cambio de tarifas</Typography>
            </Grid>
            {/* <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly && role !== 'visualizer' ? (
                        <Grid item>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </Grid> */}

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    {categories.length <= 0 ? <Loader/> : 
                    
                    categories.map((category) => {
                        const { title, id } = category ?? []

                        return (
                            <div className="flex flex-col p-5" key={id}>
                                <p className="mt-2">{title}</p>

                                <Controller
                                    name="nominal_amount"
                                    control={control}
                                    render={({ field }) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            className={classes.searchControl}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Monto"
                                                size="small"
                                                autoComplete="off"
                                                {...field}
                                                onChange={(e) => {
                                                    if (id) {
                                                        setAmounts(
                                                            (prevAmounts) => ({
                                                                ...prevAmounts,
                                                                [id.toString()]:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    field.onChange(e)
                                                }}
                                                error={!!errors.nominal_amount}
                                                helperText={
                                                    errors.nominal_amount
                                                        ?.message
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            Bs
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    )}
                                />
                                <br />
                            </div>
                        )
                    })}
                </Grid>

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <CancelEditButton
                                    loading={loading}
                                    handleCancelEdit={handleCancelEdit}
                                />
                                <AcceptButton loading={loading} />
                            </Grid>
                        ) : null}
                        {readOnly ? null : (
                            <>
                                <Grid item sx={{ display: 'flex' }}>
                                    <CancelButton
                                        loading={loading}
                                        handleTable={handleTable}
                                    />
                                    <AcceptButton loading={loading} 
                                    disabled={loading || !watch('nominal_amount')} />
                                </Grid>
                            </>
                        )}
                        <Grid container className="mr-auto">
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        onClick={handleReturnTable}
                                    >
                                        Volver
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default FareChangeProfile
