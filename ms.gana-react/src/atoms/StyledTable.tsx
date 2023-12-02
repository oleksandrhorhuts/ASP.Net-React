import React from 'react';
import { Table } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTable = styled(Table)(({ theme }) => ({
  '& td': {
    padding: '12px 16px',
    borderRight: '1px solid #e0e0e0 !important'
  },
  [theme.breakpoints.down('md')]: {
    '& td': {
      fontSize: 12,
      padding: '8px 16px'
    },
    '& th': {
      fontSize: 12,
      padding: '8px 16px'
    }
  }
}));

export default function Component({
    children,
    sx
}: {
    children: React.ReactNode
    sx: Object
}) {
  return (
    <StyledTable sx={sx}>
        {children}
    </StyledTable>
  );
}
