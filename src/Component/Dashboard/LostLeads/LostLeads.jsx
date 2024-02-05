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
import LostLeadsTable from "./LostLeadsTable";

function LostLeads() {


  return (
    <Box>
      <Center>
        <Flex direction="column" align="center" mt="2rem">

          <Flex  mt="2rem" justify="center">
            <LostLeadsTable/>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
}

export default LostLeads;
