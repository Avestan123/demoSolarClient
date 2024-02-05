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
import MissedTable from "./MissedTable";

function Missed() {
  return (
    <Box>
      <Center>
        <Flex direction="column" align="center" mt="2rem">
          <Flex mt="2rem" justify="center">
            <MissedTable />
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
}

export default Missed;
