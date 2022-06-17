import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
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
    MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {
    createTagRequest,
    updateTagRequest,
} from 'store/saleTag/saleTagActions'
import { useDispatch, useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'
// import { vehicle } from '_mockApis/vehicle_category/vehicle'
import { DefaultRootStateProps, SaleTag } from 'types'
import { useNavigate } from 'react-router'
import { Media } from 'store/constant'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'

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
    tag_number: string
    tag_serial: string
    media: string
}

const Schema = yup.object().shape({
    tag_number: yup
        .string()
        .required('Este campo es requerido')
        .max(12, 'Debe tener máximo 12 carácteres'),
    tag_serial: yup.string().required('Este campo es requerido'),
    media: yup.string().required('Este campo es requerido'),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const TagProfile = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tag = useSelector((state: DefaultRootStateProps) => state.saleTag)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [loading, setLoading] = React.useState(false)
    const [editable, setEditable] = React.useState<boolean>(false)
    const [TagData] = React.useState<SaleTag | undefined>(
        tag?.find((tag) => tag.id === fleetId)
    )

    // const [usedTitle, setUsedTitle] = React.useState<boolean>(true)

    // const [dataUser, setDataUser] = React.useState<any>([])

    // const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const name = event.target.name

    //     if (name === 'active') {
    //         setUsedTitle(!usedTitle)
    //         setValue(name, !usedTitle)
    //     }
    // }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('tag_number', TagData?.tag_number, {
            shouldValidate: true,
        })
        setValue('tag_serial', TagData?.tag_serial, {
            shouldValidate: true,
        })
        setValue('media', TagData?.media, {
            shouldValidate: true,
        })
    }
    React.useEffect(() => {
        setValue('tag_number', TagData?.tag_number)
        setValue('tag_serial', TagData?.tag_serial)
        setValue('media', TagData?.media)
    }, [TagData, setValue])
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { tag_number, tag_serial, media } = data
        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(
                createTagRequest({
                    tag_number,
                    tag_serial,
                    media: media.toUpperCase(),
                    is_deleted: false,
                })
            )
            setLoading(false)
            return responseData1
        }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateTagRequest({
                    id: TagData?.id,
                    tag_number,
                    tag_serial,
                    media: media.toUpperCase(),
                    is_deleted: false,
                })
            )
            setLoading(false)
            return responseData2
        }
        if (!editable) {
            fetchData1()
        }

        if (editable) {
            fetchData2()
        }
        navigate(`/ventaTag`)
    }
    // const handleTable = () => {
    //     navigate(`/ventaTag`)
    // }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Asociación de tag con categoría
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    {/* <Grid item>
                        <Avatar
                            alt="logo de la empresa"
                            className={classes.userAvatar}
                        />
                    </Grid> */}
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="tag_number"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Número de tag"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.tag_number}
                                    helperText={errors.tag_number?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="tag_serial"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Serial del tag"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.tag_serial}
                                    helperText={errors.tag_serial?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="media"
                        control={control}
                        defaultValue={TagData?.media}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Media"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.media}
                                    helperText={errors.media?.message}
                                    disabled={readOnlyState}
                                >
                                    {Media.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                </Grid>

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Grid item>
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
                                    {/* <Grid item>
                                        <CancelButton loading={loading} handleTable={handleTable} />
                                    </Grid> */}
                                    <Grid item>
                                        <AcceptButton loading={loading} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default TagProfile
