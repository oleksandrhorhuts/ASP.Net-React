import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { styled } from '@mui/material/styles';
import { setRowPerPage } from '../../app/RowPerPageSlice';

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
}: {
  hidden: boolean,
  onFilter: (pageNumberFilter: any) => void,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [clientIdFilter, setClientIdFilter] = useState<any>('');
  const [transporterIdFilter, setTransporterIdFilter] = useState<any>('');
  const [serviceTypeIdFilter, setServiceTypeIdFilter] = useState<any>('');
  const [transportTypeIdFilter, setTransportTypeIdFilter] = useState<any>('');
  const [goodsTypeIdFilter, setGoodsTypeIdFilter] = useState<any>('');
  const [countryFilter, setCountryFilter] = useState<any>('');
  const [cityFilter, setCityFilter] = useState<any>('');

  const [pageNumberFilter, setpageNumberFilter] = useState(10);
  const [positionNumberFilter, setPositionNumberFilter] = useState<any>("");
  const [declarationFilter, setDeclarationFilter] = useState<any>("");
  const [CMRFilter, setCMRFilter] = useState<any | ''>('');
  const [CIMFilter, setCIMFilter] = useState<any | ''>('');
  const [invoiceFilter, setInvoiceFilter] = useState<any | ''>('');
  const [plateNumberFilter, setPlateNumberFilter] = useState<any>("");
  const FilterPageNumber = useRef(10);

  const [params, setParams] = useState ({
    'clientId':clientIdFilter,
    'positionNumber' : positionNumberFilter,
    'declaration' : declarationFilter,
    'plateNumber' : plateNumberFilter,
    'transporterId' : transporterIdFilter,
    'serviceTypeId' : serviceTypeIdFilter,
    'transportTypeId' : transportTypeIdFilter,
    'goodsTypeId' : goodsTypeIdFilter,
    'countryId' : countryFilter,
    'cityId' : cityFilter,
    'cmrNumber' : CMRFilter,
    'cimNumber' : CIMFilter,
    'invoice' : invoiceFilter,
  });
  const handlePageNumberChange = (event: any) => {
    setpageNumberFilter(event.target.value);
    FilterPageNumber.current = event.target.value;
    
      const setUrl = "?" + queryString.stringify(params, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      
      
  };
  const invoiceFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceFilter(e.target.value === '' ? '' : parseFloat(e.target.value));
    setParams((prevParams:any) => {
      const updatedParams = {
        ...prevParams,
        'invoice': e.target.value === '' ? '' : parseFloat(e.target.value),
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const CMRFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCMRFilter(e.target.value === '' ? '' : parseFloat(e.target.value));
    setParams((prevParams:any) => {
      const updatedParams = {
        ...prevParams,
        'cmrNumber': e.target.value === '' ? '' : parseFloat(e.target.value),
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const CIMFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCIMFilter(e.target.value === '' ? '' : parseFloat(e.target.value));
    setParams((prevParams:any) => {
      const updatedParams = {
        ...prevParams,
        'cimNumber': e.target.value === '' ? '' : parseFloat(e.target.value),
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handlePositionNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPositionNumberFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'positionNumber': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });

  }
  const handleDeclarationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeclarationFilter(e.target.value);
    
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'declaration': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });

  }
  const handlePlateNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlateNumberFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'plateNumber': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handleClientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientIdFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'clientId': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handleTransporterIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransporterIdFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'transporterId': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handleServiceTypeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceTypeIdFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'serviceTypeId': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handleTransportTypeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransportTypeIdFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'transportTypeId': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handleGoodsTypeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoodsTypeIdFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'goodsTypeId': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'countryId': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  }
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityFilter(e.target.value);
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        'cityId': e.target.value,
      };
  
      // Use the updatedParams object in the navigate function
      const setUrl = "?" + queryString.stringify(updatedParams, { skipEmptyString: true });
      navigate(setUrl);
      onFilter(FilterPageNumber);
      return updatedParams; // Return the updatedParams to update the state
    });
  };
  useEffect(()=>{
    setPositionNumberFilter(queryParams.get('positionNumber')?queryParams.get('positionNumber'):'');
    setClientIdFilter(queryParams.get('clientId')?queryParams.get('clientId'):'');
    setDeclarationFilter(queryParams.get('declaration')?queryParams.get('declaration'):'');
    setPlateNumberFilter(queryParams.get('plateNumber')?queryParams.get('plateNumber'):'');
    setTransporterIdFilter(queryParams.get('transporterId')?queryParams.get('transporterId'):'');
    setServiceTypeIdFilter(queryParams.get('serviceTypeId')?queryParams.get('serviceTypeId'):'');
    setTransportTypeIdFilter(queryParams.get('transportTypeId')?queryParams.get('transportTypeId'):'');
    setGoodsTypeIdFilter(queryParams.get('goodsTypeId')?queryParams.get('goodsTypeId'):'');
    setCountryFilter(queryParams.get('countryId')?queryParams.get('countryId'):'');
    setCityFilter(queryParams.get('cityId')?queryParams.get('cityId'):'');
    setCMRFilter(queryParams.get('cmrNumber')?queryParams.get('cmrNumber'):'');
    setCIMFilter(queryParams.get('cimNumber')?queryParams.get('cimNumber'):'');
    setInvoiceFilter(queryParams.get('invoice')?queryParams.get('invoice'):'');
    
  },[queryParams])
   

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
          size="small"
          sx={{ width: '100%' }}
          value={clientIdFilter}
          onChange={handleClientIdChange}
        />

        <InputField
          label="Превозник"
          size="small"
          sx={{ width: '100%' }}
          value={transporterIdFilter}
          onChange={handleTransporterIdChange}
        />

        <InputField
          label="Тип Услуга"
          size="small"
          sx={{ width: '100%' }}
          value={serviceTypeIdFilter}
          onChange={handleServiceTypeIdChange}
        />

        <InputField
          label="Тип Превоз"
          defaultValue=""
          size="small"
          sx={{ width: '100%' }}
          value={transportTypeIdFilter}
          onChange={handleTransportTypeIdChange}
        />

        <InputField
          label="Тип Стока"
          defaultValue=""
          size="small"
          sx={{ width: '100%' }}
          value={goodsTypeIdFilter}
          onChange={handleGoodsTypeIdChange}
        />

        <Stack direction="row" gap={1}>
          <InputField
            label="земја"
            defaultValue=""
            size="small"
            value={countryFilter}
            onChange={handleCountryChange}
          />
          <InputField
            label="Градот"
            size="small"
            value={cityFilter}
            onChange={handleCityChange}
          />
        </Stack>
        {/* 
        <Stack direction="row" gap={1}>
          <InputField
            label="ЦМР"
            
            size="small"
          />
          <InputField
            label="ЦИМ"
            defaultValue=""
            size="small"
          />
        </Stack> */}

        {/* <Stack direction="row" gap={1}>
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
        </Stack> */}
      </SidebarBody>
    </SidebarWrapper>
  );
}

export default Sidebar;