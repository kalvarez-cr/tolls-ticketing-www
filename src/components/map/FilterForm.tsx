import React from 'react'
import { Button, Grid, MenuItem, TextField, Theme } from '@material-ui/core'
import MainCard from 'ui-component/cards/MainCard'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { useSelector } from 'react-redux'
import {
    useForm,
    // SubmitHandler,
    Controller,
    SubmitHandler,
    // SubmitErrorHandler,
} from 'react-hook-form'
import { DefaultRootStateProps } from 'types'

// style constant
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

interface Inputs {
    stop_code: string
    name: string
    route: string
    type: string
    state: string
    municipality: string
}

const FilterForm = ({ setFilterOptions }) => {
    const classes = useStyles()
    const {
        handleSubmit,
        control,
        // formState: { errors, dirtyFields },
        // setValue,
        // getValues,
        reset,
        setValue,
    } = useForm<Inputs>()
    const stateOptions = useSelector(
        (state: DefaultRootStateProps) => 
            state.login?.user?.content?.web_config.estate
        )
    const cities = useSelector(
        (state: DefaultRootStateProps) =>
            state.login?.user?.content?.web_config.cities
    )

    const [type, setType] = React.useState<string>('')
    const [state, setState] = React.useState<string>('')
    const [municipality, setMunicipality] = React.useState<string>('')
    const [CitiesSelected, setCitiesSelected] = React.useState<any>([])

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        setFilterOptions(data)
    }

    const handleState = (event) => {
        event.preventDefault()
        const target = event.target
        const code = target.value
        const state = stateOptions.find((state) => state.state_code === code)
        var option = new Array()
        cities.map((items) => {
            if (items.state === state.name) {
                option.push(items)
            }
        })
        setCitiesSelected(option)
        setValue('state', code)
    }

    const handleCleanFields = () => {
        reset({
            // stop_code: '',
            // name: '',
            route: '',
            type: '',
            state: '',
            municipality: '',
        })
        setType('')
        setState('')
        setMunicipality('')
    }

    return (
        <Grid item xs={12} md={10} lg={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MainCard>
                    {/* <Controller
                        name="stop_code"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.searchControl}
                                fullWidth
                                label="Código"
                                size="small"
                                autoComplete="off"
                                // error={!!errors.legal_representative}
                                // helperText={errors.legal_representative?.message}
                                // disabled={readOnly}
                            />
                        )}
                    />

                    <Controller
                        name="name"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.searchControl}
                                fullWidth
                                label="Nombre"
                                size="small"
                                autoComplete="off"
                                // error={!!errors.legal_representative}
                                // helperText={errors.legal_representative?.message}
                                // disabled={readOnly}
                            />
                        )}
                    /> */}
                    <Controller
                        name="route"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.searchControl}
                                fullWidth
                                label="Ruta"
                                size="small"
                                autoComplete="off"
                                // error={!!errors.legal_representative}
                                // helperText={errors.legal_representative?.message}
                                // disabled={readOnly}
                            />
                        )}
                    />
                    <Controller
                        name="type"
                        control={control}
                        defaultValue={type}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Tipo"
                                size="small"
                                autoComplete="off"
                                className={classes.searchControl}
                                // onChange={onChangeFilialCompany}
                                // error={!!errors.filialCompany}
                                // helperText={
                                //     errors.filialCompany?.message
                                // }
                                // disabled={readOnly}
                            >
                                {[
                                    { label: 'urbana', value: 'urbana' },
                                    { label: 'rural', value: 'rural' },
                                ].map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                    <Controller
                        name="state"
                        control={control}
                        defaultValue={state}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Estado"
                                size="small"
                                autoComplete="off"
                                className={classes.searchControl}
                                onChange={(event) => handleState(event)}
                                // error={!!errors.filialCompany}
                                // helperText={
                                //     errors.filialCompany?.message
                                // }
                                // disabled={readOnly}
                            >
                                {stateOptions.map((option) => (
                                    <MenuItem
                                        key={option.state_code}
                                        value={option.state_code}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name="municipality"
                        control={control}
                        defaultValue={municipality}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Municipio"
                                size="small"
                                autoComplete="off"
                                className={classes.searchControl}
                                disabled={
                                    CitiesSelected.length === 0
                                        ? true
                                        : false
                                }
                                // onChange={onChangeFilialCompany}
                                // error={!!errors.filialCompany}
                                // helperText={
                                //     errors.filialCompany?.message
                                // }
                                // disabled={readOnly}
                            >
                                {CitiesSelected.map((option) => (
                                    <MenuItem
                                        key={option.city_code}
                                        value={option.city_code}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-around',
                            margin: '10px 0 0 0',
                        }}
                    >
                        <AnimateButton>
                            <Button
                                variant="contained"
                                // color="success"
                                size="large"
                                onClick={handleCleanFields}
                                className="w-full"
                            >
                                Limpiar
                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                size="large"
                                type="submit"
                                className="w-full"
                            >
                                Aplicar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </MainCard>
            </form>
        </Grid>
    )
}

export default FilterForm
