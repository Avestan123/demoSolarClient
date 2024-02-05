import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
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
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const PendingLeads = () => {
  const { state } = useLocation();
  console.log(state);
  const [pending, setpending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.pendingworkorders) {
      setpending([...state.pendingworkorders]);
    }
  }, [state.pendingworkorders]);

  // coloums
  const coloums = [
    {
      name: "Name",
      selector: (row) => row?.clientName,
      sortable: true,
    },

    {
      name: "Mobile",
      selector: (row) => row?.number,
      sortable: true,
    },

    {
      name: "Requirement",
      selector: (row) => row?.requirement,
      sortable: true,
    },

    {
      // name: "Pending",

      // selector: (row) => row?.pending + "/n" + " ",
      // sortable: true,
      name: "Pending",
      selector: "pending",
      sortable: true,
      cell: (row) =>
        Array.isArray(row.pending) ? row.pending.join(", \n") : row.pending,
    },

    {
      name: "Date",
      selector: (row) => row?.followUpDate,
      sortable: true,
    },
    {
      name: "Detail",
      cell: (row) => (
        <Link
          to={{
            pathname: "/pendingworkorderdetails",
          }}
          state={row} // Pass the row data as state
        >
          {/* {localStorage.setItem("client_id", row._id)} */}
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

  return pending.length <= 0 ? (
    <Flex height="100vh" justify="center" align="center" direction="column">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        margin={{ base: "3em", md: "5em" }}
        alignSelf="center"
      />
    </Flex>
  ) : (
    <Flex justify="center" direction="column" align="center" mt="1em">
      <Text fontSize="20" fontWeight="bold">
        Incomplete Client Details
      </Text>
      {console.log(pending)}
      <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
        <DataTable
          columns={coloums}
          data={pending}
          customStyles={tableHeaderStyle}
          // selectableRows
          pagination
          highlightOnHover
          responsive
          selectableRowsHighlight
          subHeader

        />
      </Box>
    </Flex>
  );
};

export default PendingLeads;
