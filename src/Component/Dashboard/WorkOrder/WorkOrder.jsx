import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
  Flex,
  Box,
  Spacer,
  Button,
} from "@chakra-ui/react";
import ClientInformation from "./ClientInformation.jsx";
import Documents from "./Documents.jsx";
import PlantDetails from "./PlantDetails.jsx";
import LiasoningDetails from "./LiasoningDetails.jsx";
import Commercial from "./Commercial.jsx";
import Payment from "./Payment.jsx";
import {
  useLocation,
  useNavigate,
  useMatch,
  Route,
  Routes,
} from "react-router-dom";

const WorkOrder = () => {
  const location = useLocation();
  const useData = location.state;
  console.log("useData", useData);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // const match = useRouteMatch();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const totalTabs = 6;
  const handleTabChange = (index) => {
    console.log("Index", index);
    setActiveTab(index);
  };
  const handleNextButtonClick = (index) => {
    // Move to the next tab
    handleTabChange(index);
    // setActiveTab((prevTab) => prevTab + 1);
    console.log("Active Tab", activeTab);
  };

  return (
    <div>
      <Tabs index={activeTab} isLazy>
        <TabList>
          <Tab>CLIENT INFORMATION</Tab>
          <Tab>DOCUMENTS</Tab>
          <Tab>PLANT DETAILS</Tab>
          <Tab>LIASONING DETAILS</Tab>
          <Tab>COMMERCIAL</Tab>
          <Tab>PAYMENT</Tab>
        </TabList>

        <TabPanels>
          <TabPanel tabIndex={activeTab}>
            <ClientInformation />
            {console.log("Line 114 ")}
          </TabPanel>

          <TabPanel tabIndex={activeTab}>
            <Documents />
          </TabPanel>

          <TabPanel tabIndex={activeTab}>
            <PlantDetails />
          </TabPanel>
          <TabPanel tabIndex={activeTab}>
            <LiasoningDetails />
          </TabPanel>
          <TabPanel tabIndex={activeTab}>
            <Commercial />
          </TabPanel>
          <TabPanel tabIndex={activeTab}>
            <Payment />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex>
        <Box p="4" bg={activeTab <= 0}>
          {activeTab > 0 && (
            <Button
              colorScheme="teal"
              onClick={() => handleTabChange(activeTab - 1)}
            >
              Previous
            </Button>
          )}
        </Box>
        <Spacer />
        <Box p="4" bg={activeTab < totalTabs}>
          {activeTab < totalTabs - 1 && (
            <Button
              colorScheme="teal"
              onClick={() => handleNextButtonClick(activeTab + 1)}
            >
              Next
            </Button>
          )}
        </Box>
      </Flex>
      {/* {activeTab < totalTabs - 1 && (
        <Button
          colorScheme="green"
          onClick={() => handleNextButtonClick(activeTab + 1)}
        >
          Next
        </Button>
      )} */}
    </div>
  );
};

export default WorkOrder;
