import React, { useState } from "react";
import { Drawer, useMediaQuery } from "@mui/material";
import {
  Box,
  Stack,
  Modal
} from "@mui/material";
import { DashboardHeaderLaptop, DashboardSidebar, NewItem, Connect } from "../molecules";
import { ToggleButton } from "../atoms";
import { styled } from "@mui/material/styles";

const BodyLayout = styled(Stack)(({ theme }) => ({
  width: "100%",
  flex: 1,
  flexDirection: "row"
}));

const ContentLayout = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "calc(100vh - 72px)",
  overflow: "auto"
}));

const DashboardLayout = ({
  children
} : {
  children: React.ReactNode
}) => {
  const [show, setShow] = useState(false);
  const [newItemFlag, handleItemModal] = React.useState(false);
  const [connectFlag, handleConnectModal] = React.useState(false);

  const isMdSize = useMediaQuery("(max-width: 899px)", { noSsr: true })

  const toggle = () => setShow(!show);
  const close = () => setShow(false);

  const itemModalOpen = () => handleItemModal(true);
  const itemModalClose = () => handleItemModal(false);

  const connectModalOpen = () => handleConnectModal(true);
  const connectModalClose = () => handleConnectModal(false);

  return (
    <Stack height={"100vh"}>
      <DashboardHeaderLaptop
        itemModalOpen={itemModalOpen}
        connectModalOpen={connectModalOpen}
      />
      <BodyLayout>
        <ToggleButton toggle={toggle} />
        <DashboardSidebar hidden={true} />
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
            <DashboardSidebar />
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