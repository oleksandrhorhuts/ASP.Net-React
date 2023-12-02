import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { CancelButton, DropzoneComponent } from "../../atoms";

const ModalWrap = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  minWidth: 300,
  minHeight: 500,
  maxHeight: 700,
  height: '70%',
  overflow: "auto",
  width: '70%',
  padding: 24,
  borderRadius: 10
});

const InputField = styled(TextField)({
  marginTop: 10
});

const StyledButton = styled(Button)({
  backgroundColor: '#293055 !important',
  borderColor: '#293055',
  color: 'white',
});

const StyledDatePicker = styled(DatePicker)({
  marginTop: 8,
  '& input': {
    padding: '9px 14px'
  }
});

const InputWrap = styled(Stack)({
  width: '100%',
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 34,
  fontWeight: 700,
  textAlign: "center",
  [theme.breakpoints.down('md')]: {
    fontSize: 24,
  }
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 400,
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  }
}));

const NewItem = ({
  onClose
}: {
  onClose: () => void
}) => {
  const [file1, setFile1] = useState([]);
  const [file2, setFile2] = useState([]);
  const [file3, setFile3] = useState([]);
  const [file4, setFile4] = useState([]);

  return (
    <ModalWrap>
      <Box>
        <Title>Нов Предмет</Title>
      </Box>
      <Stack
        sx={{
          width: '100%'
        }}
        direction={{
          md: "row",
          xs: "column"
        }}
        gap={2}
      >
        <Stack
          width={{lg: '40%', xs: '100%'}}
          gap={2}
          mt={{md: 3, xs: 2}}
          justifyContent="space-around"
        >
          <DropzoneComponent
            files={file1}
            setFiles={setFile1}
            icon={false}
            title="ЦМР"
          />
          <DropzoneComponent
            files={file2}
            setFiles={setFile2}
            icon={false}
            title="ЦМР"
          />
          <DropzoneComponent
            files={file3}
            setFiles={setFile3}
            icon={false}
            title="Предмет"
          />
          <DropzoneComponent
            files={file4}
            setFiles={setFile4}
            icon={false}
            title="Предмет"
          />
        </Stack>
        <Box width={{lg: '60%', xs: '100%'}} mt={{md: 3, xs: 2}}>
          <Stack
            direction={{
              lg: "row",
              xs: "column"
            }}
            gap={1}
          >
            <InputWrap>
              <SubTitle>Основни Податоци</SubTitle>
              <InputField
                label="Коминтент"
                defaultValue=""
                size="small"
              />
              <InputField
                label="Коминтент"
                defaultValue=""
                size="small"
              />
              <StyledDatePicker />
              <Select
                label="Коминтент"
                size="small"
                sx={{
                  width: "100%",
                  marginTop: "10px",
                }}
                defaultValue={'male'}
              >
                <MenuItem value={'male'}>male</MenuItem>
                <MenuItem value={'female'}>female</MenuItem>
              </Select>
            </InputWrap>
            <InputWrap>
              <SubTitle>Транспорт</SubTitle>
              <InputField
                label="Позиција бр."
                defaultValue=""
                size="small"
              />
              <InputField
                label="Коминтент"
                defaultValue=""
                size="small"
              />
              <StyledDatePicker />
              <Select
                label="Коминтент"
                size="small"
                sx={{
                  width: "100%",
                  marginTop: "10px",
                }}
                defaultValue={'male'}
              >
                <MenuItem value={'male'}>male</MenuItem>
                <MenuItem value={'female'}>female</MenuItem>
              </Select>
            </InputWrap>
          </Stack>
          <Stack
            direction={{
              lg: "row",
              xs: "column"
            }}
            gap={1}
            mt={3}
          >
            <InputWrap>
              <SubTitle>Основни Податоци</SubTitle>
              <List sx={{ width: '100%' }}>
                  {
                    [0, 1, 2, 3].map((value) => 
                      <ListItem disablePadding key={value}>
                        <ListItemButton role={undefined} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                      </ListItem>
                    )
                  }
              </List>
            </InputWrap>
            <InputWrap>
              <SubTitle>Основни Податоци</SubTitle>
              <InputField
                label="First Name"
                defaultValue=""
                size="small"
              />
              <InputField
                label="Last Name"
                defaultValue=""
                size="small"
              />
              <StyledDatePicker />
              <Select
                label="Gender"
                size="small"
                sx={{
                  width: "100%",
                  marginTop: "10px",
                }}
                defaultValue={'male'}
              >
                <MenuItem value={'male'}>male</MenuItem>
                <MenuItem value={'female'}>female</MenuItem>
              </Select>
            </InputWrap>
          </Stack>
        </Box>
      </Stack>
      
      <Stack
        direction={{
          md: 'row',
          xs: 'column'
        }}
        gap={1}
        mt={2}
      >
        <CancelButton cancel={onClose} />
        <StyledButton sx={{ borderColor: 'white' }}>
          Save Change
        </StyledButton>
      </Stack>
    </ModalWrap>
  );
}

export default NewItem;