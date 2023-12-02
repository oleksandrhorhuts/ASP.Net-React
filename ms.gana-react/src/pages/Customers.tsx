import React, { useState } from "react";
import { DashboardLayout } from "../organisms";
import { StyledTable } from "../atoms";
import { styled } from "@mui/material/styles";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#808692",
  "& th": {
    color: "#fff"
  }
});

function createData(
  count: number,
  name: string,
  address: string,
  email: string,
  phone: string,
  amount: number,
) {
  return { count, name, address, email, phone, amount };
}

const rows = [
  createData(10, "Audrey Mckinney","1473 Ranchview Dr undefined San Jose" ,"lisa.watson@examp leco m", "(209) 555-0104", 655),
  createData(1, "Savannah Howard","8445 Railroad St undefined Tampa" ,"jeff.brown@example.com", "(201) 555-0124", 205),
  createData(2, "Morris Cooper", "8584 W Sherman Dr undefined Desoto", "terra.hamilton@example.com", "(505) 555-0125", 916),
  createData(2, "Victoria Lane", "1921 Ranchview Dr undefined San Francisco", "deanna.curtis@example.com", "(704) 555-0127", 524),
  createData(9, "Stella Warren", "6380 Fincher Rd undefined Tucson", "keith.richards@example.com", "(219) 555-0114", 608),
  createData(9, "Max Alexander", "4324 Mcclellan Rd undefined Denton", "max.terry@example.com", "(319) 555-0115", 158),
  createData(8, "Guy Richards", "3891 Ranchview Dr undefined Richardson", "renee.hughes@example.com", "(207) 555-0119", 106),
  createData(0, "Kyle Murphy", "8223 Adams St undefined Glendale", "alexa.matthews@example.com", "(603) 555-0123", 231),
  createData(3, "Morris Bell", "3763 W Dallas St undefined Simi Valley", "donald.phillips@example.com", "(843) 555-0130", 282),
  createData(1, "Jacob Black", "6405 Thornridge Cir undefined Jacksonville", "jeff.anderson@example.com", "(270) 555-0117", 102),
  createData(10, "Arlene Steward", "5781 Spring St undefined Salinas", "kenzi.lawson@example.com", "(414) 555-0132", 743),
  createData(5, "Nathan Flores", "9553 Railroad St undefined Lewisville", "chad.stephens@example.com", "(684) 555-0102", 748),
  createData(10, "Audrey Mckinney","1473 Ranchview Dr undefined San Jose" ,"lisa.watson@examp leco m", "(209) 555-0104", 655),
  createData(1, "Savannah Howard","8445 Railroad St undefined Tampa" ,"jeff.brown@example.com", "(201) 555-0124", 205),
  createData(2, "Morris Cooper", "8584 W Sherman Dr undefined Desoto", "terra.hamilton@example.com", "(505) 555-0125", 916),
  createData(2, "Victoria Lane", "1921 Ranchview Dr undefined San Francisco", "deanna.curtis@example.com", "(704) 555-0127", 524),
  createData(9, "Stella Warren", "6380 Fincher Rd undefined Tucson", "keith.richards@example.com", "(219) 555-0114", 608),
  createData(9, "Max Alexander", "4324 Mcclellan Rd undefined Denton", "max.terry@example.com", "(319) 555-0115", 158),
  createData(8, "Guy Richards", "3891 Ranchview Dr undefined Richardson", "renee.hughes@example.com", "(207) 555-0119", 106),
  createData(0, "Kyle Murphy", "8223 Adams St undefined Glendale", "alexa.matthews@example.com", "(603) 555-0123", 231),
  createData(3, "Morris Bell", "3763 W Dallas St undefined Simi Valley", "donald.phillips@example.com", "(843) 555-0130", 282),
  createData(1, "Jacob Black", "6405 Thornridge Cir undefined Jacksonville", "jeff.anderson@example.com", "(270) 555-0117", 102),
  createData(10, "Arlene Steward", "5781 Spring St undefined Salinas", "kenzi.lawson@example.com", "(414) 555-0132", 743),
  createData(5, "Nathan Flores", "9553 Railroad St undefined Lewisville", "chad.stephens@example.com", "(684) 555-0102", 748),
  createData(2, "Victoria Lane", "1921 Ranchview Dr undefined San Francisco", "deanna.curtis@example.com", "(704) 555-0127", 524),
  createData(9, "Stella Warren", "6380 Fincher Rd undefined Tucson", "keith.richards@example.com", "(219) 555-0114", 608),
  createData(9, "Max Alexander", "4324 Mcclellan Rd undefined Denton", "max.terry@example.com", "(319) 555-0115", 158),
  createData(8, "Guy Richards", "3891 Ranchview Dr undefined Richardson", "renee.hughes@example.com", "(207) 555-0119", 106),
  createData(0, "Kyle Murphy", "8223 Adams St undefined Glendale", "alexa.matthews@example.com", "(603) 555-0123", 231),
  createData(3, "Morris Bell", "3763 W Dallas St undefined Simi Valley", "donald.phillips@example.com", "(843) 555-0130", 282),
  createData(1, "Jacob Black", "6405 Thornridge Cir undefined Jacksonville", "jeff.anderson@example.com", "(270) 555-0117", 102),
  createData(10, "Arlene Steward", "5781 Spring St undefined Salinas", "kenzi.lawson@example.com", "(414) 555-0132", 743),
  createData(5, "Nathan Flores", "9553 Railroad St undefined Lewisville", "chad.stephens@example.com", "(684) 555-0102", 748),
];

const Customers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" component="h5" mb={3}>Комитенти</Typography>
      <TableContainer component={Paper}>
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell color="white">Count</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email&nbsp;Address</TableCell>
              <TableCell>Phone&nbsp;Number</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.count}
                </TableCell>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>${row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </DashboardLayout>
  );
}

export default Customers; 