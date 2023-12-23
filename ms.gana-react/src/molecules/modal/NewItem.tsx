import React, { useState, useEffect,SetStateAction, Dispatch } from 'react';
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

interface IDocument {
  type: string,
  file: any,
  setFiles:Dispatch<SetStateAction<never[]>>
}

const NewItem = ({
  onClose
}: {
  onClose: () => void
}) => {
  const [invoice, setInvoice] = useState([]);
  const [cmr, setCMR] = useState([]);
  const [cim, setCIM] = useState([]);
  const [extraDocuments, setExtraDocuments] = useState<any>({});
  const [docToAdd, setDocToAdd] = useState("");
  const [unaddedFiles, setUnaddedFiles] = useState<string[]>([]);

  const allFileTypes = [
    "Analiza",
    "Anex",
    "Ata Karnet",
    "Avionski Tovaren List",
    "Baranje",
  ]

  useEffect(() => {
    setUnaddedFiles(allFileTypes);
  }, []);

  const changeDocumentToAdd = (event: SelectChangeEvent) => {
    setDocToAdd(event.target.value);
  }
  const addDocument = () => {
    if(docToAdd == "") {return;}
    setUnaddedFiles(unaddedFiles.filter(item => item !== docToAdd));
    let extraDocument : IDocument = {
      type: docToAdd,
      file: [],
      setFiles: (value => {
        let doc = extraDocuments[extraDocument.type]
        if(doc == null) {
          return;
        }
        doc.file = value;
        setExtraDocuments((existingExtra:any) => {
          return {
            ...existingExtra,
            [extraDocument.type]: {
              doc
            }
          }
        })

      })
    }
    setExtraDocuments((existingExtra:any) => {
      return {
        ...existingExtra,
        docToAdd: {
          extraDocument
        }
      }
    })
  }
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
           {
            Object.keys(extraDocuments).map(extraDoc => 
              <DropzoneComponent
              files={extraDocuments[extraDoc].file}
              setFiles={extraDocuments[extraDoc].setFiles}
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
              <InputField
                label="Коминтент"
                defaultValue=""
                size="small"
              />
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
            <StyledDatePicker 
              label="Евиденција"/>
            <InputField
              label="Фактура Бр."
              defaultValue=""
              size="small"
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
              <InputField
                label="Превозник"
                defaultValue=""
                size="small"
              />
              <InputField
                label="Регистрација"
                defaultValue=""
                size="small"
              />
              <InputField
                label="Тип Услуга"
                defaultValue=""
                size="small"
              />
              <InputField
                label="Тип Превоз"
                defaultValue=""
                size="small"
              />
              <InputField
                label="Тип Стока"
                defaultValue=""
                size="small"
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
              <InputField
                label="Држава"
                defaultValue=""
                size="small"
              />
              <InputField
                label="Град"
                defaultValue=""
                size="small"
              />
              <StyledDatePicker 
                label="Поаѓање"/>
                <StyledDatePicker 
                  label="Пристигнување"/>
            </InputWrap>
            <InputWrap>
              <SubTitle>Забелешка</SubTitle>
                <InputField
                multiline
                rows={7}
                label="Забелешка"
                defaultValue=""
                size="small"
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
        <StyledButton sx={{ borderColor: 'white' }}>
          Save Change
        </StyledButton>
      </Stack>
    </ModalWrap>
  );
}

export default NewItem;