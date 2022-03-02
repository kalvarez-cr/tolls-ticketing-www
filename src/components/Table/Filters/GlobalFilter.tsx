import React from 'react';
import { useAsyncDebounce } from 'react-table'
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import {
    InputAdornment,
    TextField,
  } from "@material-ui/core";
import { visuallyHidden } from "@material-ui/utils";


  const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
      width: "434px",
      marginLeft: "16px",
      paddingRight: "16px",
      paddingLeft: "16px",
      "& input": {
        background: "transparent !important",
        paddingLeft: "5px !important",
      },
      [theme.breakpoints.down("lg")]: {
        width: "250px",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginLeft: "4px",
        background:
          theme.palette.mode === "dark" ? theme.palette.dark[800] : "#fff",
      },
    },
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    sortSpan: { ...visuallyHidden },
  }));
  

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const classes = useStyles();
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);
  
    return (
      <span>
        <TextField
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          className={classes.searchControl}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          placeholder="Busqueda Global"
          size="small"
        />
      </span>
    );
  }

  export default GlobalFilter