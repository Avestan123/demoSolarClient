import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  InputGroup,
  InputLeftAddon,
  Select,
  NumberInput,
  Text,
  Image,
  Textarea,
  Button,
  //   control,
} from "@chakra-ui/react";
import { set, useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const NextDayDetails = () => {
  const { state } = useLocation();

  console.log("state", state);
  const [Getstate, setstate] = useState();
  const [Getcity, setcity] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const [toggle, setToggle] = useState(false);
  const [otherSource, setOtherSource] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [projectkw, setprojectkw] = useState(true);
  const [retails, setRetails] = useState(true);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const ListSourceorLead = [
    "Marketing",
    "Refferal",
    "Facebook ",
    "Instagram",
    "Linkedin",
    "Our Website",
    "Other",
  ];
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  //   console.log(row);
  const [selectedFiles, setselectedFiles] = useState({
    electricitybill: null,
    adharcard: null,
    pancard: null,
    taxreceipt: null,
  });

  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", Getstate);

  useEffect(() => {
    setValue("clientName", state?.lead?.clientName);
    setValue("number", state?.lead?.number);
    setValue("email", state?.lead?.email);
    setValue("address", state?.lead?.address);
    setValue("city", state?.lead?.city);
    setcity(state?.lead?.city);
    setValue("state", state?.lead?.state);
    setstate(state?.lead?.state);
    setValue("pincode", state?.lead?.pincode);
    setValue("source", state?.lead?.source);
    setValue("project", state?.lead?.project);
    setValue("projectKeyword", state?.lead?.projectKeyword);
    setValue("retail", state?.lead?.retail);
    setValue("retailName", state?.lead?.retailName);
    setValue("retailNumber", state?.lead?.retailNumber);
    setValue("retailEmail", state?.lead?.retailEmail);
    setValue("retailAddress", state?.lead?.retailAddress);
    setValue("retailCity", state?.lead?.retailCity);
    setValue("retailState", state?.lead?.retailState);
    setValue("retailPincode", state?.lead?.retailPincode);
    setValue("retailSource", state?.lead?.retailSource);
    setValue("retailProject", state?.lead?.retailProject);
    setValue("dob", state?.lead?.dob);
    setValue("requirement", state?.lead?.requirement);
    setValue("kilowatts", state?.lead?.kilowatts);
    setValue("clientlevel", state?.lead?.clientlevel);
    setValue("followUpDate", state?.lead?.followUpDate);
    setValue("remarks", state?.lead?.remarks);
    setValue("referralName", state?.lead?.referralName);
    setValue("retailProductName", state?.lead?.retailProductName);
    setValue("altNumber", state?.lead?.altNumber);
    setValue("pin", state?.lead?.pin);

    setselectedFiles((prevfile) => ({
      ...prevfile,
      adharcard: state?.lead?.adharcard,
    }));
    console.log("adhar card", state?.lead?.adharcard);
    setselectedFiles((prevfile) => ({
      ...prevfile,
      pancard: state?.lead?.pancard,
    }));
    setselectedFiles((prevfile) => ({
      ...prevfile,
      electricitybill: state?.lead?.electricitybill,
    }));
    setselectedFiles((prevfile) => ({
      ...prevfile,
      taxreceipt: state?.lead?.taxreceipt,
    }));
    // setselectedFiles("electricitybill", row?.electricitybill);
    // setselectedFiles("adharcard", row?.adharcard);
    // setselectedFiles("pancard", row?.pancard);
    // setselectedFiles("taxreceipt", row?.taxreceipt);
    // setValue("source", row?.source);
  }, [setValue, state]);
  return (
    <>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        gap="5"
        mt="5"
      >
        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            NextDay FollowUps
          </FormLabel>
        </FormControl>

        {/* Name & Email */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel> Client Name</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter name"
                contentEditable={false}
                isDisabled
                // control={control}
                name="clientName"
                id="clientName"
                {...register("clientName", {
                  //   required: "Client Name is required",
                  message: "invalid input",
                })}
              />
              {/* {errors.clientName && (
                <Text color="red.500">{errors.clientName.message}</Text>
              )} */}
            </FormControl>
          </Box>
          <FormControl isRequired>
            <FormLabel>Mobile Number</FormLabel>
            <InputGroup>
              <InputLeftAddon marginTop={"0.5rem"} height={"50px"}>
                +91
              </InputLeftAddon>
              <Input
                marginTop={"0.5rem"}
                type="text"
                width={{ base: "200px", md: "350px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Enter mobile"
                isRequired
                isDisabled
                maxLength={10} // Change maxlength to maxLength and set it to 10
                // control={control}
                name="number"
                id="number"
                {...register("number", {
                  //   required: "Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/, // Ensure exactly 10 digits
                    message: "Invalid number format",
                  },
                  validate: (value) => {
                    // validate if it is not an number
                    if (isNaN(value)) {
                      return "Invalid number format";
                    }
                  },
                })}
              />
            </InputGroup>
            {/* {errors.number && (
              <Text color="red.500">{errors.number.message}</Text>
            )} */}
          </FormControl>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="email"
                isDisabled
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter email"
                control={control}
                name="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                    message: "invalid email",
                  },
                })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Alternate Number</FormLabel>
              <InputGroup>
                <InputLeftAddon marginTop={"0.5rem"} height={"50px"}>
                  +91
                </InputLeftAddon>
                <Input
                  marginTop={"0.5rem"}
                  type="text"
                  width={{ base: "200px", md: "350px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="Enter mobile"
                  isDisabled
                  maxLength={10} // Change maxlength to maxLength and set it to 10
                  control={control}
                  name="altNumber"
                  id="altNumber"
                  {...register("altNumber", {
                    pattern: {
                      value: /^[0-9]{10}$/, // Ensure exactly 10 digits
                      message: "Invalid number format",
                    },
                  })}
                />
              </InputGroup>
              {errors.altNumber && (
                <Text color="red.500">{errors.altNumber.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Alternte Contact & Address */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="text"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Enter address"
                required
                isDisabled
                control={control}
                name="address"
                id="address"
                {...register("address", {
                  //   required: "address is required",
                  message: "invalid address",
                })}
              />
              {errors.address && (
                <Text color="red.500">{errors.address.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel color={"#002A53"}>State</FormLabel>

              <Select
                onChange={(e) => {
                  setstate(e.target.value);
                }}
                value={Getstate}
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Select state"
                isDisabled
                isRequired
                {...register("state", {
                  //   required: "state is required",
                })}
                name="state"
                id="state"
              >
                {states.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.state && (
                <Text color="red.500">{errors.state.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* state and city */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel color={"#002A53"}>City</FormLabel>
              <Select
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Select city"
                isRequired
                isDisabled
                value={Getcity}
                {...register("city", {
                  required: "city is required",
                })}
                name="city"
                id="city"
              >
                {cities.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.city && (
                <Text color="red.500">{errors.city.message}</Text>
              )}
            </FormControl>
          </Box>

          {/* state and city */}

          <Box>
            <FormControl>
              <FormLabel>PIN </FormLabel>
              <NumberInput max={6}>
                <Input
                  marginTop={"0.5rem"}
                  type="text" // Use type="text" instead of type="number"
                  // pattern="[0-9]{6}" // Ensure exactly 6 digits
                  maxLength={6}
                  isDisabled
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="Enter PIN"
                  control={control}
                  name="pin"
                  id="pin"
                  {...register("pin", {
                    pattern: {
                      value: /^[1-9][0-9]{5}$/, // Ensure exactly 6 digits
                      message: "Please enter a 6-digit number.",
                    },
                    validate: (value) => {
                      // validate if it is not an number
                      if (isNaN(value)) {
                        return "Invalid number format";
                      }
                    },
                  })}
                />
              </NumberInput>

              {errors.pin && <Text color="red.500">{errors.pin.message}</Text>}
            </FormControl>
          </Box>
        </Stack>

        {/* PIN and requirement */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="date"
                isDisabled
                pattern="[0-9]*"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                // border={"1px solid #cababa"}
                required={false}
                control={control}
                name="dob"
                id="dob"
                {...register("dob", {
                  //   message: "Invalid date format",
                })}
              />
              {errors.dob && <Text color="red.500">{errors.dob.message}</Text>}
            </FormControl>
          </Box>

          <Box>
            <FormControl isRequired>
              <FormLabel>Order Type</FormLabel>
              <Select
                placeholder="Select order type"
                marginTop={"0.5rem"}
                isRequired
                isDisabled
                type="text"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                control={control}
                name="requirement"
                id="requirement"
                onChange={(value) => {
                  handleSelectChange(value);
                  console.log("Handle Change from new leads", value);
                }}
                value={watch("requirement")}
                {...register("requirement", {
                  //   required: "Requirement Role is required",
                  message: "invalid input",
                })}
              >
                <option value="Project">Project</option>
                <option value="Retail">Retail</option>
              </Select>

              {errors.requirement && (
                <Text color="red.500">{errors.requirement.message}</Text>
              )}
            </FormControl>
          </Box>

          {console.log("SetProject data ", projectkw)}
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            {projectkw && watch("requirement") === "Project" && (
              <FormControl>
                <FormLabel>kilowatts</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  type="number"
                  isDisabled
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  border={"1px solid #707070"}
                  control={control}
                  name="kilowatts"
                  id="kilowatts"
                  {...register("kilowatts", {
                    // required: "kilowatts is required for Project",
                    message: "invalid input",
                  })}
                />
                {errors.kwatss && (
                  <Text color="red.500">{errors.kwatss.message}</Text>
                )}
              </FormControl>
            )}
          </Box>
          <Box>
            {retails && watch("requirement") === "Retail" && (
              <FormControl>
                <FormLabel>Products</FormLabel>
                <Select
                  placeholder="Select options"
                  marginTop={"0.5rem"}
                  type="text"
                  isDisabled
                  width={{ base: "250px", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  control={control}
                  name="retailProductName"
                  id="retailProductName"
                  onChange={(e) => handleSelectChange(e.target.value)}
                  value={watch("retailProductName")}
                  {...register("retailProductName", {
                    message: "invalid input",
                  })}
                >
                  <option value="Solar Water Heater">Solar Water Heater</option>
                  <option value="Solar Cooker">Solar Cooker</option>
                </Select>
                {errors.retailProductName && (
                  <Text color="red.500">
                    {errors.retailProductName.message}
                  </Text>
                )}
              </FormControl>
            )}
          </Box>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Scale of Order</FormLabel>
              <Select
                placeholder="Select options"
                marginTop={"0.5rem"}
                isRequired
                isDisabled
                type="text"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                control={control}
                name="clientlevel"
                id="clientlevel"
                onChange={(e) => handleSelectChange(e.target.value)}
                value={watch("clientlevel")}
                {...register("clientlevel", {
                  //   required: "clientlevel Role is required",
                  message: "invalid input",
                })}
              >
                <option value="Small">Small</option>
                <option value="Mid">Mid</option>
                <option value="High-value">High-value</option>
              </Select>
              {errors.clientlevel && (
                <Text color="red.500">{errors.clientlevel.message}</Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl isRequired>
              <FormLabel>Customer Requirement</FormLabel>
              <Textarea
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "250px", md: "400px" }}
                // height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter requirement"
                isRequired
                isDisabled
                min={getCurrentDate()} // Set the minimum date
                control={control}
                name="remarks"
                id="remarks"
                {...register("remarks", {
                  //   required: "remarks is required",
                  message: "invalid remarks",
                })}
              />
              {errors.remarks && (
                <Text color="red.500">{errors.remarks.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Scale of Order & Description */}

        {/* Source of Lead and specify source */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Source or Lead</FormLabel>
              <Select
                placeholder="Select options"
                marginTop={"0.5rem"}
                isRequired
                isDisabled
                type="text"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                control={control}
                name="source"
                id="source"
                onChange={(e) => handleSourceChange(e.target.value)}
                value={watch("source")}
                {...register("source", {
                  //   required: "source Role is required",
                  message: "invalid input",
                })}
              >
                {ListSourceorLead.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              {errors.source && (
                <Text color="red.500">{errors.source.message}</Text>
              )}
            </FormControl>
          </Box>

          {watch("source") === "referral" && (
            <>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={6}
                alignItems="center"
                mx="1rem"
                mt="1rem"
              >
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Referral Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter name"
                      isDisabled
                      // Add necessary props, such as onChange and value
                      {...register("referralName", {
                        // required: "Refferal Name is required for referral",
                        message: "invalid input",
                      })}
                    />
                    {errors.referralName && (
                      <Text color="red.500">{errors.referralName.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>
            </>
          )}
          {watch("source") === "Other" && (
            <>
              {/* <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={6}
                    alignItems="center"
                    mx="1rem"
                    mt="1rem"
                  > */}
              <Box>
                <FormControl isRequired>
                  <FormLabel>Other Source</FormLabel>
                  <Input
                    type="text"
                    isRequired
                    isDisabled
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    backgroundColor="gray.100"
                    placeholder="enter other source"
                    control={control}
                    name="otherSource"
                    id="otherSource"
                    // Add necessary props, such as onChange and value
                    {...register("otherSource", {
                      //   required: "otherSource is required for referral",
                      message: "invalid input",
                    })}
                  />
                  {errors.otherSource && (
                    <Text color="red.500">{errors.otherSource.message}</Text>
                  )}
                </FormControl>
              </Box>
              {/* </Stack> */}
            </>
          )}
          {/* </Box> */}
        </Stack>

        {/* Conditionally render Specify other Source based on the selected value */}
        {watch("source") === "Refferal" && (
          <Stack>
            <Box>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  type="text"
                  isRequired
                  isDisabled
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="enter other source"
                  control={control}
                  name="referralName"
                  id="referralName"
                  {...register("referralName", {
                    message: "invalid otherSource",
                  })}
                />
                {errors.referralName && (
                  <Text color="red.500">{errors.referralName.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        )}

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Upload Electricity Bill</FormLabel>
              <Input
                marginTop={"0.5rem"}
                alignItems={"center"}
                textAlign={"center"}
                justifyContent={"center"}
                isRequired
                width={{ base: "250px", md: "400px" }}
                type="file"
                display="none"
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="electricitybill"
                id="electricitybill"
                {...register("electricitybill", {
                  // required: "Electricity Bill is required",
                  message: "invalid file",
                })}
                onChange={(e) => handleFileChange("electricitybill", e)}
              />
              <Button
                as="label"
                htmlFor="electricitybill"
                cursor="pointer"
                marginTop={"0.5rem"}
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
                isDisabled
              >
                Choose File
              </Button>
              {console.log(selectedFiles)}
              {selectedFiles?.electricitybill && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.electricitybill?.name}
                  </Text>
                  {console.log(
                    "electricitybill File",
                    selectedFiles?.electricitybill?.file
                  )}
                  <Image
                    // src={selectedFiles.adharcard.file}
                    src={selectedFiles?.electricitybill}
                    alt="electricitybill Card Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(selectedFiles?.electricitybill, "_blank");
                    }}
                  />
                </Box>
              )}
              {errors.electricitybill && (
                <Text color="red.500">{errors.electricitybill.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Upload Pan Card</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="file"
                display="none"
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="pancard"
                id="pancard"
                {...register("pancard", {
                  // required: "Pan Card is required",
                  message: "invalid File",
                })}
                onChange={(e) => handleFileChange("pancard", e)}
              />
              <Button
                as="label"
                htmlFor="pancard"
                cursor="pointer"
                marginTop={"0.5rem"}
                isDisabled
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Choose File
              </Button>
              {selectedFiles?.pancard && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.pancard?.name}
                  </Text>
                  {console.log("pancard File", selectedFiles?.pancard?.file)}
                  <Image
                    // src={selectedFiles.adharcard.file}
                    src={selectedFiles?.pancard}
                    alt="pancard  Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(selectedFiles?.pancard, "_blank");
                    }}
                  />
                </Box>
              )}
              {errors.pan && <Text color="red.500">{errors.pan.message}</Text>}
            </FormControl>
          </Box>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Upload Aadhar Card</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="file"
                display="none"
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="adharcard"
                id="adharcard"
                {...register("adharcard", {
                  // required: "Aadhar Card is required",
                  message: "invalid file",
                })}
                onChange={(e) => handleFileChange("adharcard", e)}
              />
              <Button
                as="label"
                htmlFor="adharcard"
                cursor="pointer"
                marginTop={"0.5rem"}
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
                isDisabled
              >
                Choose File
              </Button>
              {selectedFiles?.adharcard && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected:
                    {/* {selectedFiles?.adharcard?.name} */}
                  </Text>
                  {console.log(
                    "Adharcard File",
                    selectedFiles?.adharcard?.file
                  )}
                  <Image
                    // src={selectedFiles.adharcard.file}
                    src={selectedFiles?.adharcard}
                    alt="Aadhar Card Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(selectedFiles.adharcard, "_blank");
                    }}
                  />
                </Box>
              )}
              {errors.adharcard && (
                <Text color="red.500">{errors?.adharcard?.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Upload Tax Receipt</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="file"
                display="none"
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={3}
                control={control}
                name="taxreceipt"
                id="taxreceipt"
                {...register("taxreceipt", {
                  // required: "Tax Reciept is required",
                  message: "invalid file",
                })}
                onChange={(e) => handleFileChange("taxreceipt", e)}
              />
              <Button
                as="label"
                htmlFor="taxreceipt"
                cursor="pointer"
                marginTop={"0.5rem"}
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
                isDisabled
              >
                Choose File
              </Button>
              {selectedFiles?.taxreceipt && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.taxreceipt?.name}
                  </Text>
                  {console.log("taxreceipt File", selectedFiles?.taxreceipt)}
                  <Image
                    // src={selectedFiles.adharcard.file}
                    src={selectedFiles?.taxreceipt}
                    alt="taxreceipt Card Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(selectedFiles?.taxreceipt, "_blank");
                    }}
                  />
                </Box>
              )}
              {errors.taxreceipt && (
                <Text color="red.500">{errors.taxreceipt.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Follow up Date</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                isDisabled
                type="date" // Use type="text" instead of type="number"
                // pattern="[0-9]{6}" // Ensure exactly 6 digits
                min={today}
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Enter Followup Date"
                control={control}
                name="followUpDate"
                id="followUpDate"
                {...register("followUpDate", {
                  required: "followUpDate Date is required",
                  message: "Invalid followUpDate date.",
                })}
              />
              {errors.followUpDate && (
                <Text color="red.500">{errors.followUpDate.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>


      </Flex>
    </>
  );
};

export default NextDayDetails;
