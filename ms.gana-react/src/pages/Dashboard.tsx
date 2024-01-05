import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import { useSelector } from 'react-redux'
import { variables } from "../Variable";
import { DetailItem, EditItem } from "../molecules";
import { getTrigger } from "../app/TriggerSlice";
import { getRowPerPage } from "../app/RowPerPageSlice";


const StyledTableHead = styled(TableHead)({
  backgroundColor: "#808692",
  textAlign: 'center',
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [positionNumber, setPositionNumber] = useState<any>('');
  const [clientId, setClientId] = useState<any>('');
  const [declaration, setDeclaration] = useState<any>('');
  const [plateNumber, setPlateNumber] = useState<any>('');
  const [transporterId, setTransporterId] = useState<any>('');
  const [serviceTypeId, setServiceTypeId] = useState<any>('');
  const [transportTypeId, setTransportTypeId] = useState<any>('');
  const [goodsTypeId, setGoodsTypeId] = useState<any>('');
  const [countryId, setCountryId] = useState<any>('');
  const [cityId, setCityId] = useState<any>('');
  const [cmrNumber, setCmrNumber] = useState<any>(0);
  const [cimNumber, setCimNumber] = useState<any>(0);
  const [invoice, setInvoice] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);

  useEffect(()=>{
    setPositionNumber(queryParams.get('positionNumber')?queryParams.get('positionNumber'):'');
    setClientId(queryParams.get('clientId')?queryParams.get('clientId'):'');
    setDeclaration(queryParams.get('declaration')?queryParams.get('declaration'):'');
    setPlateNumber(queryParams.get('plateNumber')?queryParams.get('plateNumber'):'');
    setTransporterId(queryParams.get('transporterId')?queryParams.get('transporterId'):'');
    setServiceTypeId(queryParams.get('serviceTypeId')?queryParams.get('serviceTypeId'):'');
    setTransportTypeId(queryParams.get('transportTypeId')?queryParams.get('transportTypeId'):'');
    setGoodsTypeId(queryParams.get('goodsTypeId')?queryParams.get('goodsTypeId'):'');
    setCountryId(queryParams.get('countryId')?queryParams.get('countryId'):'');
    setCityId(queryParams.get('cityId')?queryParams.get('cityId'):'');
    setCmrNumber(queryParams.get('cmrNumber')?queryParams.get('cmrNumber'):0);
    setCimNumber(queryParams.get('cimNumber')?queryParams.get('cimNumber'):0);
    setInvoice(queryParams.get('invoice')?queryParams.get('invoice'):0);
    
  },[queryParams])
  useEffect(()=>{
    fetchData();
  },[positionNumber,clientId,declaration,plateNumber,transporterId,serviceTypeId,
    transportTypeId,goodsTypeId,countryId,cityId,cmrNumber,cimNumber,invoice,pageSize])

  console.log(positionNumber,'positionNumber');

  const trigger = useSelector(getTrigger);

  const [page, setPage] = useState(0);
  const countPage = useRef(0);

  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const countRowsPerPage = useRef(10);
  const TotalCount = useRef(10);

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
  const detailModalOpen = (Id: string) => {
    handleDetailModal(true);
    setSelectedItemId(Id);
  }
  const editModalClose = () => {
    handleEditModal(false);
    setSelectedItemId("");
  }
  const editModalOpen = (Id: string) => {
    handleEditModal(true);
    setSelectedItemId(Id);
  }

  // const [clientNameFilter, setClientNameFilter] = useState("");
  // const [positionNumberFilter, setPositionNumberFilter] = useState("");
  // const [dashboardWithoutFilter, setDashboardWithoutFilter] = useState<any>([]);
  // const PositionNumberFilter = useRef('');
  // const ClientId = useRef('');
  // const TransporterId = useRef('');
  // const ServiceTypeId = useRef('');
  // const TransportTypeId = useRef('');
  // const GoodsTypeId = useRef('');
  // const CountryId = useRef('');
  // const CityId = useRef('');
  // const Declaration = useRef('');
  // const PlateNumber = useRef('');
  // const CMRNumber = useRef(0);
  // const CIMNumber = useRef(0);
  // const Invoice = useRef(0);


  const fetchData = async () => {
    try {
      // const PerPage = useSelector(getRowPerPage);
      // Make a request to your API
      const response = await fetch(variables.API_URL + 'Subject?page=' + countPage.current + '&pageSize=' + countRowsPerPage.current
      + '&clientId=' + clientId + '&positionNumber=' + positionNumber
      + '&declaration=' + declaration + '&plateNumber=' + plateNumber
      + '&transporterId=' + transporterId + '&serviceTypeId=' + serviceTypeId
      + '&transportTypeId=' + transportTypeId + '&goodsTypeId=' + goodsTypeId
      + '&countryId=' + countryId + '&cityId=' + cityId
      + '&cmrNumber=' + cmrNumber + '&cimNumber=' + cimNumber
      + '&invoice=' + invoice);
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
      setRows(result.Data);    
      TotalCount.current = result.TotalCount;
      // dispatch(setTableData({ tableData: result }))
      // setDashboardWithoutFilter(result.Data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, [trigger])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    countPage.current = newPage ;
    fetchData();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    countPage.current = 0;
    countRowsPerPage.current = +event.target.value;
    fetchData();
  };
  const DeleteRow = async (Id: any) => {
    console.log(Id, 'Id')
    if (window.confirm('Are you sure?')) {
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
  // const handleClientName = (e: any) => {
  //   setClientNameFilter(e.target.value);
  //   previous1.current = e.target.value;
  // }
  // const handlePositionNumber = (e: any) => {
  //   setPositionNumberFilter(e.target.value);
  //   previousInputValue.current = e.target.value
  // }
  const FilterFn =async (pageNumberFilter: any) => {
    console.log(pageNumberFilter,'pageNumberFilter');
    countRowsPerPage.current = pageNumberFilter;
    setRowsPerPage(pageNumberFilter);
    if(page != 0){
      setPage(0);
      countPage.current = 0;
    }

    await fetchData();
    // ClientId.current = clientIdFilter;
    // PositionNumberFilter.current = positionNumberFilter;
    // Declaration.current = declarationFilter;
    // PlateNumber.current = plateNumberFilter;
    // TransporterId.current = transporterIdFilter;
    // ServiceTypeId.current = serviceTypeIdFilter;
    // TransportTypeId.current = transportTypeIdFilter;
    // GoodsTypeId.current = goodsTypeIdFilter;
    // CountryId.current = countryFilter;
    // CityId.current = cityFilter;
    // var CMRNumberFilter = parseInt(CMRFilter, 10);
    // CMRNumber.current = isNaN(CMRNumberFilter)? 0 : CMRNumberFilter ;
    // var CIMNumberFilter = parseInt(CIMFilter, 10);
    // CIMNumber.current = isNaN(CIMNumberFilter)? 0 : CIMNumberFilter ;
    // var InvoiceFilter = parseInt(invoiceFilter, 10);
    // Invoice.current = isNaN(InvoiceFilter)? 0 : InvoiceFilter ;
    
    // var CIMNumberFilter = parseInt(CIMFilter, 10);
    // const isCIMNumberFilterNaN = isNaN(CIMNumberFilter);
    // var InvoiceFilter = parseInt(invoiceFilter, 10);
    // const isInvoiceFilterNaN = isNaN(InvoiceFilter);

    // console.log(positionNumberFilter, 'positionNumberFilter');
    // let filterData = dashboardWithoutFilter.filter(
    //   function (el: any) {
    //     console.log(el.CMRNumber, "dddddd");
    //     return el.PositionNumber.toString().toLowerCase().includes(
    //       positionNumberFilter.toString().trim().toLowerCase()
    //     ) && el.Declaration.toString().toLowerCase().includes(
    //       declarationFilter.toString().trim().toLowerCase()
    //     ) && el.PlateNumber.toString().toLowerCase().includes(
    //       plateNumberFilter.toString().trim().toLowerCase()
    //     ) && (isCMRNumberFilterNaN || el.CMRNumber === CMRNumberFilter)
    //       && (isCIMNumberFilterNaN || el.CIMNumber === CIMNumberFilter)
    //       && (isInvoiceFilterNaN || el.InvoiceNumber === InvoiceFilter)
    //   }
    // );
    // setRows(filterData);
    // dispatch(setTrigger({ trigger: !trigger }))
  };

  console.log(location, 'kkkk');

  return (
    <DashboardLayout FilterFn={FilterFn} >
      <Typography variant="h4" component="h5" mb={3}>Предмети </Typography>
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
            {rows && rows.map((row: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell  >
                  {index + 1 + page*rowsPerPage}
                </TableCell>
                <TableCell> { row.ClientId } </TableCell>
                <TableCell>{row.PositionNumber}</TableCell>
                <TableCell>{row.Declaration}</TableCell>
                <TableCell>{row.CMRNumber}</TableCell>
                <TableCell>{row.CIMNumber}</TableCell>
                <TableCell>{row.Record.slice(0, 10)}</TableCell>
                <TableCell> { row.TransporterId }</TableCell>
                <TableCell>{row.PlateNumber}</TableCell>
                <TableCell> { row.ServiceTypeId }</TableCell>
                <TableCell> { row.TransportTypeId }</TableCell>
                <TableCell> { row.GoodsTypeId }</TableCell>
                <TableCell>{row.InvoiceNumber}</TableCell>
                <TableCell>{row.Country}</TableCell>
                <TableCell>{row.City}</TableCell>
                <TableCell>{row.DepartureDate.slice(0, 10)}</TableCell>
                <TableCell>{row.ArrivalDate.slice(0, 10)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Fab color="primary" size="small" aria-label="edit" onClick={() => detailModalOpen(row.Id)}>
                      <VisibilityIcon />
                    </Fab>
                    <Fab color="primary" size="small" aria-label="edit" onClick={() => editModalOpen(row.Id)}>
                      <EditIcon />
                    </Fab>
                    <Fab color="primary" size="small" aria-label="edit" onClick={() => DeleteRow(row.Id)}>
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
        count={TotalCount.current}
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