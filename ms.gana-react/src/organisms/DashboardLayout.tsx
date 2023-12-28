import React, { useState } from "react";
import { Drawer, useMediaQuery } from "@mui/material";
import {
  Box,
  Stack,
  Modal
} from "@mui/material";
import { DashboardHeaderLaptop, DashboardSidebar, NewItem, Connect } from "../molecules";
import { styled } from "@mui/material/styles";
import { ToggleButton } from "../atoms";

const BodyLayout = styled(Stack)(({  }) => ({
  width: "100%",
  flex: 1,
  flexDirection: "row"
}));

const ContentLayout = styled(Box)(({  }) => ({
  width: "100%",
  maxHeight: "calc(100vh - 72px)",
  overflow: "auto"
}));

const DashboardLayout = ({
  children,
  onSave,
  FilterFn
} : {
  children: React.ReactNode,
  onSave?: () => void,
  FilterFn?:(pageNumberFilter:any, positionNumberFilter:any,declarationFilter:any,
    CMRFilter:any,CIMFilter:any,invoiceFilter:any,plateNumberFilter:any) => void,
}) => {
  
  const [show, setShow] = useState(false);
  const [newItemFlag, handleItemModal] = React.useState(false);
  const [connectFlag, handleConnectModal] = React.useState(false);

  const isMdSize = useMediaQuery("(max-width: 899px)", { noSsr: true })

  const toggle = () => setShow(!show);
  const close = () => setShow(false);

  const itemModalOpen = () => handleItemModal(true);
  const itemModalClose = () => {
    handleItemModal(false);
    onSave && onSave();
  }

  const connectModalOpen = () => handleConnectModal(true);
  const connectModalClose = () => handleConnectModal(false);

  const [pageNumberFilter, setpageNumberFilter] = useState(10);
  const [positionNumberFilter, setPositionNumberFilter] = useState("");
  const [declarationFilter, setDeclarationFilter] = useState("");
  const [CMRFilter, setCMRFilter] = useState<number | ''>('');
  const [CIMFilter, setCIMFilter] = useState<number | ''>('');
  const [invoiceFilter, setInvoiceFilter] = useState<number | ''>('');
  const [plateNumberFilter, setPlateNumberFilter] = useState("");
 
  
  const onFilter = (pageNumberFilter:any, positionNumberFilter:any,declarationFilter:any,
    CMRFilter:any,CIMFilter:any,invoiceFilter:any,plateNumberFilter:any) => {
      setpageNumberFilter(pageNumberFilter.current);
      setPositionNumberFilter(positionNumberFilter.current);
      setDeclarationFilter(declarationFilter.current);
      setCMRFilter(CMRFilter.current);
      setCIMFilter(CIMFilter.current);
      setInvoiceFilter(invoiceFilter.current);
      setPlateNumberFilter(plateNumberFilter.current);
      FilterFn && FilterFn(pageNumberFilter.current, positionNumberFilter.current,declarationFilter.current,
        CMRFilter.current, CIMFilter.current, invoiceFilter.current, plateNumberFilter.current);
  }
  return (
    <Stack height={"100vh"}>
      <DashboardHeaderLaptop
        itemModalOpen={itemModalOpen}
        connectModalOpen={connectModalOpen}
      />
      <BodyLayout>
        <ToggleButton toggle={toggle} />
        <DashboardSidebar hidden={true} onFilter={onFilter}  />
        <React.Fragment>
          <Drawer
            anchor="left"
            open={show && isMdSize}
            onClose={close}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "transparent !important"
              }
            }}
            
          >
            <DashboardSidebar hidden={false} onFilter={onFilter}  />
          </Drawer>
        </React.Fragment>
        <ContentLayout>
          <Box m={{ md: 3, xs: 2 }}>
            {children}
          </Box>
        </ContentLayout>
      </BodyLayout>
      <Modal
        open={newItemFlag}
        onClose={itemModalClose}
      >
        <NewItem
          onClose={itemModalClose}
        />
      </Modal>
      <Modal
        open={connectFlag}
        onClose={connectModalClose}
      >
        <Connect
          onClose={connectModalClose}
        />
      </Modal>
    </Stack>
  );
}

export default DashboardLayout; 