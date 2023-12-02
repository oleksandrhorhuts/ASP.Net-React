import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  backgroundColor: "white",
  color: "#293055",
  borderColor: "#293055 !important"
});

export default function CancelButton({
  cancel
}: {
  cancel: () => void
}) {
  return (
    <StyledButton
      variant="outlined"
      onClick={cancel}
      disableRipple
    >
      Cancel
    </StyledButton>
  );
}
