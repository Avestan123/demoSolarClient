import React from "react";
import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useContext } from "react";
import EmployeeContext from "../../context/EmployeeContext";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
const HighValueleadsTable = () => {
  const highvaluedata = useContext(EmployeeContext);
  console.log("High value", highvaluedata);

  const coloum = [
    {
      name: "Name",
      selector: (row) => row?.lead?.clientName,
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row?.lead?.number,
      sortable: true,
    },
    {
      name: "requirement",
      selector: (row) => row?.lead?.requirement,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row?.lead?.followUpDate,
      sortable: true,
    },
    {
      name: "Remark",
      selector: (row) => row?.lead?.remarks,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row?.createByName,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <Link
          to={{
            pathname: `${row?.lead?._id}`,
          }}
          state={row?.lead} // Pass the row data as state
        >
          <Button colorScheme="teal" size="md">
            Details
          </Button>
        </Link>
      ),
    },
  ];
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
  };
  return (
    <Center>
      <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
        {console.log(
          "Data in highvalue lead table",
          highvaluedata?.highvalueleads?.highValueLeads
        )}
        <Center mb={1}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            High Value Leads
          </Text>
        </Center>
        <DataTable
          columns={coloum}
          data={highvaluedata?.highvalueleads?.highValueLeads}
          customStyles={tableHeaderStyle}
          // selectableRows
          pagination
          highlightOnHover
          responsive
          selectableRowsHighlight
          subHeader
        />
      </Box>
    </Center>
  );
};

export default HighValueleadsTable;
