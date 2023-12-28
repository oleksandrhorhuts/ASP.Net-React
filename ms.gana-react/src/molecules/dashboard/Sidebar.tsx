import React, { useState, useRef } from 'react';
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

const Sidebar = ({
  hidden = false, 
  onFilter,
  
}:{
  hidden: boolean,
  onFilter: (pageNumberFilter:any, positionNumberFilter:any,declarationFilter:any,
    CMRFilter:any,CIMFilter:any,invoiceFilter:any,plateNumberFilter:any) => void,
  
}) => {
  const [pageNumberFilter, setpageNumberFilter] = useState(10);
  const [positionNumberFilter, setPositionNumberFilter] = useState("");
  const [declarationFilter, setDeclarationFilter] = useState("");
  const [CMRFilter, setCMRFilter] = useState<number | ''>('');
  const [CIMFilter, setCIMFilter] = useState<number | ''>('');
  const [invoiceFilter, setInvoiceFilter] = useState<number | ''>('');
  const [plateNumberFilter, setPlateNumberFilter] = useState("");
  const FilterPageNumber = useRef(10);
  const FilterPositionNumber = useRef("");
  const FilterDeclaration = useRef("");
  const FilterCMR = useRef("");
  const FilterCIM = useRef("");
  const FilterInvoice = useRef("");
  const FilterPlateNumber = useRef("");
  const handlePageNumberChange = (event: any) => {
    setpageNumberFilter(event.target.value);
    FilterPageNumber.current = event.target.value;
    onFilter(FilterPageNumber,FilterPositionNumber,FilterDeclaration,FilterCMR,FilterCIM,FilterInvoice,FilterPlateNumber);
  };
  const invoiceFilterChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceFilter(e.target.value === '' ? '' : parseFloat(e.target.value));
    FilterInvoice.current = e.target.value;
    onFilter(FilterPageNumber,FilterPositionNumber,FilterDeclaration,FilterCMR,FilterCIM,FilterInvoice,FilterPlateNumber);

  }
  const CMRFilterChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCMRFilter(e.target.value === '' ? '' : parseFloat(e.target.value));
    FilterCMR.current = e.target.value;
    onFilter(FilterPageNumber,FilterPositionNumber,FilterDeclaration,FilterCMR,FilterCIM,FilterInvoice,FilterPlateNumber);

  }
  const CIMFilterChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCIMFilter(e.target.value === '' ? '' : parseFloat(e.target.value));
    FilterCIM.current = e.target.value;
    onFilter(FilterPageNumber,FilterPositionNumber,FilterDeclaration,FilterCMR,FilterCIM,FilterInvoice,FilterPlateNumber);

  }
  const handlePositionNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPositionNumberFilter(e.target.value);
    FilterPositionNumber.current = e.target.value;
    onFilter(FilterPageNumber,FilterPositionNumber,FilterDeclaration,FilterCMR,FilterCIM,FilterInvoice,FilterPlateNumber);
  }
  const handleDeclarationChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setDeclarationFilter(e.target.value);
    FilterDeclaration.current = e.target.value;
    onFilter(FilterPageNumber,FilterPositionNumber,FilterDeclaration,FilterCMR,FilterCIM,FilterInvoice,FilterPlateNumber);
  }
  const handlePlateNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPlateNumberFilter(e.target.value);
    FilterPlateNumber.current = e.target.value;
    onFilter(FilterPageNumber,FilterPositionNumber,FilterDeclaration,FilterCMR,FilterCIM,FilterInvoice,FilterPlateNumber);
  }
  
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
          value={pageNumberFilter}
          onChange={handlePageNumberChange}
        >
          {/* <MenuItem value={10000000000}>
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <Stack direction="row" gap={1}>
          <InputField
            label="Позиција бр."
            value={positionNumberFilter}
            onChange={handlePositionNumberChange}
            size="small"
          />
          <InputField
            label="Декларација"
            value={declarationFilter}
            onChange={handleDeclarationChange}
            size="small"
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <InputField
            label="ЦМР"
            defaultValue=""
            size="small"
            type="number"
            value={CMRFilter}
            onChange={CMRFilterChange}
          />
          <InputField
            label="ЦИМ"
            defaultValue=""
            size="small"
            type="number"
            value={CIMFilter}
            onChange={CIMFilterChange}
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <InputField
            label="Регистрација"
            value={plateNumberFilter}
            onChange={handlePlateNumberChange}
            size="small"
          />
          <InputField
            label="Фактура"
            defaultValue=""
            size="small"
            type="number"
            value={invoiceFilter}
            onChange={invoiceFilterChange}
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