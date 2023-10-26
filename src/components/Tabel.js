import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import axios from "axios";
import { API_URL } from "../Config/configInfo";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "jobTitle", label: "Job Title", minWidth: 100 },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minWidth: 170,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 220,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

export default function StickyHeadTable(props) {
  const { userDownList, setTog } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userDownList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "action") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              color="error"
                              onClick={() => {
                                let status = handleDelete({
                                  email: row["email"],
                                });
                                if (status) setTog(true);
                              }}
                            >
                              {" "}
                              delete{" "}
                            </Button>
                          </TableCell>
                        );
                      }
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userDownList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const handleDelete = async (userEmail) => {
  try {
    const data = await axios.post(`${API_URL}user/delete`, {
      ...userEmail,
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
