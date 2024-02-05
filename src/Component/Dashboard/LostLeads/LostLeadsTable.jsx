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

function LostLeadsTable() {
  const [data, setData] = useState([]);
  const [search, SetSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState("false");
  const [userRole, setUserRole] = useState("");

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
  const handleDelete = () => {};
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.lead?.clientName,
      sortable: true,
    },

    {
      name: "Mobile",
      selector: (row) => row?.lead?.number,
      sortable: true,
    },

    {
      name: "Requirements",
      selector: (row) => row?.lead?.requirement,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => row?.lead?.followUpDate,

      sortable: true,
    },
    ...(userRole === "Admin" || userRole === "Sales Manager"
      ? [
          {
            name: "Added By",
            selector: (row) => row?.createByName,
            sortable: true,
          },
        ]
      : []),

    {
      name: "Reason",
      // "Needs to update for reason as we cahnge in the form "
      selector: (row) => row?.lead?.reason,
      sortable: true,
      cell: (row) => (
        <Text as="span" color="gray.600" fontSize="sm" fontWeight="medium">
          {row?.lead?.reason}
        </Text>
      ),
    },
  ];

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);
    const token = localStorage.getItem("token");
    const getUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/sales/get_all_customers`, {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resdata = await response.json();
        console.log("LostLead Table Resdata", resdata?.lostLeads);
        if (resdata) {
          setLoading(false);
          setData(resdata?.lostLeads);
          setFilter(resdata?.lostLeads);
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const result = data.filter(
      (item) =>
        item?.lead?.requirement
          ?.toLowerCase()
          .includes(search?.toLowerCase()) ||
        (userRole !== "Sales" &&
          item?.createByName?.toLowerCase().includes(search?.toLowerCase()))
    );
    setFilter(result);
  }, [search, data, userRole]);

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
  };

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
          <Text fontSize="2xl" fontWeight="bold">
            Lost Leads
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

export default LostLeadsTable;
