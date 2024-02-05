import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Text,
  Flex,
  Select,
  Switch,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Image,
  Spinner,
  NumberInput,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";

function NewLeadsform() {
  const navigate = useNavigate();
  const toast = useToast();
  const [toggle, setToggle] = useState(false);
  const [otherSource, setOtherSource] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [projectkw, setprojectkw] = useState(true);
  const [retails, setRetails] = useState(true);
  const [loading, setLoading] = useState(false);

  const [Getstate, setstate] = useState();
  const [GetCity, setcity] = useState();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // reset form function
  function resetForm(data) {
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, "");
    });
  }

  //handleSourceChange
  const handleSourceChange = () => {
    if (data.source === "other") {
      setOtherSource(true);
    }
  };

  // setting list of Surce leda list
  const ListSourceorLead = [
    "Marketing",
    "Refferal",
    "Facebook ",
    "Instagram",
    "Linkedin",
    "Our Website",
    "Other",
  ];

  // just testing for useRef;

  //for getting current date

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // for selected fles
  const [selectedFiles, setSelectedFiles] = useState({
    electricitybill: null,
    pancard: null,
    adharcard: null,
    taxreceipt: null,
  });

  const handleFileChange = (inputName, e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];

      console.log("Selected File:", file);

      // Check if the state is updated correctly
      setSelectedFiles((prevFiles) => {
        const updatedFiles = {
          ...prevFiles,
          [inputName]: { file, preview: URL.createObjectURL(file) },
        };
        console.log("Updated Files State:", updatedFiles);
        return updatedFiles;
      });
    }
  };

  const handleSelectChange = (selectedValue) => {
    setValue("requirement", selectedValue);
    if (selectedValue === "Project") {
      console.log("Clicked from Project");
      setprojectkw(true);
    }
    if (selectedValue === "Retail") {
      console.log("Clicked from Retail");
      setRetails(true);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("clientName", data?.clientName);

    formData.append("email", data?.email);

    formData.append("pin", data?.pin);
    formData.append("number", data?.number);

    formData.append("altNumber", data?.altNumber);

    formData.append("address", data?.address);

    formData.append("city", data?.city);
    setcity(data?.city);

    formData.append("followUpDate", data?.followUpDate);

    formData.append("requirement", data?.requirement);

    formData.append("remarks", data?.remarks);

    formData.append("clientlevel", data?.clientlevel);

    formData.append("kilowatts", data.kilowatts);

    formData.append("retail", data?.retails);

    formData.append("referralName", data?.referralName);

    formData.append("retailProductName", data?.retailProductName);

    formData.append("electricitybill", selectedFiles?.electricitybill?.file);

    formData.append("pancard", selectedFiles?.pancard?.file);
    formData.append("adharcard", selectedFiles?.adharcard?.file);
    formData.append("taxreceipt", selectedFiles?.taxreceipt?.file);

    formData.append("state", Getstate);

    formData.append("contactPerson", data?.contactPersonName);

    formData.append("gst", data?.gstNumber);

    formData.append("source", data?.source);

    formData.append("otherSource", data?.otherSource);

    formData.append("dob", data?.dob);

    console.log("Form Data", formData);
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    let response = await fetch(`${apiUrl}/sales/addCustomer`, {
      method: "POST",
      body: formData,

      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Content-Type": "multipart/form-data",
    });
    let Resdata = await response.json();
    console.log("ResData for Add Customer", Resdata);
    if (Resdata.status === 200) {
      setLoading(false);
      toast({
        title: "client Registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      resetForm(data);

      navigate("/newleads");
    } else if (Resdata.status === 400) {
      setLoading(false);
      console.log(Resdata, "400");
      toast({
        title: Resdata.msg || "Some Thing Went Wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else if (Resdata.status === 409) {
      setLoading(false);
      toast({
        title: Resdata.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      resetForm(data);
      setLoading(false);
      console.log(data, "288", Resdata);
      toast({
        title: Resdata.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const workorderbutton = async (data) => {
    console.log("Workorder data", data);
    setLoading(true);
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("clientName", data?.clientName);

    formData.append("email", data?.email);

    formData.append("number", data?.number);

    formData.append("altNumber", data?.altNumber);

    formData.append("address", data?.address);

    formData.append("followUpDate", data?.followUpDate);

    formData.append("requirement", data?.requirement);

    formData.append("remarks", data?.remarks);

    formData.append("clientlevel", data?.clientlevel);

    formData.append("kilowatts", data?.kilowatts);

    formData.append("retail", data?.retails);

    formData.append("referralName", data?.referralName);

    formData.append("retailProductName", data?.retailProductName);
    formData.append("pin", data?.pin);

    formData.append("electricitybill", selectedFiles?.electricitybill?.file);

    formData.append("pancard", selectedFiles?.pancard?.file);
    formData.append("adharcard", selectedFiles?.adharcard?.file);

    formData.append("taxreceipt", selectedFiles?.taxreceipt?.file);
    formData.append("state", Getstate);
    setstate(Getstate);
    localStorage.setItem("state", Getstate);
    formData.append("city", data.city);
    setcity(data?.city);

    formData.append("contactPerson", data?.contactPersonName);
    localStorage.setItem("contactPerson", data?.contactPersonName);

    formData.append("gst", data?.gstNumber);
    localStorage.setItem("gst", data?.gstNumber);

    formData.append("source", data?.source);
    localStorage.setItem("source", data?.source);

    formData.append("otherSource", data?.otherSource);
    localStorage.setItem("otherSource", data?.otherSource);

    formData.append("dob", data?.dob);
    localStorage.setItem("dob", data?.dob);
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    let response = await fetch(`${apiUrl}/sales/addCustomer`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Content-Type": "multipart/form-data",
    });
    let Resdata = await response.json();
    console.log("ResData for Add Customer", Resdata);
    if (Resdata.status === 200) {
      setLoading(false);
      toast({
        title: "client Registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      resetForm(data);
      console.log("Resdata from newleads form", Resdata);
      // if (buttonname === "Work Order") {
      navigate("/workorder/WorkOrderform", {
        state: {
          workorderdata: Resdata.customer,
        },
      });
    } else if (Resdata.status === 409) {
      setLoading(false);
      toast({
        title: Resdata.msg || "Mobile Number or Email Already Registered ",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: Resdata.msg || "Mobile Number Already Registered",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const saveAndTransfer = async (data) => {
    console.log("Save and transfer", data);
    setLoading(true);
    localStorage.setItem("Data from View form", data);
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("clientName", data.clientName);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("altNumber", data.altNumber);
    formData.append("address", data.address);
    formData.append("pin", data.pin);

    formData.append("followUpDate", data.followUpDate);
    formData.append("requirement", data.requirement);
    formData.append("remarks", data.remarks);
    formData.append("clientlevel", data.clientlevel);
    formData.append("electricitybill", selectedFiles?.electricitybill?.file);
    formData.append("pancard", selectedFiles?.pancard?.file);
    formData.append("adharcard", selectedFiles?.adharcard?.file);
    formData.append("taxreceipt", selectedFiles?.taxreceipt?.file);
    formData.append("state", Getstate);
    setstate(Getstate);
    formData.append("city", data.city);
    setcity(data.city);
    formData.append("contactPerson", data?.contactPersonName);
    formData.append("gst", data?.gstNumber);
    formData.append("source", data?.source);
    formData.append("otherSource", data?.otherSource);
    formData.append("dob", data?.dob);
    formData.append("kilowatts", data?.kilowatts);
    formData.append("retail", data?.retails);
    formData.append("referralName", data?.referralName);
    formData.append("retailProductName", data?.retailProductName);

    const apiUrl = import.meta.env.VITE_APP_API_URL;
    try {
      let response = await fetch(`${apiUrl}/sales/saveAndTransfer`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      });
      let Resdata = await response.json();
      console.log("Newleads from ", Resdata);
      if (Resdata.status === 200) {
        setLoading(false);
        toast({
          title: "client Registered.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // resetForm(data);
        navigate("/newleads");
      } else {
        // resetForm(data);
        setLoading(false);

        toast({
          title: Resdata.error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      alert("Error during API call:", error);
    }
  };

  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", Getstate);

  if (loading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

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
            Filling for {toggle ? "Company" : "Client"}
          </FormLabel>
          <Switch
            id="email-alerts"
            checked={toggle}
            onChange={() => {
              setToggle(!toggle);
            }}
          />
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
              <FormLabel>{toggle ? "Company" : "Client"} Name</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter name"
                control={control}
                name="clientName"
                id="clientName"
                {...register("clientName", {
                  required: "Client Name is required",
                  message: "invalid input",
                })}
              />
              {errors.clientName && (
                <Text color="red.500">{errors.clientName.message}</Text>
              )}
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
                maxLength={10} // Change maxlength to maxLength and set it to 10
                control={control}
                name="number"
                id="number"
                {...register("number", {
                  required: "Number is required",
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
            {errors.number && (
              <Text color="red.500">{errors.number.message}</Text>
            )}
          </FormControl>
        </Stack>

        {/* filling for Company */}
        {toggle && (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
            mt="1rem"
          >
            <Box>
              <FormControl>
                <FormLabel>Contact Person Name</FormLabel>
                <Input
                  placeholder="Contact Person Name"
                  marginTop={"0.2rem"}
                  type="text"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  control={control}
                  name="contactPersonName"
                  {...register("contactPersonName", {
                    message: "Name is required",
                  })}
                  // onChange={(e) => handleInputChange(e)}
                />
                {errors.contactPersonName && (
                  <Text color="red.500">
                    {errors.contactPersonName.message}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>GST Number</FormLabel>
                <Input
                  placeholder="GST Number"
                  marginTop={"0.2rem"}
                  type="text"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  control={control}
                  name="gstNumber"
                  {...register("gstNumber", {
                    message: "invalid address",
                  })}
                  // onChange={(e) => handleInputChange(e)}
                />
                {errors.gstNumber && (
                  <Text color="red.500">{errors.gstNumber.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        )}

        {/* DOB && MOBILE */}
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
                control={control}
                name="address"
                id="address"
                {...register("address", {
                  required: "address is required",
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
                // isRequired={!Getstate ? "State is Required" : ""}

                // {...register("state", {
                //   required: "state is required",
                // })}
                // name="state"
                // id="state"
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
                value={GetCity}
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

          <Box>
            <FormControl>
              <FormLabel>PIN </FormLabel>
              <NumberInput max={6}>
                <Input
                  marginTop={"0.5rem"}
                  type="text" // Use type="text" instead of type="number"
                  // pattern="[0-9]{6}" // Ensure exactly 6 digits
                  maxLength={6}
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
                  message: "Invalid date format",
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
                  required: "Requirement Role is required",
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
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  border={"1px solid #707070"}
                  control={control}
                  name="kilowatts"
                  id="kilowatts"
                  {...register("kilowatts", {
                    required: "kilowatts is required for Project",
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
                  required: "Scale of Order is required",
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
                min={getCurrentDate()} // Set the minimum date
                control={control}
                name="remarks"
                id="remarks"
                {...register("remarks", {
                  required: "Customer Requirements is required",
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
                  required: "source Role is required",
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
                      // Add necessary props, such as onChange and value
                      {...register("referralName", {
                        required: "Refferal Name is required for referral",
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
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    backgroundColor="gray.100"
                    placeholder="enter other source"
                    control={control}
                    name="otherSource"
                    id="otherSource"
                    // Add necessary props, such as onChange and value
                    {...register("otherSource", {
                      required: "otherSource is required for referral",
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
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="Enter Name"
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
              >
                Choose File
              </Button>
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
                    src={URL.createObjectURL(
                      selectedFiles?.electricitybill?.file
                    )}
                    alt="electricitybill Card Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(
                          selectedFiles.electricitybill?.file
                        ),
                        "_blank"
                      );
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
              {selectedFiles.pancard && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.pancard?.name}
                  </Text>
                  {console.log("pancard File", selectedFiles?.pancard?.file)}
                  <Image
                    // src={selectedFiles.adharcard.file}
                    src={URL.createObjectURL(selectedFiles?.pancard?.file)}
                    alt="pancard  Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(selectedFiles.pancard?.file),
                        "_blank"
                      );
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
              >
                Choose File
              </Button>
              {selectedFiles.adharcard && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.adharcard?.name}
                  </Text>
                  {console.log(
                    "Adharcard File",
                    selectedFiles?.adharcard?.file
                  )}
                  <Image
                    // src={selectedFiles.adharcard.file}
                    src={URL.createObjectURL(selectedFiles?.adharcard?.file)}
                    alt="Aadhar Card Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(selectedFiles?.adharcard?.file),
                        "_blank"
                      );
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
              >
                Choose File
              </Button>
              {selectedFiles.taxreceipt && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.taxreceipt?.name}
                  </Text>
                  {console.log(
                    "taxreceipt File",
                    selectedFiles?.taxreceipt?.file
                  )}
                  <Image
                    // src={selectedFiles.adharcard.file}
                    src={URL.createObjectURL(selectedFiles?.taxreceipt?.file)}
                    alt="taxreceipt Card Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(selectedFiles.taxreceipt?.file),
                        "_blank"
                      );
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

        {/* Submit Buttons*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          {/* <Link to="/workorder/WorkOrderform"> */}
          <Button
            bg="orange"
            boxShadow="dark-lg"
            color="black"
            px="4"
            ms="2"
            fontSize="1rem"
            onClick={handleSubmit(workorderbutton)}
          >
            Work Order
          </Button>
          {/* </Link> */}
          <Button
            bg="orange"
            boxShadow="dark-lg"
            color="black"
            px="4"
            ms="2"
            fontSize="1rem"
            onClick={handleSubmit(saveAndTransfer)}
          >
            Submit & Transfer to Head
          </Button>
          <Button
            bg="orange"
            boxShadow="dark-lg"
            color="black"
            px="4"
            ms="2"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Stack>
      </Flex>
    </>
  );
}

export default NewLeadsform;
