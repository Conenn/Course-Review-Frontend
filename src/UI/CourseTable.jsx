import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import classes from "./CourseTable.module.css";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "difficulty", align: "center", label: "Difficulty 1/5", minWidth: 100 },
  {
    id: "avgWorkload",
    label: "Time to Complete/Hours",
    minWidth: 170,
    align: "center",
  },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "right",
  },
];

export default function StickyHeadTable(props) {
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.data.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Sort by highest course rating
  props.data.sort((a, b) => {
    return b.rating - a.rating;
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course) => {
                return (
                  <TableRow
                    className={classes.row}
                    onClick={() =>
                      navigate(`/course/${course.id}`, { state: { ...course } })
                    }
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={course.id}
                  >
                    {columns.map((column) => {
                      const value = course[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 
      Left in here until alignment is fixed or new table along with functions
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        className="justify-content-center"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
