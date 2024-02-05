import React, { useState, useEffect } from "react";
import {
  Switch,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Flex,
  Box,
  Button,
  ButtonGroup,
  NumberInput,
  Stack,
  useToast,
  Text,
  Select,
  Checkbox,
  InputGroup,
  InputLeftAddon,
  CheckboxGroup,
  border,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { green } from "@mui/material/colors";
import { get, useForm } from "react-hook-form";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx";
import { Country, State, City } from "country-state-city";

// const states = State.getStatesOfCountry("IN");
// const cities = City.getCitiesOfState("IN", Getstate);
const ClientInformation = () => {
  const { state, updateFormData, clearFormData } = useWorkForm();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value); // Corrected console.log
    const { name, value } = e.target;
    updateFormData("clientInformation", {
      ...state.clientInformation,
      [name]: value,
    });
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
  const [projectkw, setprojectkw] = useState();
  const [retails, setRetails] = useState("");
  const [workorderdatanullcheck, setWorkordernullcheck] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    // state: { workorderdata, myleadsdetailsworkorder },
    state: { workorderdata, useData },
  } = useLocation();
  console.log("Line 73", useData);
  console.log("Line 74", workorderdata);

  // setting data to context
  if (useData != null || useData != undefined) {
    localStorage.setItem("workorderdata", JSON.stringify(useData));
    console.log("Set to local");
  }
  // console.log("Line 73", workorderdata);
  // setWorkordernullcheck(workorderdata);
  // console.log("From Addleads data", workorderdata);
  // if (workorderdata != null) {
  //   setWorkordernullcheck(workorderdata);
  // }
  useEffect(() => {
    const combinedData = [];

    if (Array.isArray(workorderdata)) {
      combinedData.push(...workorderdata);
    } else if (workorderdata !== null && typeof workorderdata === "object") {
      combinedData.push(workorderdata);
    }

    if (Array.isArray(useData)) {
      combinedData.push(...useData?.lead);
    } else if (useData !== null && typeof useData === "object") {
      combinedData.push(useData?.lead);
    }
    console.log("Line 96", combinedData);

    setWorkordernullcheck(combinedData);
  }, [workorderdata, useData]);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const toast = useToast();
  const [toggle, setToggle] = useState(false);

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // customer id from
  const { customerId } = useParams();
  // logic to set value of client name to contact Person Name
  const watchSameAsAbove = watch("sameAsAbove");
  const clientNameValue = watch("clientName");
  const contactNumberForDispatch = watch("contactNumber");
  // const consumerNumberValue = watch("consumerNumber");
  const consumerNumberValue = watch("contactNumber");
  // const billingAddressValue = watch("billingAdd");
  const billingAddressValue = watch("address");
  const [Getstate, setstate] = useState();
  const [Getcity, setcity] = useState();
  const states = State.getStatesOfCountry("IN");
  // if (workorderdata !== null || workorderdata !== undefined) {
  // const cities = City.getCitiesOfState("IN", workorderdata?.state);
  // }

  const cities = City.getCitiesOfState("IN", Getstate);
  // console.log("cities", cities);

  useEffect(() => {
    const clientInformationData = state.clientInformation;
    console.log("clientInformnation", clientInformationData);
    if (watchSameAsAbove) {
      setValue("contactPersonNameInst", clientNameValue);
      // setValue("contactNumber", consumerNumberValue);
      // setValue("contactNumber", consumerNumberValue);
      setValue("contactNumberForDispatch", contactNumberForDispatch);

      setValue("deliveryAdd", billingAddressValue);
      // setValue("deliveryAdd", billingAddressValue);

      // Update context with the new values when sameAsAbove is true
      updateFormData("clientInformation", {
        ...clientInformationData,
        contactPersonNameInst: clientNameValue,

        contactNumberForDispatch: contactNumberForDispatch,

        deliveryAdd: billingAddressValue,
      });
    }
  }, [watchSameAsAbove, setValue]);

  useEffect(
    () => {
      console.log("Context data:", state);
      const clientInformationData = state.clientInformation;
      console.log(clientInformationData);
      console.log("Line 178", workorderdatanullcheck);

      if (
        workorderdatanullcheck.length > 0 ||
        workorderdatanullcheck !== null ||
        workorderdatanullcheck !== undefined
      ) {
        console.log(workorderdatanullcheck[0]);
        setValue("clientName", workorderdatanullcheck[0]?.clientName);

        setValue(
          "contactPersonName",
          workorderdatanullcheck[0]?.contactPersonName
        );
        console.log("Line 170 Clent Info", workorderdatanullcheck);
        setValue("contactNumber", workorderdatanullcheck[0]?.number);
        setValue("number", workorderdatanullcheck[0]?.number);
        setValue("address", workorderdatanullcheck[0]?.address);
        // setValue("city", workorderdatanullcheck[0]?.city);
        // setcity(workorderdatanullcheck[0]?.city);
        console.log(workorderdatanullcheck[0]?.clientType);
        setValue("clientType", workorderdatanullcheck[0]?.clientType);

        setValue("orderType", workorderdatanullcheck[0]?.requirement);
        setValue("kilowatts", workorderdatanullcheck[0]?.kilowatts);
        setprojectkw(workorderdatanullcheck[0]?.kilowatts);
        setValue(
          "retailProductName",
          workorderdatanullcheck[0]?.retailProductName
        );
        setRetails(workorderdatanullcheck[0]?.retailProductName);
        console.log(
          "Setretails data",
          workorderdatanullcheck[0]?.retailProductName
        );
        setValue(
          "retailProductQuantity",
          workorderdatanullcheck[0]?.retailProductQuantity
        );

        setValue("scaleOfOrder", workorderdatanullcheck[0]?.clientlevel);

        setValue("clientStatus", workorderdatanullcheck[0]?.clientStatus);
        setValue("clientSource", workorderdatanullcheck[0]?.clientSource);
        setValue("remarks", workorderdatanullcheck[0]?.remarks);
        setValue("projectKeyword", workorderdatanullcheck[0]?.projectKeyword);
        setValue("consumerNumber", workorderdatanullcheck[0]?.consumerNumber);
        setValue("gstNumber", workorderdatanullcheck[0]?.gstNumber);
        setValue("state", workorderdatanullcheck[0]?.state);
        console.log("Workorder state", workorderdatanullcheck[0]?.state);
        setstate(workorderdatanullcheck[0]?.state);
        console.log(Getstate);
        setValue("city", workorderdatanullcheck[0]?.city);

        setcity(workorderdatanullcheck[0]?.city);
        console.log("Workorder city", workorderdatanullcheck[0]?.city);
        // console.log("Workorder city", city);
        console.log(Getcity);

        setValue("pin", workorderdatanullcheck[0]?.pin);

        setValue("source", workorderdatanullcheck[0]?.source);
        setValue("otherSource", workorderdatanullcheck[0]?.otherSource);
        setValue("dob", workorderdatanullcheck[0]?.dob);
        setValue("companyName", workorderdatanullcheck[0]?.companyName);
        setValue("companyAddress", workorderdatanullcheck[0]?.companyAddress);
        setValue(
          "contactPersonName",
          workorderdatanullcheck[0]?.contactPersonName
        );
        setValue("altNumber", workorderdatanullcheck[0]?.altNumber);
        setValue("category", workorderdatanullcheck[0]?.category);
        setValue("billingAdd", workorderdatanullcheck[0]?.billingAdd);
        setValue(
          "billingUnitNumber",
          workorderdatanullcheck[0]?.billingUnitNumber
        );
        console.log("Emaild ID", workorderdatanullcheck[0]?.email);
        setValue("emailID", workorderdatanullcheck[0]?.email);
        setValue("consumerNumber", workorderdatanullcheck[0]?.consumerNumber);
        setValue("clientBookBy", workorderdatanullcheck[0]?.clientBookBy);
        setValue("deliveryAdd", workorderdatanullcheck[0]?.deliveryAdd);
        console.log("referralName", workorderdatanullcheck[0]?.referralName);
        setValue("referralName", workorderdatanullcheck[0]?.referralName);
        // setValue("contactNumber", workorderdata?.contactNumber);
        setValue(
          "contactPersonNameInst",
          workorderdatanullcheck[0]?.contactPersonNameInst
        );
        setValue(
          "transportationDetails",
          workorderdatanullcheck[0]?.transportationDetails
        );
        setValue("anyAddRemark", workorderdatanullcheck[0]?.anyAddRemark);
      }
    },

    [setValue, workorderdatanullcheck]
    // [setValue, state]
  );

  // watchSameAsAbove ? setValue("contactPersonName")
  const submitHandler = async (data) => {
    const token = localStorage.getItem("token");
    console.log(data, ">>>>>>>>>");
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/setClientInfo`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Move Content-Type inside headers
          },
        }
      );
      console.log("!!!!!!!!!!!!", response);
      console.log("Resonse", response?.data?.newclientInfo?._id);
      localStorage.setItem("client_id", response?.data?.newclientInfo?._id);
      if (response?.data?.status === 200) {
        setLoading(false);
        toast({
          title: "Client Details Added Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // resetForm(data);
        // navigate("/login");
        // clientID saving in local storage
        const client_id = response.data?.newclientInfo?._id;
        localStorage.setItem("client_id", client_id);
        // navigate("");
        // <Link to="/Documents" />;
      } else if (response?.data?.status === 409) {
        setLoading(false);
        toast({
          title: "Email Already Exist",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        resetForm(data);
        setLoading(false);

        toast({
          title: response?.data?.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.log("!!!>>>", err);
      setLoading(false);
      toast({
        title: `${err.response.data.error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // reset form function
  const resetForm = (data) => {
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, "");
    });
  };

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
    <Box>
      {/* <h1>Client Information</h1> */}
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Filling for {toggle ? "company" : "client"}
        </FormLabel>
        <Switch
          id="email-alerts"
          checked={toggle}
          onChange={() => {
            setToggle(!toggle);
          }}
        />
      </FormControl>

      {/* Form Started */}
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="start"
        gap="5"
        mt={5}
      >
        {/* client name and Category */}
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
                marginTop={"0.2rem"}
                placeholder={toggle ? "Company Name" : "Client Name"}
                // backgroundColor="gray.100"
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                border={"1px solid #707070"}
                control={control}
                name="clientName"
                id="clientName"
                {...register("clientName", {
                  required: `${toggle ? "Company" : "Client"} Name is required`,
                  message: "Invalid Inputs",
                })}
                onChange={(e) => handleInputChange(e)}
                _focus={{ border: "1px solid blue" }}
              />
              {/* {errors[toggle ? "companyName" : "clientName"] && (
                <Text color="red.500">
                  {errors[toggle ? "companyName" : "clientName"].message}
                </Text>
              )} */}
              {errors.clientName && (
                <Text color="red.500">{errors.clientName.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
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
                  // backgroundColor="gray.100"
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
          </Box>
        </Stack>

        {/* Billing Address and Email ID */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Email Id</FormLabel>
              <Input
                placeholder="Email Id"
                marginTop={"0.2rem"}
                type="email"
                isRequired
                width={{ base: "120%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                border={"1px solid #707070"}
                control={control}
                name="emailID"
                {...register("emailID", {
                  required: "Email Id is required",
                  message: "invalid address",
                })}
                onChange={(e) => handleInputChange(e)}
              />
              {errors.emailID && (
                <Text color="red.500">{errors.emailID.message}</Text>
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
                  // backgroundColor="gray.100"
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

        {/* Billing Address  */}

        {/* contact person name and gst number */}
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
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="contactPersonName"
                  {...register("contactPersonName", {
                    message: "invalid address",
                  })}
                  onChange={(e) => handleInputChange(e)}
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
                  type="Number"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="gstNumber"
                  {...register("gstNumber", {
                    message: "invalid address",
                  })}
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.gstNumber && (
                  <Text color="red.500">{errors.gstNumber.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        )}

        {/* Billing Unit and Consumer number */}
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
                isRequired
                {...register("state", {
                  required: "state is required",
                })}
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

        {/* Client Book By */}
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
              {console.log("Getstate", Getstate, "Getcity", Getcity)}
              <Select
                onChange={(e) => {
                  setcity(e.target.value);
                  // setcity(Getcity);
                }}
                value={Getcity}
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Select city"
                isRequired
                {...register("city", {
                  required: "city is required",
                })}
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
                    // validate: (value) => {
                    //   // validate if it is not an number
                    //   if (isNaN(value)) {
                    //     return "Invalid number format";
                    //   }
                    // },
                  })}
                />
              </NumberInput>

              {errors.pin && <Text color="red.500">{errors.pin.message}</Text>}
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
                name="orderType"
                id="orderType"
                onChange={(value) => {
                  handleSelectChange(value);
                  console.log("Handle Change from new leads", value);
                }}
                value={watch("orderType")}
                {...register("orderType", {
                  required: "orderType Role is required",
                  message: "invalid input",
                })}
              >
                <option value="Project">Project</option>
                <option value="Retail">Retail</option>
              </Select>

              {errors.orderType && (
                <Text color="red.500">{errors.orderType.message}</Text>
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
          {console.log(projectkw, "$%^%*#^%$&**(")}
          <Box>
            {projectkw && (
              // &&
              // watch("requirement") === "Project"
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
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            {console.log(retails !== undefined && retails !== null, "1004")}
            {/* {retails && watch("requirement") === "Retail" && ( */}
            {retails !== "" && (
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
                  // value={watch("retailProductName")}
                  value={retails}
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
                name="scaleOfOrder"
                id="scaleOfOrder"
                onChange={(e) => handleSelectChange(e.target.value)}
                value={watch("scaleOfOrder")}
                {...register("scaleOfOrder", {
                  required: "scaleOfOrder Role is required",
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
                  required: "remarks is required",
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
                  <option value={item}>{item}</option>
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
                    <FormLabel>Refferal Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter name"
                      // Add necessary props, such as onChange and value
                      {...register("referralName", {
                        required: "Name is required for referral",
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

          {watch("source") === "Refferal" && (
            <Box>
              <FormControl isRequired>
                <FormLabel>Refferal Name</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  type="text"
                  isRequired
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
          )}
        </Stack>

        {/* Conditionally render Specify other Source based on the selected value */}

        {/* Display installation service */}
        <Text fontSize={17} color={"#808080"}>
          DISPATCH/INSTALLATION/SERVICE
        </Text>

        {/* check box */}
        <Checkbox
          color="green.800"
          // value={watch("sameAsAbove")}
          {...register("sameAsAbove")}
        >
          Same as Above
        </Checkbox>

        {/* Delivery Address and Contact Number */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Delivery Address</FormLabel>
              <Input
                placeholder="Delivery Address"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="deliveryAdd"
                id-="deiveryAdd"
                {...register("deliveryAdd", {
                  // required: "Delivery Address is required",
                  message: "invalid city",
                })}
                onChange={(e) => handleInputChange(e)}
              />
              {errors.deliveryAdd && (
                <Text color="red.500">{errors.deliveryAdd.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                placeholder="Contact Number"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="contactNumberForDispatch"
                id="contactNumberForDispatch"
                {...register("contactNumberForDispatch", {
                  // required: "Contact Number is required",
                  message: "invalid Field",
                })}
                onChange={(e) => handleInputChange(e)}
              />
              {errors.contactNumberForDispatch && (
                <Text color="red.500">
                  {errors.contactNumberForDispatch.message}
                </Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Contact Person and Transportation details */}
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
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                isRequired={false}
                // name="contactPerson"
                name="contactPersonNameInst"
                {...register("contactPersonNameInst", {
                  message: "invalid Fields",
                })}
                onChange={(e) => handleInputChange(e)}
              />
              {errors.contactPersonNameInst && (
                <Text color="red.500">
                  {errors.contactPersonNameInst.message}
                </Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Transportation Detail</FormLabel>
              <Input
                placeholder="Transportation Detail"
                marginTop={"0.2rem"}
                type="text"
                isRequired={false}
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="transportationDetails"
                {...register("transportationDetails", {
                  message: "invalid Fields",
                })}
                onChange={(e) => handleInputChange(e)}
              />
              {errors.transportationDetails && (
                <Text color="red.500">
                  {errors.transportationDetails.message}
                </Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Any Additional Details */}
        {/* <Stack
            // direction={{ base: "column", md: "row" }}
            // spacing={6}
            alignItems="center"
            mx="1rem"
            mt="1rem"

          > */}
        <Box mx="1rem" mt="1rem" width={"80%"}>
          <FormControl>
            <FormLabel>Any Additional Remark:</FormLabel>
            <Input
              placeholder="N/A"
              marginTop={"0.2rem"}
              type="text"
              isRequired={false}
              width={{ base: "110%", md: "400px" }}
              height={"40px"}
              border={"1px solid #707070"}
              control={control}
              name="anyAddRemark"
              {...register("anyAddRemark", {
                message: "invalid city",
              })}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.anyAddRemark && (
              <Text color="red.500">{errors.anyAddRemark.message}</Text>
            )}
          </FormControl>
        </Box>
        {/* </Stack> */}

        {/* save payment */}
        <Button
          backgroundColor={"#FF9130"}
          color={"#ffffff"}
          colorScheme="teal"
          ml={"15px"}
          mt={"10px"}
          onClick={handleSubmit(submitHandler)}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default ClientInformation;
