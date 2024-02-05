import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Center,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
// import EmployeeContext from "../../context/EmployeeContext";
// import { useContext } from "react";

function NewEmployee() {
  const [employees, setEmployees] = useState();
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  // const empolyeeData = useContext(EmployeeContext);
  const role = localStorage.getItem("userRole");
  console.log("From New Employee role", role);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/getAllEmployees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        });
        const data = await response.json();
        console.log("Data from NewEmployee", data);
        if (data) {
          setEmployees(data.employees);
        }
      } catch (error) {
        alert(error);
      }
    };
    getEmployees();
  }, []);

  return (
    <Box>
      <Center>
        <Flex direction="column" align="center" mt="2rem">
          <Flex mt="2rem" justify="center">
            <EmployeeTable employees={employees} />
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
}

export default NewEmployee;
