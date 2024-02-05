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
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

function WorkOrderTable() {
  const [userRole, setUserRole] = useState("");
  const [data, setData] = useState([]);
  const [search, SetSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState("false");
  const [workorderdetails, setworkorderdetails] = useState();
  const columns = [
    {
      name: "Name",
      selector: (row) => row.clientName,
      sortable: true,
    },

    {
      name: "Mobile",
      selector: (row) => row.number,
      sortable: true,
    },


    {
      name: "Details",
      cell: (row) => (
        <Link
          to={{
            pathname: "workorderView",
          }}
          state={row}
        >
          {localStorage.setItem("workorderid ", row._id)}
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

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    setUserRole(storedUserRole);
    const token = localStorage.getItem("token");
    const getAllOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/sales/get_all_customers`, {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resdata = await response.json();

        console.log("resdata", resdata);
        if (resdata) {
          setLoading(false);
          setData(resdata?.activeWorkOrders);
          setFilter(resdata?.activeWorkOrders);
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getAllOrders();
  }, [setData, setFilter]);

  return loading ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  ) : (
    <Center>
      <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
        <Center mb={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Active Work Orders
          </Text>
        </Center>

        <DataTable
          columns={columns}
          data={filter}
          customStyles={tableHeaderStyle}
          // selectableRows
          pagination
          highlightOnHover
          responsive
          selectableRowsHighlight
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "15px",
                padding: "10px",
                paddingLeft: "15px",
                width: "100%",
              }}
            />
          }
        />
      </Box>
    </Center>
  );
}

export default WorkOrderTable;
