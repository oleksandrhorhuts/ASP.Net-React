import React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#808692",
  "& th": {
    color: "#fff",
    padding: '4px 16px',
    fontSize: 12
  }
});

const StyledTable = styled(Table)({
  "& td": {
    padding: '8px 16px',
    fontSize: 12,
    borderRight: '1px solid #e0e0e0 !important'
  }
});

function createData(
  name: string,
  address: string,
  email: string,
) {
  return { name, address, email };
}

const rows = [
  createData("Audrey Mckinney","1473 Ranchview Dr undefined San Jose" ,"lisa.watson@examp leco m"),
  createData("Savannah Howard","8445 Railroad St undefined Tampa" ,"jeff.brown@example.com"),
  createData("Morris Cooper", "8584 W Sherman Dr undefined Desoto", "terra.hamilton@example.com"),
  createData("Victoria Lane", "1921 Ranchview Dr undefined San Francisco", "deanna.curtis@example.com"),
  createData("Stella Warren", "6380 Fincher Rd undefined Tucson", "keith.richards@example.com"),
  createData("Max Alexander", "4324 Mcclellan Rd undefined Denton", "max.terry@example.com"),
  createData("Guy Richards", "3891 Ranchview Dr undefined Richardson", "renee.hughes@example.com"),
  createData("Kyle Murphy", "8223 Adams St undefined Glendale", "alexa.matthews@example.com"),
  createData("Morris Bell", "3763 W Dallas St undefined Simi Valley", "donald.phillips@example.com"),
  createData("Jacob Black", "6405 Thornridge Cir undefined Jacksonville", "jeff.anderson@example.com"),
  createData("Arlene Steward", "5781 Spring St undefined Salinas", "kenzi.lawson@example.com"),
];

const ModalTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 550
      }}
    >
      <StyledTable aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableCell color="white">Box</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email&nbsp;Address</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Checkbox sx={{padding: 0}} />
              </TableCell>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default ModalTable; 