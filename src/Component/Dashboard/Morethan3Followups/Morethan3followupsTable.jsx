import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Center, Button } from "@chakra-ui/react";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Morethan3followupsTable = () => {
  const { state } = useLocation();

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
      name: "Details",
      cell: (row) => (
        <Link
          to={{
            pathname: `${row?.lead?._id}`,
          }}
          state={row} // Pass the row data as state
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
  console.log(state, "In more than 3 foloow up ");

  return (
    <Center>
      <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
        <DataTable
          columns={coloum}
          data={state.morethan}
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

export default Morethan3followupsTable;
