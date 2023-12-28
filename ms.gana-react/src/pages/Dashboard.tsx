import React, { useEffect, useState, useRef } from "react";
import { DashboardLayout } from "../organisms";
import { StyledTable } from "../atoms";
import { styled } from "@mui/material/styles";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Modal
} from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import { variables } from "../Variable";
import { DetailItem, EditItem } from "../molecules";


const StyledTableHead = styled(TableHead)({
  backgroundColor: "#808692",
  textAlign:'center',
  "& th": {
    color: "#fff"
  }
});

const AlarmPosition = styled(Stack)({
  position: 'absolute',
  top: '10px',
  right: '10px'
})

function createData(
  count: number,
  name: string,
  address: string,
  email: string,
  phone: string,
  amount: number,
) {
  return { count, name, address, email, phone, amount };
}

 
interface DashboardProps {
  trigger: boolean;
}

const Dashboard = (props: DashboardProps) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setrows] = useState<any>([]);
  const [AlertMessage, setAlert] = useState(false);
  const [AlarmMessage, setAlarmMessage] = useState('');
  const [ClientIdList, setClientIdList] = useState<any>([]);
  const [TransporterIdList, setTransporterIdList] = useState<any>([]);
  const [ServiceTypeIdList, setServiceTypeIdList] = useState<any>([]);
  const [TransportTypeIdList, setTransportTypeIdList] = useState<any>([]);
  const [GoodsTypeIdList, setGoodsTypeIdList] = useState<any>([]);

  const [selectedItemId, setSelectedItemId] = useState('');
  const [detailItemFlag, handleDetailModal] = useState(false);
  const [editItemFlag, handleEditModal] = useState(false);
  const detailModalClose = () => {
    handleDetailModal(false);
    setSelectedItemId("");
  }
  const detailModalOpen = ( Id: string ) => {
    handleDetailModal(true);
    setSelectedItemId(Id);
  }
  const editModalClose = () => {
    handleEditModal(false);
    setSelectedItemId("");
  }
  const editModalOpen = ( Id: string ) => {
    handleEditModal(true);
    setSelectedItemId(Id);
  }

  const [clientNameFilter, setClientNameFilter] = useState("");
  const [positionNumberFilter, setPositionNumberFilter] = useState("");
  const [dashboardWithoutFilter, setDashboardWithoutFilter] = useState<any>([]);

  const fetchData = async () => {
    try {
      // Make a request to your API
      const response = await fetch(variables.API_URL + 'Subject');
      // Parse the JSON response
      const result: any = await response.json();
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

      // // Update the state with the fetched data
      setClientIdList(resultClient);
      setTransporterIdList(resultTransporter);
      setServiceTypeIdList(resultServiceType);
      setTransportTypeIdList(resultTransportType);
      setGoodsTypeIdList(resultGoodsType);
      // console.log(result,'result-data');
      // // Update the state with the fetched data
      setrows(result);
      setDashboardWithoutFilter(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
    // Call the fetchData function when the component mounts
    fetchData();
  },[])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const DeleteRow = async (Id: any) => {
    console.log(Id,'Id')
    if(window.confirm('Are you sure?')){
      const response = await fetch(variables.API_URL + 'Subject/' + Id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
       }
      });
      const result = await response.json();
      setAlarmMessage(result);
      setAlert(true);
    // Call the fetchData function when the component mounts
      fetchData(); 
      await setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }

  const handleOnSave = () => {
    fetchData();
  }
  const previous1 = useRef("");
  const previousInputValue = useRef("");
  const handleClientName = (e:any) => {
    setClientNameFilter(e.target.value);
    previous1.current = e.target.value;
  }
  const handlePositionNumber = (e:any) => {
    setPositionNumberFilter(e.target.value);
    previousInputValue.current = e.target.value
  }
  const FilterFn = (pageNumberFilter:any, positionNumberFilter:any,declarationFilter:any,
    CMRFilter:any,CIMFilter:any,invoiceFilter:any,plateNumberFilter:any) =>{
    setRowsPerPage(pageNumberFilter);
    var CMRNumberFilter = parseInt(CMRFilter, 10);
    const isCMRNumberFilterNaN = isNaN(CMRNumberFilter);
    var CIMNumberFilter = parseInt(CIMFilter, 10);
    const isCIMNumberFilterNaN = isNaN(CIMNumberFilter);
    var InvoiceFilter = parseInt(invoiceFilter, 10);
    const isInvoiceFilterNaN = isNaN(InvoiceFilter);

    console.log(positionNumberFilter,'positionNumberFilter');
    let filterData = dashboardWithoutFilter.filter(
      function(el:any){ console.log(el.CMRNumber,"dddddd");
        return el.PositionNumber.toString().toLowerCase().includes(
          positionNumberFilter.toString().trim().toLowerCase()
        ) && el.Declaration.toString().toLowerCase().includes(
          declarationFilter.toString().trim().toLowerCase()
        )  && el.PlateNumber.toString().toLowerCase().includes(
          plateNumberFilter.toString().trim().toLowerCase()
        ) && (isCMRNumberFilterNaN || el.CMRNumber === CMRNumberFilter)
        && (isCIMNumberFilterNaN || el.CIMNumber === CIMNumberFilter)
        && (isInvoiceFilterNaN || el.InvoiceNumber === InvoiceFilter)
      }
    );
    setrows(filterData);
  }

  return (
    <DashboardLayout onSave={handleOnSave} FilterFn={FilterFn}>
      <Typography variant="h4" component="h5" mb={3}>Предмети</Typography>
      {
        AlertMessage && (
          <AlarmPosition>
            
            <Collapse in={AlertMessage}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {AlarmMessage}
            </Alert>
          </Collapse>
             
          </AlarmPosition>
        )
      }
      <TableContainer component={Paper}>
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell color="white"  >Count</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Position Number</TableCell>
              <TableCell>Declaration</TableCell>
              <TableCell>CMR</TableCell>
              <TableCell>CIM</TableCell>
              <TableCell>Record&nbsp;Date</TableCell>
              <TableCell>Transporter Name</TableCell>
              <TableCell>PlateNumber</TableCell>
              <TableCell>Service TypeName</TableCell>
              <TableCell>Transport TypeName</TableCell>
              <TableCell>Goods TypeName</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Departure&nbsp;Date</TableCell>
              <TableCell>Arrival&nbsp;Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any, index:any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell  >
                  { index + 1 }
                </TableCell>
                <TableCell>
                  { 
                    ClientIdList.map((option:any) =>{
                      if(option.Id == row.ClientId){
                        return option.ClientName
                      }
                    })
                  }
                </TableCell>
                <TableCell>{row.PositionNumber}</TableCell>
                <TableCell>{row.Declaration}</TableCell>
                <TableCell>{row.CMRNumber}</TableCell>
                <TableCell>{row.CIMNumber}</TableCell>
                <TableCell>{row.Record.slice(0,10)}</TableCell>
                <TableCell>
                  { 
                    TransporterIdList.map((option:any) =>{
                      if(option.Id == row.TransporterId){
                        return option.TransporterName
                      }
                    })
                  }
                </TableCell>
                <TableCell>{row.PlateNumber}</TableCell>
                <TableCell>
                  { 
                    ServiceTypeIdList.map((option:any) =>{
                      if(option.Id == row.ServiceTypeId){
                        return option.ServiceTypeName
                      }
                    })
                  }
                </TableCell>
                <TableCell>
                  { 
                    TransportTypeIdList.map((option:any) =>{
                      if(option.Id == row.TransportTypeId){
                        return option.TransportTypeName
                      }
                    })
                  }
                </TableCell>
                <TableCell>
                  { 
                    GoodsTypeIdList.map((option:any) =>{
                      if(option.Id == row.GoodsTypeId){
                        return option.GoodsTypeName
                      }
                    })
                  }
                </TableCell>
                <TableCell>{row.InvoiceNumber}</TableCell>
                <TableCell>{row.Country}</TableCell>
                <TableCell>{row.City}</TableCell>
                <TableCell>{row.DepartureDate.slice(0,10)}</TableCell>
                <TableCell>{row.ArrivalDate.slice(0,10)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Fab color="primary"  size="small" aria-label="edit" onClick={()=>detailModalOpen(row.Id)}>
                      <VisibilityIcon />
                    </Fab>
                    <Fab color="primary"  size="small" aria-label="edit" onClick={()=>editModalOpen(row.Id)}>
                      <EditIcon />
                    </Fab>
                    <Fab color="primary"  size="small" aria-label="edit" onClick={()=>DeleteRow(row.Id)}>
                      <DeleteIcon />
                    </Fab>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={detailItemFlag}
        onClose={detailModalClose}
      >
        <DetailItem
          onClose={detailModalClose}
          itemId={selectedItemId}
        />
      </Modal>
      <Modal
        open={editItemFlag}
        onClose={editModalClose}
      >
        <EditItem
          onClose={editModalClose}
          itemId={selectedItemId}
          onSave={handleOnSave}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;