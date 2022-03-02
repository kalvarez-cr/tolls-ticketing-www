import { CardContent, Grid, IconButton, Tooltip } from '@material-ui/core'

// project imports
// import GlobalFilter from './Filters/GlobalFilter'

// assets
import FilterListIcon from '@material-ui/icons/FilterListTwoTone'
import PrintIcon from '@material-ui/icons/PrintTwoTone'

const TopOptions = ({
    handleCreate,
    // globalFilterState,
    setFilters,
    // setGlobalFilter,
    filters,
    extraOptionIcon,
    extraOptionAction,
}) => {
    return (
        <CardContent>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                {/* <Grid item xs={12} sm={6}>
                    <GlobalFilter
                        globalFilter={globalFilterState.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </Grid> */}
                <Grid item xs={12} sm={12} sx={{ textAlign: 'right' }}>
                    {/* <Tooltip title="Copy">
              <IconButton>
              <FileCopyIcon />
              </IconButton>
            </Tooltip> */}
                    <Tooltip title="Imprimir">
                        <IconButton>
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filtros">
                        <IconButton onClick={() => setFilters(!filters)}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                    {extraOptionIcon ? (
                        <Tooltip title="Mapa">
                            <IconButton onClick={extraOptionAction}>
                                {extraOptionIcon}
                            </IconButton>
                        </Tooltip>
                    ) : null}
                </Grid>
            </Grid>
        </CardContent>
    )
}

export default TopOptions
