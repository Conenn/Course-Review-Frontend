import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox(props) {
  const courses = [];
  props.data.map((course) => {
    return courses.push(course.id + " - " + course.name);
  });

  return (
    <Autocomplete
      disablePortal
      id="course-combo-box"
      options={courses}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Choose Course" />}
    />
  );
}
