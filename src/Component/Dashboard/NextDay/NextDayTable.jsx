import React, { useState, useEffect, useContext } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  SimpleGrid,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import EmployeeContext from "../../context/EmployeeContext";
import { useToast } from "@chakra-ui/react";

function NextDayTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [Assignto, setAssignto] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();
  const [customerId, setCustomerId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const Toast = useToast();

  const employeedata = useContext(EmployeeContext);
  const Employees = employeedata?.employeeData?.employees;
  const useRole = localStorage.getItem("userRole");

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("userName");

  const handleAssignClick = (row) => {
    setSelectedEmployeeId(row?.lead?._id);
    setIsOpen(true);
  };

  const handleEmployeeSelection = async (employeeId) => {
    try {
      const response = await fetch(
        `${apiUrl}/generalUtility/assignLead/${employeeId}/${selectedEmployeeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Toast({
          title: "Assigned Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else if (response.status === 409) {
        Toast({
          title: "Already Assigned to Selected Employee",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error assigning lead:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);

    const getUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/sales/get_all_customers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resdata = await response.json();

        if (resdata) {
          setData(resdata?.nextDaysFollowUps);
          setFilter(resdata?.nextDaysFollowUps);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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

  const pageCount = Math?.ceil(filter?.length / itemsPerPage);

  const paginatedData = filter?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Center>
      <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
        <Center mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Next Day Follow Ups
          </Text>
        </Center>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mb={4}
        />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Mobile</Th>
              <Th>Requirements</Th>
              <Th>Date</Th>
              {userRole === "Admin" || userRole === "Sales Manager" ? (
                <Th>Added By</Th>
              ) : null}
              <Th>Assign To</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((row, index) => (
              <Tr key={index}>
                <Td>{row?.lead?.clientName}</Td>
                <Td>{row?.lead?.number}</Td>
                <Td>{row?.lead?.requirement}</Td>
                <Td>{row?.lead?.followUpDate}</Td>
                {userRole === "Admin" || userRole === "Sales Manager" ? (
                  <Td>{row?.createByName}</Td>
                ) : null}
                <Td>
                  <Menu>
                    <MenuButton
                      as={Button}
                      colorScheme="teal"
                      size="sm"
                      marginRight="2"
                      onClick={() => handleAssignClick(row)}
                    >
                      Assign
                    </MenuButton>
                    <Popover
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      placement="bottom-start"
                    >
                      {/* <PopoverContent> */}
                      {/* <PopoverBody> */}
                      {console.log("Employees", Employees)}
                      <MenuList>
                        {Employees &&
                          Employees?.filter(
                            (employee) => employee?.name !== username
                          ).map((employee) => (
                            <MenuItem
                              key={employee?._id}
                              onClick={() =>
                                handleEmployeeSelection(employee?._id)
                              }
                            >
                              {console.log(
                                "Inside the map",
                                employee,
                                employee?.name,
                                employee?.surName
                              )}
                              {employee?.name + " " + employee?.surName}
                            </MenuItem>
                          ))}
                      </MenuList>
                      {/* </PopoverBody> */}
                      {/* </PopoverContent> */}
                    </Popover>
                  </Menu>
                </Td>
                <Td>
                  <Link
                    to={{
                      pathname: `/nextday/${row?.lead?._id}`,
                    }}
                    state={row} // Pass the row data as state
                  >
                    <Button colorScheme="teal" size="sm">
                      View
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Center mt={4}>
          <SimpleGrid columns={2} spacing={4}>
            <ButtonGroup>
              <Button
                leftIcon={<ChevronLeftIcon />}
                isDisabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </Button>
              <Button
                rightIcon={<ChevronRightIcon />}
                isDisabled={currentPage === pageCount - 1}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </ButtonGroup>
            <Text>
              Page {currentPage + 1} of {pageCount}
            </Text>
          </SimpleGrid>
        </Center>
      </Box>
    </Center>
  );
}

export default NextDayTable;
