import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'
import { Input } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
        padding: '0px',
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
            padding: '14px 0',
        },
    },
}))

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const classes = useStyles()

    return (
        <Input
            className={classes.searchControl}
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Buscar`}
            size="small"
        />
    )
}

export default DefaultColumnFilter
