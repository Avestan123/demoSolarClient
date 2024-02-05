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
  import UpcomingTable from "./UpcomingTable";


  function Upcoming() {


    return (
      <Box>
        <Center>
          <Flex direction="column" align="center" mt="2rem">
            {/* <Flex justify="flex-end" w="100%" >
              <NavLink to="form">
                <Button
                  width={"8rem"}
                  height={"3rem"}
                  borderRadius={"15px"}
                  background={"orange"}
                  mx="2rem"
                  p="1rem"
                >
                 Add New Leads
                </Button>
              </NavLink>
            </Flex> */}
            <Flex  mt="2rem" justify="center">
              <UpcomingTable/>
            </Flex>
          </Flex>
        </Center>
      </Box>
    );
  }

  export default Upcoming;
