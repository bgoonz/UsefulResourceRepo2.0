import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  label: {
    color: "#ffffff",
    fontSize: "2rem",
    fontFamily: "Roboto",
    fontWeight: 300,
    marginLeft: "20px",
  },

  selecta: {
    color: "#ffffff",
    fontSize: "2rem",
    borderColor: "#ffffff",
    fontFamily: "Roboto",
    fontWeight: 300,
    width: "500px",
    borderBottom: "2px solid #ffffff",
    margin: "0 0 50px 20px",
    "&:before": {
      borderColor: "#ffffff",
    },
    "&:after": {
      borderColor: "#ffffff",
    },
    "&:active": {
      background: "#00BCD4",
    },
  },

  icon: {
    fill: "#ffffff",
  },

  selected: {
    backgroundColor: "#00BCD4",
    fontWeight: 600,
  },
}));

const Filter = (props) => {
  const [category, setCategory] = useState("");
  const [hideLabel, setLabel] = useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    props.changeCategory(event.target.value);
    setCategory(event.target.value);
    setLabel(true);
  };

  return (
    <>
      <FormControl>
        <InputLabel
          hidden={hideLabel}
          id="select-label"
          shrink={false}
          className={classes.label}
        >
          Discover Amazing Experiences
        </InputLabel>
        <Select
          disableUnderline={true}
          labelId="select-label"
          className={classes.selecta}
          inputProps={{
            classes: {
              icon: classes.icon,
            },
          }}
          value={category}
          defaultValue="Discover Amazing Experiences"
          onChange={handleChange}
        >
          <MenuItem disabled value="Placeholder">
            <em>Discover Amazing Experiences</em>
          </MenuItem>
          {props.categories.map((c) => (
            <MenuItem
              key={c.id}
              value={c.name}
              classes={{ selected: classes.selected }}
            >
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Filter;
