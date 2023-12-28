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


const EditItem = ({
  onClose,
  itemId,
  onSave,
}: {
  onClose: () => void,
  itemId:string
  onSave: () => void,
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

  const [Analiza, setAnaliza] = useState<any>([]);
  const [showAnaliza,setShowAnaliza] = useState(false);
  const [Anex, setAnex] = useState<any>([]);
  const [showAnex,setShowAnex] = useState(false);
  const [Ata, setAta] = useState<any>([]);
  const [showAta,setShowAta] = useState(false);
  const [Avionski, setAvionski] = useState<any>([]);
  const [showAvionski,setShowAvionski] = useState(false);
  const [Baranje, setBaranje] = useState<any>([]);
  const [showBaranje,setShowBaranje] = useState(false);

  const selectcountry = (option: any) => {
      setcountry(option);
  }
  const [selectClientName, setSelectClientName] = useState("");
  const [selectTransporterName, setSelectTransporterName] = useState("");
  const [selectSerivceTypeName, setSelectServiceTypeName] = useState("");
  const [selectTransportTypeName, setSelectTransportTypeName] = useState("");
  const [selectGoodsTypeName, setSelectGoodsTypeName] = useState("");

  //Click Save change button
  const editData = async () => {
    let invoiceFilePath: any;
    let cmrFilePath: any;
    let cimFilePath: any;
    let DocData:any[] = [];
    if(showAnaliza == true){
      let AnalizaData:any = {"DocumentType":"Analiza", "DocumentFilePath":null};
      if(Analiza.length>0){
        AnalizaData = {
          "DocumentType":"Analiza",
          "DocumentFilePath": Analiza[0].name
        } ;
        if(Analiza[0].path != ""){
          let fileExtension = Analiza[0].name.split('.', 2)[1];
              let fileName = Analiza[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
              const formData:any = new FormData();
              formData.append('file', Analiza[0],fileName);
              try{
                const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                  method: "POST",
                  body: formData
                });
                const data = await response.json();
                AnalizaData = {
                  "DocumentType":"Analiza",
                  "DocumentFilePath": data
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
        } 
      }
      DocData.push(AnalizaData);
    }
    if(showAnex == true){
      let AnexData:any = {"DocumentType":"Anex", "DocumentFilePath":null};
      if(Anex.length>0){
        AnexData = {
          "DocumentType":"Anex",
          "DocumentFilePath": Anex[0].name
        } ;
        if(Anex[0].path != ""){
          let fileExtension = Anex[0].name.split('.', 2)[1];
              let fileName = Anex[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
              const formData:any = new FormData();
              formData.append('file', Anex[0],fileName);
              try{
                const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                  method: "POST",
                  body: formData
                });
                const data = await response.json();
                AnexData = {
                  "DocumentType":"Anex",
                  "DocumentFilePath": data
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
        } 
      }
      DocData.push(AnexData);
    }
    if(showAta == true){
      let AtaData:any = {"DocumentType":"Ata Karnet", "DocumentFilePath":null};
      if(Ata.length>0){
        AtaData = {
          "DocumentType":"Ata Karnet",
          "DocumentFilePath": Ata[0].name
        } ;
        if(Ata[0].path != ""){
          let fileExtension = Ata[0].name.split('.', 2)[1];
              let fileName = Ata[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
              const formData:any = new FormData();
              formData.append('file', Ata[0],fileName);
              try{
                const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                  method: "POST",
                  body: formData
                });
                const data = await response.json();
                AtaData = {
                  "DocumentType":"Ata Karnet",
                  "DocumentFilePath": data
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
        } 
      }
      DocData.push(AtaData);
    }
    if(showAvionski == true){
      let AvionskiData:any = {"DocumentType":"Avionski Tovaren List", "DocumentFilePath":null};
      if(Avionski.length>0){
        AvionskiData = {
          "DocumentType":"Avionski Tovaren List",
          "DocumentFilePath": Avionski[0].name
        } ;
        if(Avionski[0].path != ""){
          let fileExtension = Avionski[0].name.split('.', 2)[1];
              let fileName = Avionski[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
              const formData:any = new FormData();
              formData.append('file', Avionski[0],fileName);
              try{
                const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                  method: "POST",
                  body: formData
                });
                const data = await response.json();
                AvionskiData = {
                  "DocumentType":"Avionski Tovaren List",
                  "DocumentFilePath": data
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
        } 
      }
      DocData.push(AvionskiData);
    }
    if(showBaranje == true){
      let BaranjeData:any = {"DocumentType":"Baranje", "DocumentFilePath":null};
      if(Baranje.length>0){
        BaranjeData = {
          "DocumentType":"Baranje",
          "DocumentFilePath": Baranje[0].name
        } ;
        if(Baranje[0].path != ""){
          let fileExtension = Baranje[0].name.split('.', 2)[1];
              let fileName = Baranje[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
              const formData:any = new FormData();
              formData.append('file', Baranje[0],fileName);
              try{
                const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                  method: "POST",
                  body: formData
                });
                const data = await response.json();
                BaranjeData = {
                  "DocumentType":"Baranje",
                  "DocumentFilePath": data
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
        } 
      }
      DocData.push(BaranjeData);
    }
    
    if(invoice.length>0){
      invoiceFilePath = invoice[0].name;
      if(invoice[0].path != ""){
        let fileExtension = invoice[0].name.split('.', 2)[1];
            let fileName = invoice[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
            const formData:any = new FormData();
            formData.append('file', invoice[0],fileName);
            try{
              const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                method: "POST",
                body: formData
              });
              const data = await response.json();
              invoiceFilePath = data;
            } catch (error) {
              console.error('Error uploading file:', error);
            }
      } 
    }
    if(cmr.length>0){
      cmrFilePath = cmr[0].name;
      if(cmr[0].path != ""){
        let fileExtension = cmr[0].name.split('.', 2)[1];
            let fileName = cmr[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
            const formData:any = new FormData();
            formData.append('file', cmr[0],fileName);
            try{
              const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                method: "POST",
                body: formData
              });
              const data = await response.json();
              cmrFilePath = data;
            } catch (error) {
              console.error('Error uploading file:', error);
            }
      } 
    }
    if(cim.length>0){
      cimFilePath = cim[0].name;
      if(cim[0].path != ""){
        let fileExtension = cim[0].name.split('.', 2)[1];
            let fileName = cim[0].name.split('.', 2)[0] + Math.floor(Math.random() * 1000000000000) + '.' + fileExtension;
            const formData:any = new FormData();
            formData.append('file', cim[0],fileName);
            try{
              const response = await fetch(variables.API_URL + 'Subject/SaveFile', {
                method: "POST",
                body: formData
              });
              const data = await response.json();
              cimFilePath = data;
            } catch (error) {
              console.error('Error uploading file:', error);
            }
      } 
    }
    console.log(cmrFilePath,'cmrFilePath');
    console.log(cimFilePath,'cimFilePath');
    const data = {
      "ClientId": ClientId,
      "PositionNumber": PositionNumber,
      "Declaration": Declaration,
      "CMRNumber": CMRNumber,
      "CMRFilePath": cmrFilePath,
      "CIMNumber": CIMNumber,
      "CIMFilePath": cimFilePath,
      "Record": Record.$d,
      "TransporterId": TransporterId,
      "PlateNumber": PlateNumber,
      "ServiceTypeId": ServiceTypeId,
      "TransportTypeId": TransportTypeId,
      "GoodsTypeId": GoodsTypeId,
      "InvoiceNumber": InvoiceNumber,
      "InvoiceFilePath": invoiceFilePath,
      "Country": country,
      "City": state_region,
      "DepartureDate": DepartureDate.$d,
      "ArrivalDate": ArrivalDate.$d,
      "IsArrived": IsArrived,
      "Notes": Note,
      "Documents": DocData,
    }

    try {
      const response = await fetch(variables.API_URL + 'Subject/' + itemId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('POST request successful:', result);
    } catch (error) {
      console.error('Error during POST request:');
    }
    
    onSave();
    onClose();
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
      resultClient.map((option:any) => {
        if(option.Id == result.ClientId){
          setSelectClientName(option.ClientName);
        } 
      })
      setTransporterId(result.TransporterId);
      resultTransporter.map((option:any) => {
        if(option.Id == result.TransporterId){
          setSelectTransporterName(option.TransporterName);
        } 
      })
      setServiceTypeId(result.ServiceTypeId);
      resultServiceType.map((option:any) => {
        if(option.Id == result.ServiceTypeId){
          setSelectServiceTypeName(option.ServiceTypeName);
        } 
      })
      setTransportTypeId(result.TransportTypeId);
      resultTransportType.map((option:any) => {
        if(option.Id == result.TransportTypeId){
          setSelectTransportTypeName(option.TransportTypeName);
        } 
      })
      setGoodsTypeId(result.GoodsTypeId);
      resultGoodsType.map((option:any) => {
        if(option.Id == result.GoodsTypeId){
          setSelectGoodsTypeName(option.GoodsTypeName);
        } 
      })
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
      if(result.InvoiceFilePath){
        let invoiceFilePath:any = [{ name: result.InvoiceFilePath, path:""}]
        setInvoice(invoiceFilePath);
      }
      if(result.CMRFilePath){
        let cmrFilePath:any = [{ name: result.CMRFilePath, path:""}];
        setCMR(cmrFilePath);
      }
      if(result.CIMFilePath){
        let cimFilePath:any = [{ name: result.CIMFilePath, path:""}];
        setCIM(cimFilePath);
      }
      if(result.Documents.length > 0){
        let docTypefiles: any[] = [];
        result.Documents.map((option: any) => {
          let docType = option.DocumentType;
          docTypefiles.push(docType);
          if(docType == "Analiza"){ 
            setShowAnaliza(true);
            if(option.DocumentFilePath != null){
              setAnaliza([{ name: option.DocumentFilePath, path:""}])
            }
          }
          if(docType == "Anex"){ 
            setShowAnex(true);
            if(option.DocumentFilePath != null){
              setAnex([{ name: option.DocumentFilePath, path:""}])
            }
          }
          if(docType == "Ata Karnet"){ 
            setShowAta(true);
            if(option.DocumentFilePath != null){
              setAta([{ name: option.DocumentFilePath, path:""}])
            }
          }
          if(docType == "Avionski Tovaren List"){ 
            setShowAvionski(true);
            if(option.DocumentFilePath != null){
              setAvionski([{ name: option.DocumentFilePath, path:""}])
            }
          }
          if(docType == "Baranje"){ 
            setShowBaranje(true);
            if(option.DocumentFilePath != null){
              setBaranje([{ name: option.DocumentFilePath, path:""}])
            }
          }
        });
        setUnaddedFiles(unaddedFiles.filter(fileType => !docTypefiles.includes(fileType)));
      }
      console.log(result,'detail Info');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeDocumentToAdd = (event: SelectChangeEvent) => {
    setDocToAdd(event.target.value);
  }
  
  const addDocument = () => {
    setToggleDoc((prevToggleDoc) => !prevToggleDoc);
    console.log(toggleDoc)
    if(docToAdd == "") {return;}
    setUnaddedFiles(unaddedFiles.filter(item => item !== docToAdd));
    if(docToAdd == "Analiza"){
      setShowAnaliza(true);
    }
    if(docToAdd == "Anex"){
      setShowAnex(true);
    }
    if(docToAdd == "Ata Karnet"){
      setShowAta(true);
    }
    if(docToAdd == "Avionski Tovaren List"){
      setShowAvionski(true);
    }
    if(docToAdd == "Baranje"){
      setShowBaranje(true);
    }
  }
  
  return (
    <ModalWrap>
      <Box>
        <Title>Редактиране на продукт</Title>
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
            
            <StyledButton sx={{ borderColor: 'white', padding: '0px 15px' }} onClick={addDocument}>
              Додади
            </StyledButton>
           </Stack>
           {/* {
            
            Object.keys(latestExtraDocuments.current).map(extraDoc => 
              <DropzoneComponent
                files={latestExtraDocuments.current[extraDoc].extraDocument.file }
                setFiles={ latestExtraDocuments.current[extraDoc].extraDocument.handleFiles}
                icon={false}
                title={extraDoc}
              />
               
              )
           } */}
           {
            showAnaliza && (
              <DropzoneComponent
                files={Analiza}
                setFiles={setAnaliza}
                icon={false}
                title="Analiza"
              />
            )
           }
          {
            showAnex && (
              <DropzoneComponent
                files={Anex}
                setFiles={setAnex}
                icon={false}
                title="Anex"
              />
            )
          }
          {
            showAvionski && (
              <DropzoneComponent
                files={Avionski}
                setFiles={setAvionski}
                icon={false}
                title="Avionski Tovaren List"
              />
            )
          }
          {
            showAta && (
              <DropzoneComponent
                files={Ata}
                setFiles={setAta}
                icon={false}
                title="Ata Karnet"
              />
            )
          }
          {
            showBaranje && (
              <DropzoneComponent
                files={Baranje}
                setFiles={setBaranje}
                icon={false}
                title="Baranje"
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
                value={selectClientName}
                id="free-ClientId"
                size='small'
                disableClearable
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
                  ClientIdList.map((option: any) =>{
                    if(option.ClientName == newValue)
                    {
                      setClientId(option.Id);
                      // setSelectClientName(option.ClientName);
                    }
                  })
                }}
              />
              <InputField
                label="Позиција бр."
                defaultValue=""
                size="small"
                value={PositionNumber}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPositionNumber(e.target.value);}}
               />
              <InputField
                label="Декларација"
                defaultValue=""
                size="small"
                value={Declaration}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setDeclaration(e.target.value);}}
              />
            <InputField
              label="ЦМР"
              defaultValue=""
              size="small"
              type="number"
              value={CMRNumber}
              onChange={CMRNumberchange}
              />
            <InputField
              label="ЦИМ"
              defaultValue=""
              size="small"
              type="number"
              value={CIMNumber}
              onChange={CIMNumberchange}
            />
             <StyledDatePicker 
              label="Евиденција"
              value={Record}
              onChange={(newValue)=>setRecord(newValue)}
              />
            <InputField
              label="Фактура Бр."
              defaultValue=""
              size="small"
              type="number"
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
                value={selectTransporterName}
                id="free-TransporterId"
                size='small'
                disableClearable
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
                  TransporterIdList.map((option: any) =>{
                    if(option.TransporterName == newValue)
                    {
                      setTransporterId(option.Id);
                    }
                  })
                }}
              />
              <InputField
                label="Регистрација"
                defaultValue=""
                size="small"
                value={PlateNumber}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPlateNumber(e.target.value);}}
              />
              <Autocomplete
                freeSolo
                value={selectSerivceTypeName}
                id="free-ServiceTypeId"
                size='small'
                sx={{marginTop:'10px'}}
                disableClearable
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
                  ServiceTypeIdList.map((option: any) =>{
                    if(option.ServiceTypeName == newValue)
                    {
                      setServiceTypeId(option.Id);
                    }
                  })
                }}
              />
               <Autocomplete
                freeSolo
                value={selectTransportTypeName}
                id="free-TransportTypeId"
                size='small'
                sx={{marginTop:'10px'}}
                disableClearable
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
                  TransportTypeIdList.map((option: any) =>{
                    if(option.TransportTypeName == newValue)
                    {
                      setTransportTypeId(option.Id);
                    }
                  })
                }}
              />
               <Autocomplete
                freeSolo
                value={selectGoodsTypeName}
                id="free-GoodsTypeId"
                size='small'
                sx={{marginTop:'10px'}}
                disableClearable
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
                  GoodsTypeIdList.map((option: any) =>{
                    if(option.GoodsTypeName == newValue)
                    {
                      setGoodsTypeId(option.Id);
                    }
                  })
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
              />
              <StyledRegionDropdown
                country={country}
                value={state_region}
                onChange={(val) => setstate_region(val)} 
              />
              
              <StyledDatePicker 
                label="Поаѓање"
                value={DepartureDate}
                onChange={(newValue)=>setDepartureDate(newValue)}
              />
              <StyledDatePicker 
                label="Пристигнување"
                value={ArrivalDate}
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
        <StyledButton sx={{ borderColor: 'white' }} onClick={editData}>
          Save Change
        </StyledButton>
      </Stack>
    </ModalWrap>
  );
}

export default EditItem;