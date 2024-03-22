import React from 'react'

import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import {
    Grid,
    IconButton,
    TextField,
    Theme,
    Tooltip,
    Autocomplete,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { makeStyles } from '@material-ui/styles'
import MainCard from 'ui-component/cards/MainCard'
import {  getFareByTollId } from 'store/fare/FareActions'
import RemoveFare from 'components/removeForms/RemoveFare'
import { getFilteredRequest } from 'store/filtered/filteredActions'
// import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) => ({
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

const columns = [
    {
        Header: 'Peaje',
        accessor: 'sites',
        disableFilters: true,
    },
    {
        Header: 'Categoría',
        accessor: 'title',
    },
    {
        Header: 'Nombre',
        accessor: 'fare_name',
    },

    {
        Header: 'Precio',
        accessor: 'nominal_amount',
    },
    {
        Header: 'Factor por peso(Bs)',
        accessor: 'weight_factor',
        align: 'right',
    },

    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadCategory = () => {
    // ==================== STATE ====================

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState<boolean>(false)
    const [modal, setModal] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState('')
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    // const [searchInputValue, setSearchInputValue] = React.useState<string>('') para el buscador
    const [selectedToll, setSelectedToll] = React.useState<any>(
        null
      );

    // ================= CUSTOM HOOKS =================

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const {
    //     setValue,
    //     register,
    // } = useForm<any>()

    // ==================== REDUX ====================

    const fares = useSelector((state: DefaultRootStateProps) => state.fare)
    const tolls = useSelector(
        (state: DefaultRootStateProps) => state.filtered
    ).map((toll) => ({ id: toll.id, name: toll.value }))
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )
    const companyCode = useSelector(( state: DefaultRootStateProps) => state?.login?.user?.company_info?.company_code)  

    const referToll = useSelector(( state: DefaultRootStateProps) => state?.login?.user?.employee_info?.toll_sites)

    const awsAragua = companyCode === '5002' && referToll.length > 0   
 

    const awsPao = companyCode === '5003' && referToll.length > 0  

    const role = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.role
    )
    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/tarifas/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/tarifas/crear`)
    }

    const handleDeleteFare = (e) => {
        setSelectedId(e.currentTarget.dataset.id)
        setOpen(true)
        setModal('remove')
    }

    // const handleTollFiltering = (event, newValue) => {
    //     setSearchInputValue('')
    //     const name = newValue
    //     setLoading(true)
    //     dispatch(
    //         getFilteredRequest({
    //             criteria: 'site',
    //             param: name,
    //         })
    //     )
    //     setLoading(false)
    // }

    const handleTollSelection = (event, newValue) => {
        setLoading(true)
        setSelectedToll(newValue?.id)
        setLoading(false)
    }

    // const onChange = async (e) => {
    //     const id = e.target.value

    //     const getData = async () => {
    //         setLoading(true)
    //         await dispatch(getFareByTollId({ site_id: id }))
    //         setLoading(false)
    //     }
    //     getData()
    // }

    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchToll = async () => {
       
         setLoading(true)
         const data =  await  dispatch(
            getFilteredRequest({
                criteria: 'site',
                param: '',
            })
        )
         setLoading(false)
         
         
         setSelectedToll(data[0]?.id)
         
         
        }
     
        fetchToll()
     },[])
  

     React.useEffect(() => {
    
        if(selectedToll){
          const fetch = async () => {
            setLoading(true);
          let body = {
            site_id: selectedToll,
                        per_page: perPageParam,
                        page: pageParam,
          };
          
         await  dispatch(getFareByTollId(body));
          setLoading(false);
          }
          fetch()
        }
        
        
      }, [pageParam, perPageParam, selectedToll]);

    // React.useEffect(() => {
       
    //     const fetchData = async () => {
    //         setLoading(true)
    //         if (searchInputValue !== '') {
    //             const data = await dispatch(
    //                 getFareRequest({
    //                     filter: true,
    //                     criteria: searchInputValue,
    //                     per_page: perPageParam,
    //                     page: pageParam,
    //                 })
    //             )
    //             setLoading(false)
    //             return data
    //         } else if(selectedToll) {
    //             const data = await dispatch(
    //                 getFareByTollId({
    //                     site_id: selectedToll,
    //                     per_page: perPageParam,
    //                     page: pageParam,
    //                 })
    //             )
    //             setLoading(false)
    //             return data
    //         }
    //     }
    //     fetchData()
    // }, [ perPageParam, pageParam, selectedToll, searchInputValue])

    React.useEffect(() => {
       if(selectedToll){
        const rows = fares?.map(
            ({
                fare_name,
                title,
                nominal_amount,
                weight_factor,
                sites,
                nominal_iso_code,
                id,
            }) => ({
                fare_name,
                title,
                nominal_amount,
                weight_factor,
                sites: sites?.map((site) => <div>{site.site_name}</div>),
                id,
                // active: active ? (
                //     <Chip
                //         label="Habilitado"
                //         size="small"
                //         chipcolor="success"
                //         sx={{ width: '96px' }}
                //     />
                // ) : (
                //     <Chip
                //         label="Deshabilitado"
                //         size="small"
                //         chipcolor="orange"
                //         sx={{ width: '96px' }}
                //     />
                // ),
                edit: (
                    <div className="flex">
                        <Tooltip title="Ver" placement="bottom">
                            <button data-id={id} onClick={handleEdit}>
                                <IconButton color="primary">
                                    <VisibilityIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>
                       {role === 'general_administrator' ? null : 
                        <Tooltip title="Eliminar">
                            <button data-id={id} onClick={handleDeleteFare}>
                                <IconButton color="primary">
                                    <RemoveCircleIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </button>
                        </Tooltip>}
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
       }
    }, [fares, handleEdit])

    return (
        <>
            <MainCard content={true}>
                <Grid container>
                <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            className={classes.searchControl}
          >
            {
              selectedToll && (<Autocomplete
              id="toll"
              options={tolls}
              autoSelect={true}
              size="small"
              disableClearable
              defaultValue={{id: tolls[0]?.id ,name: tolls[0]?.name }}
              // @ts-ignore
              getOptionLabel={(option) => option?.name}
              loading={loading}
              onChange={handleTollSelection}
              loadingText="Cargando..."
              noOptionsText="No existen peajes."
              renderInput={(params) => (
                <TextField {...params} name="toll" label="Peaje" />
              )}
            />)
            }
          </Grid>
                </Grid>
            </MainCard>

            <div className="my-6">
                <TableCustom
                    columns={columns}
                    data={rowsInitial}
                    title=" Categorías de tarifas"
                    addIconTooltip="Añadir tarifas"
                    handleCreate={handleCreate}
                    loading={loading}
                    pageParam={pageParam}
                    setPageParam={setPageParam}
                    perPageParam={perPageParam}
                    setPerPageParam={setperPageParam}
                    countPage={countPage}
                    // setSearchInputValue={setSearchInputValue}
                    createRolNotAllowed={['visualizer', 'crm_user', 'monitor_viewer', 'report_viewer', 'gate_device', 'operator', 'administrator']}
                    awsAragua={awsAragua}
                    awsPao={awsPao}
                />
            </div>

            {modal === 'remove' ? (
                <RemoveFare
                    open={open}
                    setOpen={setOpen}
                    selectedId={selectedId}
                />
            ) : null}
        </>
    )
}

export default ReadCategory
