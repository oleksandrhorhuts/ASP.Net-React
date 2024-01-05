import React, { useState, useRef, useEffect,SetStateAction, Dispatch } from 'react';
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
import { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { CountryDropdown, RegionDropdown  } from 'react-country-region-selector';
import dayjs, { Dayjs } from 'dayjs';
import { variables } from '../../Variable'; 
const citiesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json';

const ModalWrap = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  minWidth: 300,
  minHeight: 500,
  height: '80%',
  overflow: "auto",
  width: '85%',
  padding: 24,
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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

const StyledCountryDropdown = styled(CountryDropdown)({
  padding: '8.5px 14px',
  width: '100%',
  borderColor:'#ced4da',
  borderRadius: 4,
  fontSize: 16,
  color: 'rgb(102, 102, 102)',
  outline:'none',
})
const StyledRegionDropdown = styled(RegionDropdown)({
  padding: '8.5px 14px',
  width: '100%',
  borderColor:'#ced4da',
  borderRadius: 4,
  fontSize: 16,
  color: 'rgb(102, 102, 102)',
  outline:'none',
  marginTop:'10px',
})

interface IDocument {
  type: string,
  file: any,
  handleFiles:Dispatch<SetStateAction<never[]>>
}


const DetailItem = ({
  onClose,
  itemId
}: {
  onClose: () => void,
  itemId:string

}) => {
  //Basic info
  const [ClientId, setClientId] = useState('');
  const [ClientIdList, setClientIdList] = useState<any>([]);
  const [PositionNumber, setPositionNumber] = useState('');
  const [Declaration, setDeclaration] = useState('');
  const [CMRNumber, setCMRNumber] = useState<number | ''>('');
  const CMRNumberchange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCMRNumber(e.target.value === '' ? '' : parseFloat(e.target.value));
  }
  const [CMRFilePath, setCMRFilePath] = useState('CMRFilePath');
  const [CIMNumber, setCIMNumber] = useState<number | ''>('');
  const CIMNumberchange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCIMNumber(e.target.value === '' ? '' : parseFloat(e.target.value));
  }
  const [CIMFilePath, setCIMFilePath] = useState('CIMFilePath');
  const [Record, setRecord] = useState<Dayjs | any>(dayjs(new Date()));
  //Transport
  const [TransporterIdList, setTransporterIdList] = useState<any>([]);
  const [PlateNumber, setPlateNumber] = useState('');
  const [ServiceTypeIdList, setServiceTypeIdList] = useState<any>([]);
  const [TransportTypeIdList, setTransportTypeIdList] = useState<any>([]);
  const [GoodsTypeIdList, setGoodsTypeIdList] = useState<any>([]);
  const [TransporterId, setTransporterId] = useState('');
  const [ServiceTypeId, setServiceTypeId] = useState('');
  const [TransportTypeId, setTransportTypeId] = useState('');
  const [GoodsTypeId, setGoodsTypeId] = useState('');
  //Invoice
  const [InvoiceFilePath, setInvoiceFilePath] = useState('InvoiceFilePath');
  const [InvoiceNumber, setInvoiceNumber] = useState<number | ''>('');
  const InvoiceNumberchange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceNumber(e.target.value === '' ? '' : parseFloat(e.target.value));
  }
  //Destination
  const [country, setcountry] = useState<string>("");
  const [cityList, setCityList] = useState<string[]>([]);
  const [state_region, setstate_region] = useState<string>("");
  const [DepartureDate, setDepartureDate] = useState<Dayjs | any>(dayjs(new Date()));
  const [ArrivalDate, setArrivalDate] = useState<Dayjs | any>(dayjs(new Date()));
  const [IsArrived, setIsArrived] = useState(false);
  //Extras
  const [Note, setNote] = useState('');

  const [invoice, setInvoice] = useState<any>([]);
  const [cmr, setCMR] = useState<any>([]);
  const [cim, setCIM] = useState<any>([]);
  const [inputFile,setInputFile] = useState([]);
  const [extraDocuments, setExtraDocuments] = useState<any>({});
  const latestExtraDocuments = useRef(extraDocuments);
  const [docToAdd, setDocToAdd] = useState("");
  const [unaddedFiles, setUnaddedFiles] = useState<string[]>([
    "Analiza",
    "Anex",
    "Ata Karnet",
    "Avionski Tovaren List",
    "Baranje",
  ]);
  const [toggleDoc, setToggleDoc] = useState(false);
  const [detailInfo, setDetailInfo] = useState<any>([]);

  const selectcountry =async (option: any) => {
      setcountry(option);
      var cities:any[] = [];
      const getCities = await (await fetch(citiesJSON)).json()
      getCities.map((city:any) => {
        if(city.country_name == option){
          cities.push(city.name);
        }
      })
      setCityList(cities);
  }
  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    const Id = itemId;
    try {
      // Make a request to your API
      const responseClient = await fetch(variables.API_URL + 'Autocomplete/client');
      const responseTransporter = await fetch(variables.API_URL + 'Autocomplete/transporter');
      const responseServiceType = await fetch(variables.API_URL + 'Autocomplete/servicetype');
      const responseTransportType = await fetch(variables.API_URL + 'Autocomplete/transporttype');
      const responseGoodsType = await fetch(variables.API_URL + 'Autocomplete/goodstype');
      // Parse the JSON response
      const resultClient: any = await responseClient.json();
      const resultTransporter: any = await responseTransporter.json();
      const resultServiceType: any = await responseServiceType.json();
      const resultTransportType: any = await responseTransportType.json();
      const resultGoodsType: any = await responseGoodsType.json();
      
     // Update the state with the fetched data
      setClientIdList(resultClient);
      setTransporterIdList(resultTransporter);
      setServiceTypeIdList(resultServiceType);
      setTransportTypeIdList(resultTransportType);
      setGoodsTypeIdList(resultGoodsType);
      

      const response = await fetch(variables.API_URL + 'Subject/' + Id);
      const result: any = await response.json();
      setDetailInfo(result);
      setClientId(result.ClientId);
      setTransporterId(result.TransporterId);
      setServiceTypeId(result.ServiceTypeId);
      setTransportTypeId(result.TransportTypeId);
      setGoodsTypeId(result.GoodsTypeId);
      setPositionNumber(result.PositionNumber);
      setDeclaration(result.Declaration);
      setCMRNumber(result.CMRNumber);
      setCIMNumber(result.CIMNumber);
      setRecord(dayjs(result.Record));
      setInvoiceNumber(result.InvoiceNumber);
      setDepartureDate(dayjs(result.DepartureDate));
      setArrivalDate(dayjs(result.ArrivalDate));
      setPlateNumber(result.PlateNumber);
      setNote(result.Notes);
      setcountry(result.Country);
      setstate_region(result.City);
      var cities:any[] = [];
      const getCities = await (await fetch(citiesJSON)).json()
      getCities.map((city:any) => {
        if(city.country_name == result.Country){
          cities.push(city.name);
        }
      })
      setCityList(cities);
      if(result.InvoiceFilePath){
        let invoiceFilePath:any = [{ name: result.InvoiceFilePath}]
        setInvoice(invoiceFilePath);
      }
      if(result.CMRFilePath){
        let cmrFilePath:any = [{ name: result.CMRFilePath}];
        setCMR(cmrFilePath);
      }
      if(result.CIMFilePath){
        let cimFilePath:any = [{ name: result.CIMFilePath}];
        setCIM(cimFilePath);
      }
      if(result.Documents.length > 0){
        let docTypefiles: any[] = [];
        
        result.Documents.map((option: any) => {
          let docType = option.DocumentType;
          docTypefiles.push(docType);
          let fileName:any[] = [];
          if(option.DocumentFilePath){
            fileName = [ {name: option.DocumentFilePath} ];
          }
          setExtraDocuments((prevExtraDocuments: any) => {
            let extraDocument: IDocument = {
              type: docType,
              file: fileName,
              handleFiles: (value) => {
                let doc = prevExtraDocuments[docType];
                if (doc == null) {
                  return;
                }
                doc.extraDocument.file = value;
                setToggleDoc((prevToggleDoc) => !prevToggleDoc);
                return doc.extraDocument.file;
              },
            };
        
            latestExtraDocuments.current = {
              ...prevExtraDocuments,
              [docType]: {
                extraDocument,
              },
            };
        
            return {
              ...prevExtraDocuments,
              [docType]: {
                extraDocument,
              },
            };
          });
        });
        setUnaddedFiles(unaddedFiles.filter(fileType => !docTypefiles.includes(fileType)));
      }
      console.log(result.Documents[0].DocumentType, 'detail Info');
      console.log(result,'detail Info');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeDocumentToAdd = (event: SelectChangeEvent) => {
    setDocToAdd(event.target.value);
  }
  const changeState = (event: any) => {
    setstate_region(event.target.value);
  }
  
  return (
    <ModalWrap>
      <Box>
        <Title>Информация за продукта</Title>
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
          gap={3}
          mt={{md: 3, xs: 2}}
          pr={2}
          justifyContent="start"
          style={{
            overflowY: 'scroll'
          }}
        >
          <DropzoneComponent
            files={invoice}
            setFiles={setInvoice}
            icon={false}
            title="Фактура"
          />
          <DropzoneComponent
            files={cmr}
            setFiles={setCMR}
            icon={false}
            title="ЦМР"
          />
          <DropzoneComponent
            files={cim}
            setFiles={setCIM}
            icon={false}
            title="ЦИМ"
          />
           <Stack
           direction="row"
           gap={2}>
           <Select
                label="Додади документ"
                placeholder="Додади документ"
                size="small"
                onChange={changeDocumentToAdd}
                sx={{
                  width: "100%",
                  marginTop: "0px",
                }}
              >
                {
                   unaddedFiles.map(ft => 
                    <MenuItem value={ft}>{ft}</MenuItem>
                   )
                }
            </Select>
            
            {/* <StyledButton sx={{ borderColor: 'white', padding: '0px 15px' }} >
              Додади
            </StyledButton> */}
           </Stack>
           {
            
            Object.keys(latestExtraDocuments.current).map(extraDoc => 
              <DropzoneComponent
                files={latestExtraDocuments.current[extraDoc].extraDocument.file }
                setFiles={ latestExtraDocuments.current[extraDoc].extraDocument.handleFiles}
                icon={false}
                title={extraDoc}
              />
               
              )
           }
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
              
              <Autocomplete
                freeSolo
                value={ClientId}
                id="free-ClientId"
                size='small'
                disabled
                options={ClientIdList.map((option: any) => option.ClientName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Коминтент"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
                onChange={(event: any, newValue:any)=>{
                      setClientId(newValue);
                }}
              />
              <InputField
                label="Позиција бр."
                defaultValue=""
                size="small"
                disabled
                value={PositionNumber}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPositionNumber(e.target.value);}}
               />
              <InputField
                label="Декларација"
                defaultValue=""
                size="small"
                disabled
                value={Declaration}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setDeclaration(e.target.value);}}
              />
            <InputField
              label="ЦМР"
              defaultValue=""
              size="small"
              type="number"
              disabled
              value={CMRNumber}
              onChange={CMRNumberchange}
              />
            <InputField
              label="ЦИМ"
              defaultValue=""
              size="small"
              type="number"
              disabled
              value={CIMNumber}
              onChange={CIMNumberchange}
            />
             <StyledDatePicker 
              label="Евиденција"
              disabled
              value={Record}
              onChange={(newValue)=>setRecord(newValue)}
              />
            <InputField
              label="Фактура Бр."
              defaultValue=""
              size="small"
              type="number"
              disabled
              value={InvoiceNumber}
              onChange={InvoiceNumberchange}
            />
              {/* <Select
                label=""
                size="small"
                sx={{
                  width: "100%",
                  marginTop: "10px",
                }}
                defaultValue={'male'}
              >
                <MenuItem value={'male'}>male</MenuItem>
                <MenuItem value={'female'}>female</MenuItem>
              </Select> */}
            </InputWrap>
            <InputWrap>
              <SubTitle>Транспорт</SubTitle>
              <Autocomplete
                freeSolo
                value={TransporterId}
                id="free-TransporterId"
                size='small'
                disabled
                options={TransporterIdList.map((option: any) => option.TransporterName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Превозник"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
                onChange={(event: any, newValue:any)=>{
                      setTransporterId(newValue);
                }}
              />
              <InputField
                label="Регистрација"
                defaultValue=""
                size="small"
                disabled
                value={PlateNumber}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPlateNumber(e.target.value);}}
              />
              <Autocomplete
                freeSolo
                value={ServiceTypeId}
                id="free-ServiceTypeId"
                size='small'
                sx={{marginTop:'10px'}}
                disabled
                options={ServiceTypeIdList.map((option: any) => option.ServiceTypeName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Тип Услуга"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
                onChange={(event: any, newValue:any)=>{
                      setServiceTypeId(newValue);
                }}
              />
               <Autocomplete
                freeSolo
                value={TransportTypeId}
                id="free-TransportTypeId"
                size='small'
                sx={{marginTop:'10px'}}
                disabled
                options={TransportTypeIdList.map((option: any) => option.TransportTypeName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Тип Превоз"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
                onChange={(event: any, newValue:any)=>{
                      setTransportTypeId(newValue);
                }}
              />
               <Autocomplete
                freeSolo
                value={GoodsTypeId}
                id="free-GoodsTypeId"
                size='small'
                sx={{marginTop:'10px'}}
                disabled
                options={GoodsTypeIdList.map((option: any) => option.GoodsTypeName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Тип Стока"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
                onChange={(event: any, newValue:any)=>{
                      setGoodsTypeId(newValue);
                }}
              />
              
               
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
            {/* <InputWrap>
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
            </InputWrap> */}
            <InputWrap>
              <SubTitle>Дестинација</SubTitle>
              <StyledCountryDropdown
                  value={country}
                  onChange={selectcountry}
                  disabled
              />
              {/* <StyledRegionDropdown
                country={country}
                value={state_region}
                disabled
                onChange={(val) => setstate_region(val)} 
              /> */}
              <Select value={state_region} disabled onChange={changeState} size="small" sx={{ marginTop:'10px'}}>
                <MenuItem value="" disabled>Select City</MenuItem>
                {cityList.map((city:any, index) => (
                  <MenuItem key={index} value={city}>{city}</MenuItem>
                ))}
              </Select>
              
              <StyledDatePicker 
                label="Поаѓање"
                value={DepartureDate}
                disabled
                onChange={(newValue)=>setDepartureDate(newValue)}
              />
              <StyledDatePicker 
                label="Пристигнување"
                value={ArrivalDate}
                disabled
                onChange={(newValue)=>setArrivalDate(newValue)}
              />
            </InputWrap>
            <InputWrap>
              <SubTitle>Забелешка</SubTitle>
                <InputField
                multiline
                rows={7}
                label="Забелешка"
                defaultValue=""
                size="small"
                value={Note}
                disabled
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setNote(e.target.value);}}
              />
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
        mb={0}
        mt={2}
      >
        <CancelButton cancel={onClose} />
      </Stack>
    </ModalWrap>
  );
}

export default DetailItem;