import React from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
      width: "100%",
      marginTop: "10px",
      marginBottom: "10px",
      "& input": {
        background: "transparent !important",
        paddingLeft: "5px !important",
      },
    },
  }));

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const classes = useStyles();
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
    console.log(options)
    // Render a multi-select box
    return (
      <Select
        className={classes.searchControl}
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <MenuItem value="">todos</MenuItem>
        {options.map((option: any, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    )
  }

  export default SelectColumnFilter;