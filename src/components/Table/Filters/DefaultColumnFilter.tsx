import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
      width: "100%",
      marginTop: "10px",
      marginBottom: "10px",
      padding: "0px",
      "& input": {
        background: "transparent !important",
        paddingLeft: "5px !important",
        padding: '14px 0',
      },
    },
  }));

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const classes = useStyles();
  
    return (
      <TextField

      className={classes.searchControl}
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Buscar`}
      />
    )
  }

  export default DefaultColumnFilter