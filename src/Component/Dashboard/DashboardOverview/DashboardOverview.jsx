import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Img,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useUser } from "../../context/UserContext";
import TodaysLeads from "./TodaysLeads";
import { Link } from "react-router-dom";
import TotalCumstmer from "../../../../public/totalCust.svg";
import TodaysFollowup from "../../../../public/todays.svg";
import AssignedLeads from "../../../../public/assigned.svg";
import Missed from "../../../../public/missed.svg";
import Transfer from "../../../../public/transfer.svg";
import nextDay from "../../../../public/nextDay.svg";
import filter from "../../../../public/filter.svg";
import upcomingImage from "../../../../public/upcoming.svg";
import lostLeadsIcon from "../../../../public/lostLeads.svg";
import EmployeeContext from "../../context/EmployeeContext";
import { useContext } from "react";
// import { set } from "mongoose";

const DashboardOverview = () => {
  const [users, setUsers] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [transfered, setTransfered] = useState([]);
  const [leads, setLeads] = useState([]);
  const { userData } = useUser();
  const [loading, setLoading] = useState("false");
  const [upcoming, setUpcoming] = useState([]);
  const [missed, setMissed] = useState([]);
  const [todaysFollowups, setTodaysFollowups] = useState([]);
  const [nextDaysleads, setNextDaysleads] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [lostLeads, setLostLeads] = useState([]);
  const [pendingworkorders, setPendingworkorders] = useState();
  const [EmployyeeCount, setEmployeeCount] = useState();
  const [morethan, setMorethan] = useState();

  const [highvalueleadslength, setHighValueleadslength] = useState();

  const [myleadslength, setMyleadlength] = useState();

  const [highvalueleads, setHighvalueleads] = useState([]);
  console.log("leads", leads);
  console.log("users", users);
  const employeecontet = useContext(EmployeeContext);
  // console.log("employeescount", employeescount?.employeeData?.employees.length);
  console.log("From Dashboard OverView");
  console.log(employeecontet?.employeeLength?.employees, "afadf");
  const EmployeeCount = employeecontet?.employeeLength?.employees?.length;

  const isSales = userData?.userRole === "Sales";
  const isManager = userData?.userRole === "Sales Manager";
  const role = localStorage.getItem("userRole");
  console.log("Role form Dashboar OverView", role);

  const counthighvalueLead =
    employeecontet?.highvalueleads?.highValueLeads?.length;
  console.log(
    "HighvalueLeads",
    employeecontet?.highvalueleads?.highValueLeads?.length
  );

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  //   const token = localStorage.getItem("token");

  //   const getTodaysLeads = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/sales/get_todays_leads`, {
  //         method: "GET",
  //         "Content-Type": "application/json",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await response.json();
  //       console.log("data", data?.todaysLeads?.length);

  //       if (data) {
  //         setLeads(data.todaysLeads?.length);
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };

  //   // Check if the user role is "Admin" or "Sales" before calling getTodaysLeads
  //   if (userData?.userRole === "Admin" || userData?.userRole === "Sales") {
  //     getTodaysLeads();
  //   }
  // }, [userData?.userRole]);

  useEffect(() => {
    setLoading(true);
    // const storedUserRole = localStorage.getItem("userRole");
    // setUserRole(storedUserRole);
    const token = localStorage.getItem("token");
    const getUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/sales/getMyLeads`, {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resdata = await response.json();
        console.log(" NewLeads Table resdata", resdata);
        if (resdata) {
          setMyleadlength(resdata?.leads?.length);
          setLoading(false);
          // setData(resdata?.leads);
          // console.log("my Leads", resdata.leads);
          // setFilter(resdata?.leads);
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getUsers();
  }, []);

  // More than 3 Follow Ups
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const gethighvalueleads = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/sales/getMoreThan3FollowUpsLeads`,
          {
            method: "GET",
            "Content-Type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responsedata = await response.json();
        console.log(responsedata);
        console.log(responsedata.leads, "Line 112");
        if (responsedata) {
          setMorethan(responsedata.leads);
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    gethighvalueleads();
  }, []);

  // Fetching data fro high value leads
  const getHighValueLeads = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/sales/getHighValueLeads`, {
        method: "GET",
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setHighValueleadslength(data?.highValueLeads?.length);
    } catch (error) {
      alert(error);
    }
  };
  // getHighValueLeads();
  useEffect(() => {
    getHighValueLeads();
  }, []);

  // for high VAlue Leads
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        // console.log("Data from NewEmployee", data);

        setEmployeeCount(data.employees?.length);
      } catch (error) {
        alert(error);
      }
    };
    getEmployees();
  }, []);

  // Pending Leads data
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const getpendingworkorders = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/workOrder/getPendingWorkOrders`,
          {
            method: "GET",
            "Content-Type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("pending workorders", data);
        if (data) {
          setLoading(false);
          setPendingworkorders(data.customers);
        }
      } catch (error) {
        alert(error);
      }
    };
    getpendingworkorders();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/sales/get_all_customers`, {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLoading(false);
        console.log("all data", data);
        if (data) {
          setLoading(false);
          setUsers(data.customers);
          setLeads(data.totalLeads);
          setAssigned(data.assignedLeads);
          setTransfered(data.transferredLeads);
          setMissed(data.missedFollowUps);
          setTodaysFollowups(data.todaysFollowUps);
          setNextDaysleads(data.nextDaysFollowUps);
          setWorkOrders(data.activeWorkOrders);
          setUpcoming(data.upcomingFollowUps);
          setLostLeads(data.lostLeads);
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getUsers();
  }, []);

  const dyanmicdata = [
    {
      role: "Admin",
      data: [
        {
          cardname: "Add Employees",
          value: EmployyeeCount,
          logo: "",
          path: "/newEmpoyee/addEmployee",
        },
        {
          cardname: "Total Employees",
          value: "",
          logo: TotalCumstmer,
          path: "/newEmpoyee/addEmployee",
        },
      ],
    },
    {
      role: "Sales Executive",
      data: [
        {
          cardname: "My Leads",
          value: myleadslength,
          logo: "",
          path: "/sales/myLeads",
        },
        {
          cardname: "Leads",
          value: leads?.length,
          logo: "",
          path: "/newleads",
        },
        {
          cardname: "Todays Follow Ups",
          value: todaysFollowups,
          logo: TodaysFollowup,
          path: "/followups",
        },
        {
          cardname: "Next Days Follow Ups",
          value: nextDaysleads,
          logo: nextDay,
          path: "/nextday",
        },
        {
          cardname: "Upcoming Followups",
          value: upcoming,
          logo: upcomingImage,
          path: "/upcoming",
        },

        {
          cardname: "Missed Followups",
          value: missed,
          logo: Missed,
          path: "/missed",
        },
        {
          cardname: "Assigned Leads",
          value: assigned,
          logo: AssignedLeads,
          path: "/assigned",
        },
        {
          cardname: "Transfered Leads",
          value: transfered,
          logo: Transfer,
          path: "/transferleads",
        },
        {
          cardname: "Lost Leads",
          value: lostLeads,
          logo: lostLeadsIcon,
          path: "/lostleads",
        },

        {
          cardname: "Active Work Orders",
          value: workOrders,
          logo: filter,
          path: "/workorder",
        },
        {
          cardname: "Total High Value Leads",
          value: highvalueleads,
          logo: filter,
          path: "/highvalueleads",
        },
        {
          cardname: "Payment Details",
          value: "",
          logo: "",
          path: "/paymentdetails",
        },
        {
          cardname: "Leave Applications",
          value: "",
          logo: "",
          path: "/leaveapplications",
        },
        {
          cardname: "Target",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "Allowance",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "Incomplete Client Details",
          value: "",
          logo: "",
          path: "",
        },
      ],
    },
    {
      role: "Sales Manager",
      data: [
        {
          cardname: "My Leads",
          value: myleadslength,
          logo: "",
          path: "/sales/myLeads",
        },
        {
          cardname: "Total Leads",
          value: leads?.length,
          logo: "",
          path: "/newleads",
        },
        {
          cardname: "Total Follow Ups",
          value: todaysFollowups,
          logo: TodaysFollowup,

          path: "/followups",
        },
        {
          cardname: "Todays Follow Ups",
          value: todaysFollowups,
          logo: TodaysFollowup,
          path: "/followups",
        },
        {
          cardname: "Next Days Follow Ups",
          value: nextDaysleads,
          logo: nextDay,
          path: "/nextday",
        },
        {
          cardname: "Upcoming Followups",
          value: upcoming,
          logo: upcomingImage,
          path: "/upcoming",
        },

        {
          cardname: "Missed Followups",
          value: missed,
          logo: Missed,
          path: "/missed",
        },
        {
          cardname: "Assigned Leads",
          value: assigned,
          logo: AssignedLeads,
          path: "/assigned",
        },
        {
          cardname: "Transfered Leads",
          value: transfered,
          logo: Transfer,
          path: "/transferleads",
        },
        {
          cardname: "Lost Leads",
          value: lostLeads,
          logo: lostLeadsIcon,
          path: "/lostleads",
        },

        {
          cardname: "Active Work Orders",
          value: workOrders,
          logo: filter,
          path: "/workorder",
        },
        {
          cardname: "Total High Value Leads",
          value: highvalueleads,
          logo: filter,
          path: "/highvalueleads",
        },
        {
          cardname: "Payment Details",
          value: "",
          logo: "",
          path: "/paymentdetails",
        },
        {
          cardname: "Total Leave Applications",
          value: "",
          logo: "",
          path: "/leaveapplications",
        },
        {
          cardname: "Target",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "Allowance",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "Incomplete Client Details",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "More than 3 Follow Ups",
          value: morethan,
          logo: "",
          path: "/morethan3followups",
        },
        {
          cardname: "Target",
          value: "",
          logo: "",

          path: "",
        },
      ],
    },
    {
      role: "General Sales Manager",
      data: [
        {
          cardname: "My Leads",
          value: myleadslength,
          logo: "",
          path: "/sales/myLeads",
        },
        {
          cardname: "Total Leads",
          value: leads?.length,
          logo: "",
          path: "/newleads",
        },
        {
          cardname: "Total Follow Ups",
          value: todaysFollowups,
          logo: TodaysFollowup,

          path: "/followups",
        },
        {
          cardname: "Todays Follow Ups",
          value: todaysFollowups,
          logo: TodaysFollowup,
          path: "/followups",
        },
        {
          cardname: "Next Days Follow Ups",
          value: nextDaysleads,
          logo: nextDay,
          path: "/nextday",
        },
        {
          cardname: "Upcoming Followups",
          value: upcoming,
          logo: upcomingImage,
          path: "/upcoming",
        },

        {
          cardname: "Missed Followups",
          value: missed,
          logo: Missed,
          path: "/missed",
        },
        {
          cardname: "Assigned Leads",
          value: assigned,
          logo: AssignedLeads,
          path: "/assigned",
        },
        {
          cardname: "Transfered Leads",
          value: transfered,
          logo: Transfer,
          path: "/transferleads",
        },
        {
          cardname: "Lost Leads",
          value: lostLeads,
          logo: lostLeadsIcon,
          path: "/lostleads",
        },

        {
          cardname: "Active Work Orders",
          value: workOrders,
          logo: filter,
          path: "/workorder",
        },
        {
          cardname: "Total High Value Leads",
          value: highvalueleads,
          logo: filter,
          path: "/highvalueleads",
        },
        {
          cardname: "Payment Details",
          value: "",
          logo: "",
          path: "/paymentdetails",
        },
        {
          cardname: "Total Leave Applications",
          value: "",
          logo: "",
          path: "/leaveapplications",
        },
        {
          cardname: "Target",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "Allowance",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "Incomplete Client Details",
          value: "",
          logo: "",
          path: "",
        },
        {
          cardname: "More than 3 Follow Ups",
          value: morethan,
          logo: "",
          path: "/morethan3followups",
        },
        {
          cardname: "Target",
          value: "",
          logo: "",

          path: "",
        },
      ],
    },
  ];

  return loading ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      marginTop="10%"
      marginLeft="50%"
      marginRight="50%"
    />
  ) : (
    <>
      {role === "Admin" ? (
        <Flex direction={{ base: "column", md: "row" }} gap="25px">
          {/* Total Customers and Total Leads*/}

          <Flex
            direction={{ md: "column" }}
            gap="25px"
            justifyContent="center"
            marginTop="30px"
            align="center"
          >
            {/* Chnage Link */}
            <Link
              to={{
                pathname: "/newEmpoyee/addEmployee",
                state: { users },
              }}
            >
              <Card
                as="flex"
                width="auto"
                textAlign="center"
                // width={{ base: "100%", md: "200px" }}
                height={{ base: "100%", md: "150px" }}
                minW="150px"
                maxH="150px"
                background="#FFFFFF"
                borderLeft="4px solid #FF0000"
                borderRadius="12px"
                boxShadow="md" // Add a shadow for a card-like appearance
                p="2" // Adjust padding as needed
                display="flex"
                // flexDirection={{ base: "column", md: "column", lg: "column" }}
                direction={{ base: "column", md: "row", lg: "row" }}
                justifyContent={{ base: "center", md: "space-around" }}
                alignItems="center"
                gap="20px"
              >
                {/* <div style={{ flex: 1 }}> */}
                <img src={TotalCumstmer} alt="Total Customers" />
                <Text
                  fontSize={{ base: "0.7rem", md: "1.2rem" }}
                  fontWeight="bold"
                >
                  Add Employees
                </Text>
                {/* <Heading size="lg" color="black" textAlign="center">
                  {EmployeeCount}
                </Heading> */}
                {/* {users && (
                  <Heading size="lg" color="black" textAlign="center">
                    {users.length}
                    {console.log("users length", users.length)}
                  </Heading> */}

                {/* </div> */}
              </Card>
            </Link>
          </Flex>
          <Flex
            direction={{ md: "column" }}
            gap="25px"
            justifyContent="center"
            marginTop="30px"
            align="center"
          >
            <Link
              to={{
                pathname: "/newEmpoyee",
                state: { users },
              }}
            >
              <Card
                as="flex"
                width="auto"
                textAlign="center"
                // width={{ base: "100%", md: "200px" }}
                height={{ base: "100%", md: "150px" }}
                minW="150px"
                maxH="150px"
                background="#FFFFFF"
                borderLeft="4px solid #FF0000"
                borderRadius="12px"
                boxShadow="md" // Add a shadow for a card-like appearance
                p="2" // Adjust padding as needed
                display="flex"
                // flexDirection={{ base: "column", md: "column", lg: "column" }}
                direction={{ base: "column", md: "row", lg: "row" }}
                justifyContent={{ base: "center", md: "space-around" }}
                alignItems="center"
                gap="20px"
              >
                {/* <div style={{ flex: 1 }}> */}
                <img src={TotalCumstmer} alt="Total Customers" />
                <Text
                  fontSize={{ base: "0.7rem", md: "1.2rem" }}
                  fontWeight="bold"
                >
                  Total Employees
                </Text>
                <Heading size="lg" color="black" textAlign="center">
                  {EmployyeeCount}
                </Heading>
                {/* {users && (
                  <Heading size="lg" color="black" textAlign="center">
                    {users.length}
                    {console.log("users length", users.length)}
                  </Heading> */}

                {/* </div> */}
              </Card>
            </Link>
          </Flex>
        </Flex>
      ) : (
        ""
      )}

      {role === "Sales Executive" ||
      role === "Sales Manager" ||
      role === "General Sales Manager" ? (
        <>
          <Box display="flex" justifyContent="flex-end" mx="5">
            <Link to="/newleads/form">
              <Button colorScheme="orange"> + Add Leads</Button>
            </Link>
          </Box>
          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            {/* Total Customers and Total Leads*/}
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "15px", md: "25px" }}
              justifyContent="center"
              marginTop={{ base: "20px", md: "30px" }}
              align="center"
              flexWrap="wrap" // Allow cards to wrap to the next line on small screens
            >
              {(role === "Sales Manager" ||
                role === "General Sales Manager") && (
                <Link to="/getMyleads" state={{ morethan }}>
                  <Card
                    as="flex"
                    width={{ base: "100%", md: "200px" }}
                    height={{ base: "100%", md: "150px" }}
                    minW="150px"
                    maxH="150px"
                    background="#FFFFFF"
                    borderLeft="4px solid #FF0000"
                    borderRadius="12px"
                    boxShadow="md" // Add a shadow for a card-like appearance
                    p="4" // Adjust padding as needed
                    display="flex"
                    direction={{ base: "column", md: "row", lg: "row" }}
                    justifyContent={{ base: "center", md: "space-around" }}
                    alignItems="center"
                    gap="20px"
                    marginBottom={{ base: "20px", md: "0" }}
                  >
                    {/* <img src={lostLeadsIcon} alt="Transfered Leads" /> */}
                    <Text
                      fontSize={{ base: "0.7rem", md: "1.2rem" }}
                      fontWeight="bold"
                    >
                      My Leads
                    </Text>
                    {lostLeads && (
                      <Heading size="lg" color="black">
                        {myleadslength}
                      </Heading>
                    )}
                  </Card>
                </Link>
              )}
            </Flex>

            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/newleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={filter} alt="Total FollowUp" />
                  {/* <div style={{ flex: 1 }}> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    {isManager ? <span>Total Leads </span> : <span>Leads</span>}
                  </Text>
                  {leads && (
                    <Heading size="lg" color="black">
                      {leads?.length}
                    </Heading>
                  )}
                  {/* </div> */}
                </Card>
              </Link>
            </Flex>
            {/* Today and Next day followups*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/todayleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={TodaysFollowup} alt="Total FollowUp" />
                  {/* <div style={{ flex: 1 }}> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Todays Follow Ups
                  </Text>
                  {todaysFollowups && (
                    <Heading size="lg" color="black">
                      {todaysFollowups?.length}
                    </Heading>
                  )}
                  {/* </div> */}
                </Card>
              </Link>
              <Link to="/nextday">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  {/* <div style={{ flex: 1 }}> */}
                  <img src={nextDay} alt="Total Customers" />
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Next Days Followups
                  </Text>
                  {nextDaysleads && (
                    <Heading size="lg" color="black" textAlign="center">
                      {nextDaysleads?.length}
                      {/* {console.log("users length", users.length)} */}
                    </Heading>
                  )}
                  {/* </div> */}
                </Card>
              </Link>
            </Flex>
          </Flex>

          {/* second row  */}
          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            {/* Upcoming followupsand missedfollowups*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/upcoming">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={upcomingImage} alt="upcomingImage" />
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Upcoming Followups
                  </Text>
                  {upcoming && (
                    <Heading size="lg" color="black">
                      {upcoming?.length}
                    </Heading>
                  )}
                </Card>
              </Link>
            </Flex>
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/missed">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={Missed} alt="Transfered Leads" />
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Missed followups
                  </Text>
                  {missed && (
                    <Heading size="lg" color="black">
                      {missed?.length}
                    </Heading>
                  )}
                </Card>
              </Link>
            </Flex>
            {/* Assigned & Transfered Leads*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/assignedleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={AssignedLeads} alt="Assigned Leads" />

                  {/* <div style={{ flex: 1 }}> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Assigned Leads
                  </Text>
                  {/* </div> */}
                  {assigned && (
                    <Heading size="lg" color="black">
                      {assigned?.length}
                    </Heading>
                  )}
                </Card>
              </Link>

              <Link to="/transferleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={Transfer} alt="Transfered Leads" />
                  {/* <div style={{ flex: 1 }}> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Transfered Leads
                  </Text>
                  {transfered && (
                    <Heading size="lg" color="black">
                      {transfered?.length}
                    </Heading>
                  )}
                  {/* </div> */}
                </Card>
              </Link>
            </Flex>
          </Flex>
          {/* third row  */}

          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            {/*Active work Order*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/lostleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={lostLeadsIcon} alt="Transfered Leads" />
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Lost Leads
                  </Text>
                  {lostLeads && (
                    <Heading size="lg" color="black">
                      {lostLeads?.length}
                    </Heading>
                  )}
                </Card>
              </Link>
            </Flex>
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/workorder">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={filter} alt="Transfered Leads" />
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Active Work Orders
                  </Text>
                  {workOrders && (
                    <Heading size="lg" color="black">
                      {workOrders?.length}
                    </Heading>
                  )}
                </Card>
              </Link>

              <Link to="/highvalueleads" state={{ highdata: highvalueleads }}>
                {role === "Sales Execative" && (
                  <Card
                    as="flex"
                    width={{ base: "100%", md: "200px" }}
                    height={{ base: "100%", md: "150px" }}
                    minW="150px"
                    maxH="150px"
                    background="#FFFFFF"
                    borderLeft="4px solid #FF0000"
                    borderRadius="12px"
                    boxShadow="md" // Add a shadow for a card-like appearance
                    p="4" // Adjust padding as needed
                    display="flex"
                    direction={{ base: "column", md: "row", lg: "row" }}
                    justifyContent={{ base: "center", md: "space-around" }}
                    alignItems="center"
                    gap="20px"
                  >
                    <img src={filter} alt="Transfered Leads" />
                    <Text
                      fontSize={{ base: "0.7rem", md: "1.2rem" }}
                      fontWeight="bold"
                    >
                      High Value Leads
                    </Text>
                    {workOrders && (
                      <Heading size="lg" color="black">
                        {highvalueleadslength}
                      </Heading>
                    )}
                  </Card>
                )}
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={filter} alt="Transfered Leads" />
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Total High Value Leads
                  </Text>
                  {workOrders && (
                    <Heading size="lg" color="black">
                      {highvalueleadslength}
                    </Heading>
                  )}
                </Card>
              </Link>

              <Link to="">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  {/* <img src={filter} alt="Transfered Leads" /> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Payment Details
                  </Text>
                  {workOrders && (
                    <Heading size="lg" color="black">
                      {/* {workOrders.length} */}
                    </Heading>
                  )}
                </Card>
              </Link>
            </Flex>
          </Flex>

          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            {/*Active work Order*/}

            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/">
                {role === "Sales Executive" && (
                  <Card
                    as="flex"
                    width={{ base: "100%", md: "200px" }}
                    height={{ base: "100%", md: "150px" }}
                    minW="150px"
                    maxH="150px"
                    background="#FFFFFF"
                    borderLeft="4px solid #FF0000"
                    borderRadius="12px"
                    boxShadow="md" // Add a shadow for a card-like appearance
                    p="4" // Adjust padding as needed
                    display="flex"
                    direction={{ base: "column", md: "row", lg: "row" }}
                    justifyContent={{ base: "center", md: "space-around" }}
                    alignItems="center"
                    gap="20px"
                  >
                    {/* <img src={lostLeadsIcon} alt="Transfered Leads" /> */}
                    <Text
                      fontSize={{ base: "0.7rem", md: "1.2rem" }}
                      fontWeight="bold"
                    >
                      Leave Applications
                    </Text>
                    {lostLeads && (
                      <Heading size="lg" color="black">
                        {/* {lostLeads.length} */}
                      </Heading>
                    )}
                  </Card>
                )}
                {role !== "Sales Executive" && (
                  <Card
                    as="flex"
                    width={{ base: "100%", md: "200px" }}
                    height={{ base: "100%", md: "150px" }}
                    minW="150px"
                    maxH="150px"
                    background="#FFFFFF"
                    borderLeft="4px solid #FF0000"
                    borderRadius="12px"
                    boxShadow="md" // Add a shadow for a card-like appearance
                    p="4" // Adjust padding as needed
                    display="flex"
                    direction={{ base: "column", md: "row", lg: "row" }}
                    justifyContent={{ base: "center", md: "space-around" }}
                    alignItems="center"
                    gap="20px"
                  >
                    {/* <img src={lostLeadsIcon} alt="Transfered Leads" /> */}
                    <Text
                      fontSize={{ base: "0.7rem", md: "1.2rem" }}
                      fontWeight="bold"
                    >
                      Total Leave Applications
                    </Text>
                    {lostLeads && (
                      <Heading size="lg" color="black">
                        {/* {lostLeads.length} */}
                      </Heading>
                    )}
                  </Card>
                )}
              </Link>
            </Flex>
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  {/* <img src={lostLeadsIcon} alt="Transfered Leads" /> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Target
                  </Text>
                  {lostLeads && (
                    <Heading size="lg" color="black">
                      {/* {lostLeads.length} */}
                    </Heading>
                  )}
                </Card>
              </Link>

              <Link to="/">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  {/* <img src={lostLeadsIcon} alt="Transfered Leads" /> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Allowance
                  </Text>
                  {lostLeads && (
                    <Heading size="lg" color="black">
                      {/* {lostLeads.length} */}
                    </Heading>
                  )}
                </Card>
              </Link>

              <Link to="/pendingleads" state={{ pendingworkorders }}>
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  background="#FFFFFF"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  {/* <img src={lostLeadsIcon} alt="Transfered Leads" /> */}
                  <Text
                    fontSize={{ base: "0.7rem", md: "1.2rem" }}
                    fontWeight="bold"
                  >
                    Incomplete Client Details
                  </Text>
                  {lostLeads && (
                    <Heading size="lg" color="black">
                      {pendingworkorders?.length}
                    </Heading>
                  )}
                </Card>
              </Link>
            </Flex>
          </Flex>
          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              {(role === "Sales Manager" ||
                role === "General Sales Manager") && (
                <Link to="/morethan3followups" state={{ morethan }}>
                  <Card
                    as="flex"
                    width={{ base: "100%", md: "200px" }}
                    height={{ base: "100%", md: "150px" }}
                    minW="150px"
                    maxH="150px"
                    background="#FFFFFF"
                    borderLeft="4px solid #FF0000"
                    borderRadius="12px"
                    boxShadow="md" // Add a shadow for a card-like appearance
                    p="4" // Adjust padding as needed
                    display="flex"
                    direction={{ base: "column", md: "row", lg: "row" }}
                    justifyContent={{ base: "center", md: "space-around" }}
                    alignItems="center"
                    gap="20px"
                  >
                    {/* <img src={lostLeadsIcon} alt="Transfered Leads" /> */}
                    <Text
                      fontSize={{ base: "0.7rem", md: "1.2rem" }}
                      fontWeight="bold"
                    >
                      Leads with more than 3 followUps
                    </Text>
                    {lostLeads && (
                      <Heading size="lg" color="black">
                        {morethan?.length}
                      </Heading>
                    )}
                  </Card>
                </Link>
              )}
            </Flex>
          </Flex>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default DashboardOverview;
