import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CancelButton, ModalTable, DropzoneComponent } from "../../atoms";

const ModalWrap = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  minWidth: 300,
  width: "60%",
  padding: 24,
  borderRadius: 10,
});

const StyledButton = styled(Button)({
  backgroundColor: "#293055 !important",
  borderColor: "#293055",
  color: "white",
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 34,
  fontWeight: 700,
  [theme.breakpoints.down('md')]: {
    fontSize: 24,
  }
}));

const Connect = ({
  onClose
}: {
  onClose: () => void
}) => {
  const [files, setFiles] = useState([]);

  return (
    <ModalWrap>
      <Box>
        <Title>Соедини</Title>
        <Typography color={"#575F6E"}>Прикачете Excel file и соедини неповрзана релевантна информација</Typography>
      </Box>

      {
        files.length > 0 && (
          <Box
            width={"100%"}
            mt={3}
            sx={{
              overflow: 'auto',
              maxHeight: 350
            }}
          >
            <Stack
              direction={{
                md: "row",
                xs: "column"
              }}
              gap={{
                md: 5,
                xs: 2
              }}
            >
              <ModalTable />
              <ModalTable />
            </Stack>
          </Box>   
        )
      }
      <Stack mt={2}>
        <DropzoneComponent
          files={files}
          setFiles={setFiles}
        />
      </Stack>
      <Stack
        direction={{
          lg: "row",
          xS: "column"
        }}
        gap={1}
        mt={2}
      >
        <CancelButton cancel={onClose} />
        <StyledButton sx={{ borderColor: "white" }}>
          Додади Информација
        </StyledButton>
      </Stack>
    </ModalWrap>
  );
}

export default Connect;