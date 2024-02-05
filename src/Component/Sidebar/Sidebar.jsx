import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

import {
  List,
  ListItem,
  Box,
  Flex,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  Dashboard as DashboardIcon,
  GroupAdd as GroupAddIcon,
  // ContactMail as ContactMailIcon,
  // ArrowForward as MovingIcon,
  // MultilineChart as MultilineChartIcon,
  ExitToApp as ExitToAppIcon,
  // Menu as MenuIcon,
} from "@mui/icons-material";
import { CloseIcon } from "@chakra-ui/icons";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PeopleIcon from "@mui/icons-material/People";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { useWorkForm } from "../context/WorkOrderFormContext";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const auth = useAuth();
  const { userData } = useUser();
  const { clearFormData } = useWorkForm();

  const isAdmin = userData?.userRole === "Admin";
  const isSales = userData?.userRole === "Sales";

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once (on mount)

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("clicked");
    auth.logout();
    navigate("/login");
    clearFormData();
  };

  const dynamicsidebardata = [
    {
      role: "Admin",
      menu: [
        {
          name: "Dashboard",
          path: "",
          icon: <DashboardIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Add Employee",
          path: "newEmpoyee/addEmployee",
          icon: <PeopleIcon style={{ marginTop: "0rem" }} />,
        },
      ],
    },
    {
      role: "Sales Executive",
      menu: [
        {
          name: "Dashboard",
          path: "",
          icon: <DashboardIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: " My Leads",
          path: "newleads",
          icon: <GroupOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Add Leads",
          path: "newleads/form",
          icon: <GroupAddOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Work Order",
          path: "workorder",
          icon: <WorkHistoryOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Lost Leads",
          path: "lostleads",
          icon: <BadgeOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
      ],
    },
    {
      role: "Sales Manager",
      menu: [
        {
          name: "Dashboard",
          path: "",
          icon: <DashboardIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Employee",
          path: "newEmpoyee",
          icon: <PeopleIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: " My Leads",
          path: "getMyleads",
          icon: <GroupOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: " Total Leads",
          path: "newleads",
          icon: <GroupOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Add Leads",
          path: "newleads/form",
          icon: <GroupAddOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Work Order",
          path: "workorder",
          icon: <WorkHistoryOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Lost Leads",
          path: "lostleads",
          icon: <BadgeOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
      ],
    },
    {
      role: "General Sales Manager",
      menu: [
        {
          name: "Dashboard",
          path: "",
          icon: <DashboardIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Employee",
          path: "newEmpoyee",
          icon: <PeopleIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: " My Leads",
          path: "getMyleads",
          icon: <GroupOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: " Total Leads",
          path: "newleads",
          icon: <GroupOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Add Leads",
          path: "newleads/form",
          icon: <GroupAddOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Work Order",
          path: "workorder",
          icon: <WorkHistoryOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
        {
          name: "Lost Leads",
          path: "lostleads",
          icon: <BadgeOutlinedIcon style={{ marginTop: "0rem" }} />,
        },
      ],
    },
  ];

  // style={{ marginTop: "0rem" }}
  return (
    <>
      {/* Hamburger menu button for mobile */}
      {isMobileView && (
        <Box
          as={MenuRoundedIcon}
          onClick={onOpen}
          position="fixed"
          top="6.5rem"
          left="1.2rem"
          zIndex={10}
          cursor="pointer"
          fontSize="2rem" // Adjust the size of the icon
          color="blue.500"
        />
      )}
      {/* /////////////////////// */}
      {!isMobileView &&
        dynamicsidebardata.map((item) => {
          console.log(item.role);
          if (item.role === userData?.userRole) {
            console.log(item);
            return item.menu.map((items) => {
              console.log(items.name);
              return (
                <List p="5px" mt="0.5rem" ml="0.5rem">
                  <ListItem className="listItem" p="10px" borderRadius="10px">
                    <Flex alignItems="start" justify="start">
                      {items.icon}
                      <NavLink
                        key={items.path}
                        to={items.path}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          as={"span"}
                          color="#595c5f"
                          fontSize={{ base: "0.5rem", md: "1.2rem" }}
                          marginLeft="8px"
                          _hover={{ textDecoration: "underline" }}
                          key={items.name}
                        >
                          {items.name}
                          {console.log(items.name)}
                        </Text>
                      </NavLink>
                    </Flex>
                  </ListItem>
                </List>
              );
            });
          }
        })}


      {isMobileView && (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay marginTop={"10rem"}>
            <DrawerContent
              bg={"white"}
              marginTop="3rem"
              // width={"20%"}
              width={{ base: "100%", md: "20%" }} // Adjust the width for larger screens
              position={{ base: "fixed", md: "absolute" }} // Adjust position for mobile and larger screens
              padding={{ base: "0", md: "1rem" }} // Adjust padding for mobile and larger screens
              top={{ base: "0", md: "7rem" }} // Adjust top position
            >
              <DrawerCloseButton
                position="absolute"
                top="1rem"
                right="1rem"
                color="blue.500"
                fontSize="2rem"
                transition={"all 0.2s ease-in-out"}
                // Adjust the size of the close button
              />
              <DrawerBody>
                <List p="10px">
                  {dynamicsidebardata
                    .filter((item) => item.role === userData?.userRole)
                    .map((filteredItem) =>
                      filteredItem.menu.map((items) => (
                        <ListItem
                          className="listItem"
                          p="10px"
                          borderRadius="10px"
                          key={items.name}
                        >
                          <Flex alignItems="center">
                            {React.cloneElement(items.icon, {
                              fontSize: "1.5rem", // Adjust the icon size
                              marginRight: "8px", // Add margin between icon and text
                            })}
                            <NavLink
                              to={items.path}
                              style={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                as={"span"}
                                color="black"
                                fontSize="1rem"
                                marginLeft="4px"
                                _hover={{ textDecoration: "underline" }}
                                onClick={() => {
                                  onClose();
                                  // Add any additional onClick logic if needed
                                }}
                                key={items.name}
                              >
                                {items.name}
                              </Text>
                            </NavLink>
                          </Flex>
                        </ListItem>
                      ))
                    )}
                </List>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}


    </>
  );
};

export default SideBar;
