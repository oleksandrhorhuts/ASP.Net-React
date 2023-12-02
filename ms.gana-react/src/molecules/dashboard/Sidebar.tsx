import React from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: 43,
}));

const SidebarWrapper = styled(Box)(({ theme, hidden }) => ({
  width: '15%',
  minWidth: '250px',
  minHeight: '100%',
  backgroundColor: '#F0F0F0',
  position: 'relative',
  display: 'block',
  [theme.breakpoints.down('md')]: {
    display: hidden ? 'none' : 'block'
  }
}));

const SidebarBody = styled(Box)({
  padding: '0 10px'
});

const InputField = styled(TextField)({
  marginTop: 10,
  '& input': {
    padding: '6px 14px'
  }
});

const Sidebar = ({hidden = false}) => {
  return (
    <SidebarWrapper hidden={hidden}>
      <SidebarHeader mt={{ md: 3, xs: 2 }}>
        <Typography variant="h5" component="h6">Филтри</Typography>
      </SidebarHeader>
      <SidebarBody>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Коминтент"
          size="small"
          sx={{
            width: '100%',
            marginTop: 3,
          }}
          defaultValue={10}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <Stack direction="row" gap={1}>
          <InputField
            label="Позиција бр."
            defaultValue=""
            size="small"
          />
          <InputField
            label="Декларација"
            defaultValue=""
            size="small"
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <InputField
            label="ЦМР"
            defaultValue=""
            size="small"
          />
          <InputField
            label="ЦИМ"
            defaultValue=""
            size="small"
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <InputField
            label="Регистрација"
            defaultValue=""
            size="small"
          />
          <InputField
            label="Фактура"
            defaultValue=""
            size="small"
          />
        </Stack>

        <InputField
          label="Коминтент"
          defaultValue=""
          size="small"
          sx={{width: '100%'}}
        />

        <InputField
          label="Коминтент"
          defaultValue=""
          size="small"
          sx={{width: '100%'}}
        />

        <InputField
          label="Коминтент"
          defaultValue=""
          size="small"
          sx={{width: '100%'}}
        />

        <InputField
          label="Коминтент"
          defaultValue=""
          size="small"
          sx={{width: '100%'}}
        />

        <InputField
          label="Коминтент"
          defaultValue=""
          size="small"
          sx={{width: '100%'}}
        />

        <Stack direction="row" gap={1}>
          <InputField
            label="Позиција бр."
            defaultValue=""
            size="small"
          />
          <InputField
            label="Декларација"
            defaultValue=""
            size="small"
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <InputField
            label="ЦМР"
            defaultValue=""
            size="small"
          />
          <InputField
            label="ЦИМ"
            defaultValue=""
            size="small"
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <InputField
            label="Регистрација"
            defaultValue=""
            size="small"
          />
          <InputField
            label="Фактура"
            defaultValue=""
            size="small"
          />
        </Stack>
      </SidebarBody>
    </SidebarWrapper>
  );
}

export default Sidebar;