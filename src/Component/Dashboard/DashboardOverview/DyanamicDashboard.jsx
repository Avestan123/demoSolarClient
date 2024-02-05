import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { useUser } from "../../context/UserContext";
import TodaysLeads from "./TodaysLeads";

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

const DynamicCard = ({ cardData }) => {
  const { cardname, value, logo, path } = cardData;
  console.log("Values", value);

  return (
    <Link to={path} textDecoration="none">
      <Box
        width="220px"
        height="150px"
        background="#FFFFFF"
        borderLeft="4px solid #FF0000"
        borderRadius="12px"
        boxShadow="md"
        p="4"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        margin="20px"
      >
        {logo && <Image src={logo} alt={cardname} boxSize="50px" />}
        <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
          {cardname}
        </Text>
        {value !== "" && (
          <Heading size="lg" color="black">
            {value}
          </Heading>
        )}
      </Box>
    </Link>
  );
};

const DynamicCardGroup = ({ roleData }) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent="center"
      flexWrap="wrap"
    >
      {roleData.map((cardData, index) => (
        <DynamicCard key={index} cardData={cardData} />
      ))}
    </Flex>
  );
};

const DyanamicDashboard = () => {
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

  const dynamicData = [
    // {
    //   role: "Admin",
    //   data: [
    //     {
    //       cardname: "Add Employees",
    //       value: "",
    //       //   EmployyeeCount
    //       logo: "",
    //       path: "/newEmpoyee/addEmployee",
    //     },
    //     {
    //       cardname: "Total Employees",
    //       value: "",
    //       logo: "",
    //       //   TotalCumstmer
    //       path: "/newEmpoyee/addEmployee",
    //     },
    //   ],
    // },
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
          value: "",
          //   missed,
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
          value: "",
          //   transfered,
          logo: Transfer,
          path: "/transferleads",
        },
        {
          cardname: "Lost Leads",
          value: "",
          //   lostLeads,
          logo: lostLeadsIcon,
          path: "/lostleads",
        },

        {
          cardname: "Active Work Orders",
          value: "",
          //   workOrders,
          logo: filter,
          path: "/workorder",
        },
        {
          cardname: "Total High Value Leads",
          value: highvalueleadslength,
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
    // {
    //   role: "Sales Manager",
    //   data: [
    //     {
    //       cardname: "My Leads",
    //       value: myleadslength,
    //       logo: "",
    //       path: "/sales/myLeads",
    //     },
    //     {
    //       cardname: "Total Leads",
    //       value: leads.length,
    //       logo: "",
    //       path: "/newleads",
    //     },
    //     {
    //       cardname: "Total Follow Ups",
    //       value: todaysFollowups,
    //       logo: TodaysFollowup,

    //       path: "/followups",
    //     },
    //     {
    //       cardname: "Todays Follow Ups",
    //       value: todaysFollowups,
    //       logo: TodaysFollowup,
    //       path: "/followups",
    //     },
    //     {
    //       cardname: "Next Days Follow Ups",
    //       value: nextDaysleads,
    //       logo: nextDay,
    //       path: "/nextday",
    //     },
    //     {
    //       cardname: "Upcoming Followups",
    //       value: upcoming,
    //       logo: upcomingImage,
    //       path: "/upcoming",
    //     },

    //     {
    //       cardname: "Missed Followups",
    //       value: missed,
    //       logo: Missed,
    //       path: "/missed",
    //     },
    //     {
    //       cardname: "Assigned Leads",
    //       value: assigned,
    //       logo: AssignedLeads,
    //       path: "/assigned",
    //     },
    //     {
    //       cardname: "Transfered Leads",
    //       value: transfered,
    //       logo: Transfer,
    //       path: "/transferleads",
    //     },
    //     {
    //       cardname: "Lost Leads",
    //       value: lostLeads,
    //       logo: lostLeadsIcon,
    //       path: "/lostleads",
    //     },

    //     {
    //       cardname: "Active Work Orders",
    //       value: workOrders,
    //       logo: filter,
    //       path: "/workorder",
    //     },
    //     {
    //       cardname: "Total High Value Leads",
    //       value: highvalueleads,
    //       logo: filter,
    //       path: "/highvalueleads",
    //     },
    //     {
    //       cardname: "Payment Details",
    //       value: "",
    //       logo: "",
    //       path: "/paymentdetails",
    //     },
    //     {
    //       cardname: "Total Leave Applications",
    //       value: "",
    //       logo: "",
    //       path: "/leaveapplications",
    //     },
    //     {
    //       cardname: "Target",
    //       value: "",
    //       logo: "",
    //       path: "",
    //     },
    //     {
    //       cardname: "Allowance",
    //       value: "",
    //       logo: "",
    //       path: "",
    //     },
    //     {
    //       cardname: "Incomplete Client Details",
    //       value: "",
    //       logo: "",
    //       path: "",
    //     },
    //     {
    //       cardname: "More than 3 Follow Ups",
    //       value: morethan,
    //       logo: "",
    //       path: "/morethan3followups",
    //     },
    //     {
    //       cardname: "Target",
    //       value: "",
    //       logo: "",

    //       path: "",
    //     },
    //   ],
    // },
    // {
    //   role: "General Sales Manager",
    //   data: [
    //     {
    //       cardname: "My Leads",
    //       value: myleadslength,
    //       logo: "",
    //       path: "/sales/myLeads",
    //     },
    //     {
    //       cardname: "Total Leads",
    //       value: leads.length,
    //       logo: "",
    //       path: "/newleads",
    //     },
    //     {
    //       cardname: "Total Follow Ups",
    //       value: todaysFollowups,
    //       logo: TodaysFollowup,

    //       path: "/followups",
    //     },
    //     {
    //       cardname: "Todays Follow Ups",
    //       value: todaysFollowups,
    //       logo: TodaysFollowup,
    //       path: "/followups",
    //     },
    //     {
    //       cardname: "Next Days Follow Ups",
    //       value: nextDaysleads,
    //       logo: nextDay,
    //       path: "/nextday",
    //     },
    //     {
    //       cardname: "Upcoming Followups",
    //       value: upcoming,
    //       logo: upcomingImage,
    //       path: "/upcoming",
    //     },

    //     {
    //       cardname: "Missed Followups",
    //       value: missed,
    //       logo: Missed,
    //       path: "/missed",
    //     },
    //     {
    //       cardname: "Assigned Leads",
    //       value: assigned,
    //       logo: AssignedLeads,
    //       path: "/assigned",
    //     },
    //     {
    //       cardname: "Transfered Leads",
    //       value: transfered,
    //       logo: Transfer,
    //       path: "/transferleads",
    //     },
    //     {
    //       cardname: "Lost Leads",
    //       value: lostLeads,
    //       logo: lostLeadsIcon,
    //       path: "/lostleads",
    //     },

    //     {
    //       cardname: "Active Work Orders",
    //       value: workOrders,
    //       logo: filter,
    //       path: "/workorder",
    //     },
    //     {
    //       cardname: "Total High Value Leads",
    //       value: highvalueleads,
    //       logo: filter,
    //       path: "/highvalueleads",
    //     },
    //     {
    //       cardname: "Payment Details",
    //       value: "",
    //       logo: "",
    //       path: "/paymentdetails",
    //     },
    //     {
    //       cardname: "Total Leave Applications",
    //       value: "",
    //       logo: "",
    //       path: "/leaveapplications",
    //     },
    //     {
    //       cardname: "Target",
    //       value: "",
    //       logo: "",
    //       path: "",
    //     },
    //     {
    //       cardname: "Allowance",
    //       value: "",
    //       logo: "",
    //       path: "",
    //     },
    //     {
    //       cardname: "Incomplete Client Details",
    //       value: "",
    //       logo: "",
    //       path: "",
    //     },
    //     {
    //       cardname: "More than 3 Follow Ups",
    //       value: morethan,
    //       logo: "",
    //       path: "/morethan3followups",
    //     },
    //     {
    //       cardname: "Target",
    //       value: "",
    //       logo: "",

    //       path: "",
    //     },
    //   ],
    // },
  ];

  return (
    <DynamicCardGroup
      roleData={dynamicData.find((data) => data.role === role)?.data || []}
    />
  );
};

export default DyanamicDashboard;
