import { TextField } from "@mui/material";

function SearchBar(props) {
  return (
    <TextField
      onChange={props.onChange}
      id="standard-search"
      label="Search Name"
      type="search"
      variant="standard"
    />
  );
}
export default SearchBar;
