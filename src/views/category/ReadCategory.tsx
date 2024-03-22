import React from 'react'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getCategoryRequest, updateCategoryRequest } from 'store/Category/CategoryActions'
import ActiveStatus from 'components/removeForms/ActiveStatus'

const columns = [
    {
        // Header: ' Tipo de vehículo',
        accessor: 'image',
        disableFilters: true,
    },
    {
        Header: ' Tipo de vehículo',
        accessor: 'title',
    },
    {
        Header: 'Ejes',
        accessor: 'axles',
    },
    {   
        Header:'Código de categoría',
        accessor:'code_category'
    },
    // {
    //     Header: 'Peso(Kg)',
    //     accessor: 'weight_kg',
    // },

    {
        Header: 'Estado',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadFares = () => {
    // ==================== STATE ====================

    const [loading, setLoading] = React.useState(false)
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [pageParam, setPageParam] = React.useState(1)
    const [perPageParam, setperPageParam] = React.useState(10)
    const [searchInputValue, setSearchInputValue] = React.useState<string>('')
    const [selectedId, setSelectedId] = React.useState("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<string>("");
  const [activeStatus, setActiveStatus] = React.useState<boolean>();

    // ================= CUSTOM HOOKS =================

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // ==================== REDUX ====================

    const categories = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const countPage = useSelector(
        (state: DefaultRootStateProps) => state.commons.countPage
    )

    // ==================== FUNCTIONS ====================

    const handleEdit = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const id = e.currentTarget.dataset.id
            navigate(`/categorias/editar/${id}`)
        },
        [navigate]
    )

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/categorias/crear`)
    }

    const handleErrorPic = (e) => {
        e.target.style.src = 'Imagen no disponible'
        e.target.style.display = 'none'
    }


    const handleChangeStatus = (e) => {
        setSelectedId(e.currentTarget.dataset.id);
        const activeButton = e.currentTarget.dataset.active;
        setActiveStatus(activeButton === "true" ? true : false);
        setOpen(true);
        setModal("active");
      };
    
      const handleAccept = async  () => {
        setLoading(true)
        dispatch(
            updateCategoryRequest({
            id: selectedId,
            
              active: !activeStatus,
        
          })
        );
        await dispatch(
            getCategoryRequest({
                _all_: true,
                per_page: perPageParam,
                page: pageParam,
            })
        )
        setLoading(false)
        setOpen(false);
      };

    // const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     const id = e.currentTarget.dataset.id
    //     navigate(`/gestion-de-tarifas/editar/${id}-view`)
    // }

    // ==================== EFFECTS ====================

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (searchInputValue !== '') {
                const data = await dispatch(
                    getCategoryRequest({
                        filter: true,
                        criteria: searchInputValue,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            } else {
                const data = await dispatch(
                    getCategoryRequest({
                        _all_: true,
                        per_page: perPageParam,
                        page: pageParam,
                    })
                )
                setLoading(false)
                return data
            }
        }
        fetchData()
    }, [dispatch, perPageParam, pageParam, searchInputValue])

    React.useEffect(() => {
        const rows = categories.map(
            ({ id, title, axles, active, weight_kg,code_category, image }) => ({
                id,
                title,
                axles,
                weight_kg,
                code_category,
                active: active ? (
                    <button
                      onClick={handleChangeStatus}
                      data-id={id}
                      data-active={active}
                    >
                      <Chip
                        label="Sí"
                        size="small"
                        chipcolor="success"
                        sx={{ width: "96px" }}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={handleChangeStatus}
                      data-id={id}
                      data-active={active}
                    >
                      <Chip
                        label="No"
                        size="small"
                        chipcolor="orange"
                        sx={{ width: "96px" }}
                      />
                    </button>
                  ),
                image: (
                    <img
                        src={image}
                        alt="Imagen no disponible"
                        onError={handleErrorPic}
                        width="70px"
                        height="70px"
                    />
                ),
                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [categories, handleEdit])

    return (
        <>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title=" Categorías de vehículos"
                addIconTooltip="Añadir categoría"
                handleCreate={handleCreate}
                loading={loading}
                pageParam={pageParam}
                setPageParam={setPageParam}
                perPageParam={perPageParam}
                setPerPageParam={setperPageParam}
                countPage={countPage}
                setSearchInputValue={setSearchInputValue}
                createRolNotAllowed={['visualizer', 'administrator']}
            />

{modal === "active" ? (
        <ActiveStatus 
          open={open}
          setOpen={setOpen}
          text="¿Estás  seguro que quieres cambiar el estatus?"
          handleAccept={handleAccept}
        />
      ) : null}
        </>
    )
}

export default ReadFares
