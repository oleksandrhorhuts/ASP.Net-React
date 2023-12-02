import React from 'react';
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  top: 41,
  left: 10,
  backgroundColor: '#29305580',
  minWidth: 40,
  height: 40,
  borderRadius: 20,
  zIndex: 1300,
  '& svg': {
    color: '#F0F0F0'
  },
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ToggleButton({
  toggle
}: {
  toggle: () => void
}) {
  return (
    <StyledButton onClick={toggle}>
      <MenuIcon />
    </StyledButton>
  );
}
