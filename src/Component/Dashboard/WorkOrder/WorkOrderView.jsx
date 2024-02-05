import React, { useState, useEffect } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Spacer,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
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
  CheckboxGroup,
  Textarea,
  border,
  Center,
} from "@chakra-ui/react";

import { green } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import {
  NavLink,
  useNavigate,
  useParams,
  useLocation,
  Form,
} from "react-router-dom";
import axios from "axios";
import { State, City } from "country-state-city";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
const apiUrl = import.meta.env.VITE_APP_API_URL;

function WorkOrderView() {
  const location = useLocation();
  const workOrderData = location?.state;
  console.log(workOrderData);
  //   console.log(workOrderData);
  const [allData, setAllData] = useState();
  const [plantData, setPlantData] = useState();
  //   console.log(plantData,'plantData');
  const [commercial, setCommercial] = useState();
  console.log(commercial, "commercial");

  const [commercialTotal, setCommercialTotal] = useState();
  console.log(commercialTotal, "commercialTotal");
  const [liasoning, setLiasoning] = useState();
  const [payments, setPayments] = useState([
    {
      installment: "",
      projectCost: "",
      paymentMode: "",
      paymentDate: "",
      percentage: "",
    },
  ]);
  console.log(payments, "ine 50 payments");
  const [Getstate, setstate] = useState();
  const [Getcity, setcity] = useState();

  const states = State.getStatesOfCountry("IN");
  const [projectkw, setprojectkw] = useState(true);
  const [retails, setRetails] = useState(true);
  const [workorderdetails, setworkorderdetails] = useState();
  const [plantdetails, setPlantDetails] = useState();
  const [commercialdetailss, setcommercialdetials] = useState();
  const [liasiningdetails, setliaseaning] = useState();
  const [paymentdetails, setpaymentdetails] = useState();
  const [documentdetails, setdocumtntsdetails] = useState();

  const [installmentamount, setinstallmentamount] = useState(0);
  const [remaningamount, setremaningamount] = useState(0);
  const [projectcoast, setprojectcoast] = useState(0);
  const [paymentCount, setPaymentCount] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const [newpayment, setNewPayment] = useState();

  const addNewPayment = () => {
    setPaymentCount((prevCount) => prevCount + 1);
  };

  // Payment
  const [projectCost, setProjectCost] = useState();
  const [installmentAmount, setInstallmentAmount] = useState();
  const [remainingBalance, setRemainingBalance] = useState();
  const [installmentError, setInstallmentError] = useState("");

  const handleProjectCostChange = (e) => {
    setProjectCost(e.target.value);
  };

  const remaningamountfunction = () => {
    setRemainingBalance((prevRemainingBalance) => {
      const parsedProjectCoast = parseFloat(projectCost);
      const parsedInstallmentAmount = parseFloat(installmentAmount);

      if (!isNaN(parsedProjectCoast) && !isNaN(parsedInstallmentAmount)) {
        if (parsedInstallmentAmount <= parsedProjectCoast) {
          const newRemainingAmount =
            parsedProjectCoast - parsedInstallmentAmount;
          if (newRemainingAmount >= 0) {
            return newRemainingAmount;
          } else {
            console.error("Installment amount is greater than project cost");
            setInstallmentError(
              "Installment amount cannot be greater than project cost"
            );
            return parsedProjectCoast;
          }
        } else {
          console.error("Installment amount is greater than project cost");
          setInstallmentError(
            "Installment amount cannot be greater than project cost"
          );
          return parsedProjectCoast;
        }
      } else {
        console.error("Invalid project cost or installment amount");
        setInstallmentError("Invalid project cost or installment amount");
        return parsedProjectCoast;
      }
    });
  };
  const handleInstallmentAmountChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue);

    if (numericValue <= projectCost) {
      setInstallmentAmount(numericValue);
      setInstallmentError("");
    } else {
      setInstallmentError(
        "Installment amount cannot be greater than project cost"
      );
    }
  };

  {
    console.log(commercialdetailss);
  }

  useEffect(() => {
    remaningamountfunction();
  }, [projectCost, installmentAmount]);

  const submitHandlerPayment = async (data) => {
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    console.log(data);
    const formdata = getValues();
    console.log("Form data in payment hanlder", formdata);

    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/addPaymentDetails/${client_id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Move Content-Type inside headers
          },
        }
      );
      console.log(response);
      if (response?.data?.status === 200) {
        toast({
          title: "Payment Details Added Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        // resetForm(data);

        toast({
          title: response?.data?.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // if (workorderdata !== null || workorderdata !== undefined) {
  // const cities = City.getCitiesOfState("IN", workorderdata?.state);
  // }
  const cities = City.getCitiesOfState("IN", Getstate);
  // form
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const PaymentModes = ["Cash", "Cheque", "UPI"];

  const navigate = useNavigate();
  const toast = useToast();
  const [toggle, setToggle] = useState(false);

  const ListSourceorLead = [
    "Marketing",
    "Refferal",
    "Facebook ",
    "Instagram",
    "Linkedin",
    "Our Website",
    "Other",
  ];

  const handleAddInstallement = async () => {
    try {
      const token = localStorage.getItem("token");

      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const res = await axios.post(
        `{apiUrl}/workOrder/addPaymentDetails/${clientid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleAddInstallements = () => {
    setPayments([
      ...payments,
      {
        installment: "",
        projectCost: "",
        paymentMode: "",
        paymentDate: "",
        percentage: "",
      },
    ]);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Commercial
  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        productDetails: {
          product: "",
          spvCapacity: "",
          unitPrice: "",
          amount: "",
          description: "",
        },
      },
    ]);
  };

  const submitHandlerCommercial = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/addCommercialDetails/${client_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Move Content-Type inside headers
          },
        }
      );
      console.log(response);
      if (response?.data?.status === 200) {
        toast({
          title: "Commercial Details Added Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: response?.data?.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // also needs to upload the data to context
  const getclientworkorderDetails = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    try {
      console.log(workOrderData?._id);
      let res = await axios.get(
        `${apiUrl}/workOrder/get_client_work_details/${workOrderData?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res, "+++++");

      if (res.status === 200) {
        setworkorderdetails(res?.data?.orders?.clientInfo[0]);
        console.log(res?.data?.orders?.clientInfo[0]);
        console.log(res?.data?.orders);
        setdocumtntsdetails(res?.data?.orders?.documents[0]);
        setPlantDetails(res?.data?.orders?.plantDetails[0]);
        console.log("Plant", res?.data?.orders?.plantDetails[0]);
        setcommercialdetials(res?.data?.orders?.commercialDetails);
        console.log("commerciasl", res?.data?.orders?.commercialDetails);
        setliaseaning(res?.data?.orders?.liasoningDetails[0]);
        console.log("liasoning", res?.data?.orders?.liasoningDetails);
        // console.log("Line 137 >>>>>", res.data.orders.liasoningInfo[0]);
        setpaymentdetails(res?.data?.orders?.paymentsDetails);
        console.log("payment", res?.data?.orders?.paymentsDetails);
        console.log(paymentdetails);
        console.log(payment?.projectCost, "projectcoast");
        setremaningamount(parseFloat(paymentdetails[0]?.projectCost));
        // payment?.projectCost;
        setprojectcoast(parseFloat(paymentdetails[0]?.projectCost));

        localStorage.setItem(
          "client_id",
          res?.data?.orders?.clientInfo[0]?._id
        );
        console.log(
          "Client Id before setting to locals",
          res?.data?.orders?.clientInfo[0]?._id
        );
        localStorage.setItem("ClientId", res?.data?.orders?.clientInfo[0]?._id);

        // console.log(paymentdetails[0]?.projectCost);
        // console.log("Payment ", paymentdetails);
        // setprojectcoast(parseFloat(paymentdetails?.projectCost));

        setdocumtntsdetails(res?.data?.orders?.documents[0]);
        console.log("documents", res?.data?.orders?.documents[0]);
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
      console.error(error.message);
    }
  };
  const clientid = localStorage.getItem("clientid");
  useEffect(
    () => {
      getclientworkorderDetails();
    },
    []
    // [
    //   setpaymentdetails,
    //   setcommercialdetials,
    //   setliaseaning,
    //   setdocumtntsdetails,
    //   setPlantDetails,
    //   setworkorderdetails,
    // ]
  );
  console.log("Documentts", documentdetails);
  useEffect(() => {
    // console.log("WorkOrder data:", workOrderData);
    const clientInformationData = workOrderData?.clientInformation;
    console.log(workOrderData);
    setValue("clientName", workorderdetails?.clientName);
    console.log(workorderdetails?.clientName);
    setValue("category", workorderdetails?.requirement);
    setValue("billingAdd", workorderdetails?.address);
    setValue("altNumber", workorderdetails?.altNumber);
    setValue("billingUnitNumber", workorderdetails?.billingUnitNumber);
    setValue("emailID", workorderdetails?.emailID);
    setValue("consumerNumber", workorderdetails?.contactNumber);
    setValue("clientBookBy", workorderdetails?.clientBookBy);
    setValue("deliveryAdd", workorderdetails?.deliveryAdd);
    setValue("contactNumber", workorderdetails?.contactNumber);
    setValue("contactPersonNameInst", workorderdetails?.contactPersonNameInst);
    setValue("transportationDetails", workorderdetails?.transportationDetails);
    setValue("anyAddRemark", workorderdetails?.anyAddRemark);
    setValue("address", workorderdetails?.address);
    setValue("state", workorderdetails?.state);
    setstate(workorderdetails?.state);
    setValue("city", workorderdetails?.city);
    console.log(workorderdetails?.city);
    setcity(workorderdetails?.city);
    setValue("pin", workorderdetails?.pin);
    setValue("retailProductName", workorderdetails?.retailProductName);
    setValue(
      "contactNumberForDispatch",
      workorderdetails?.contactNumberForDispatch
    );
    setValue("contactPersonName", workorderdetails?.contactPersonName);
    setValue("transportationDetails", workorderdetails?.transportationDetails);
    setValue("anyAddRemark", workorderdetails?.anyAddRemark);

    // requirement
    console.log(workorderdetails);
    setValue("requirement", workorderdetails?.orderType);
    setValue("kilowatts", workorderdetails?.kilowatts);
    setValue("source", workorderdetails?.source);
    setValue("clientlevel", workorderdetails?.scaleOfOrder);
    setValue("remarks", workorderdetails?.remarks);
    setValue("dob", workorderdetails?.dob);

    //plant details page
    setValue("panelMake", plantdetails?.panelMake);
    console.log("Plant Data from workorder", plantdetails);
    setValue("panelRemark", plantdetails?.panelRemarks);
    setValue("inverterMake", plantdetails?.inverterMake);
    setValue("inverterRemark", plantdetails?.inverterRemarks);
    setValue("structureHeight", plantdetails?.structureHeight);
    setValue("structureRemarks", plantdetails?.structureRemark);
    setValue("meterHeight", plantdetails?.meterHeight);
    setValue("meterRemark", plantdetails?.meterRemark);
    setValue("subsidy", plantdetails?.subsidy);
    //liasoning data

    // documtnts
    console.log(documentdetails);
    setValue("panCard", documentdetails?.panCard);
    setValue("aadharCard", documentdetails?.aadharCard);
    setValue("electricityBill", documentdetails?.electricityBill);
    setValue("landPaper", documentdetails?.landPaper);
    setValue("tax", documentdetails?.tax);
    setValue("noc", documentdetails?.noc);
    setValue("other", documentdetails?.other);

    console.log(liasiningdetails?.existingName);
    setValue("existingName", liasiningdetails?.existingName);
    setValue("newName", liasiningdetails?.newName);
    setValue("existingLoad", liasiningdetails?.existingLoad);
    setValue("newLoad", liasiningdetails?.newLoad);
    setValue("existingMeterType", liasiningdetails?.existingMeterType);
    setValue("newMeterType", liasiningdetails?.newMeterType);
    //for commercial
    // setValue("product", commercial[0].productDetails[0]?.product);
    // setValue("spvCapacity", commercial[0].productDetails[0].spvCapacity);
    // setValue(`products[${index}].productDetails.spvCapacity`, commercial[0].productDetails[0].spvCapacity);
    // console.log(commercialTotal[0].billAmt)
    // setValue("billAmount", commercialTotal[0].billAmt);
    // setValue("meterCharges", commercialTotal[0].meterCharges);
    // setValue("otherCharges", commercialTotal[0].otherCharges);
    // setValue("totalCost", commercialTotal[0].totalCost);
    // payment details
    console.log("Payment Details 140", paymentdetails);
    console.log("Payment", paymentdetails?.paymentMode);
    setValue("installment", paymentdetails?.installment);
    setValue("paymentDate", paymentdetails?.paymentDate);
    setValue("paymentMode", paymentdetails?.paymentMode);
    setValue("projectCost", paymentdetails?.projectCost);
    setValue("remainingBalance", paymentdetails?.remainingBalance);
    setprojectcoast(parseFloat(paymentdetails?.projectCost));
  }, [
    setValue,
    plantData,
    liasoning,
    commercial,
    setworkorderdetails,
    setPlantDetails,
    setcommercialdetials,
    setliaseaning,
    setpaymentdetails,
    setdocumtntsdetails,
  ]);

  const fetchClientOrderDetails = async () => {
    const token = localStorage.getItem("token");

    const customerId = workOrderData?._id;
    try {
      let response = await fetch(
        `${apiUrl}/workOrder/get_client_work_details/${customerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let Resdata = await response.json();
      console.log("$$$", Resdata);
      // console.log("WorkOrderViewData ->->->-.>", Resdata);

      setAllData(Resdata?.orders?.documents[0]);
      console.log(" from workorder", allData);
      setPlantData(Resdata?.orders?.plantDetails[0]);
      setLiasoning(Resdata?.orders?.liasoningDetails[0]);
      setCommercial(Resdata?.orders?.commercialDetails[0]);
      setCommercialTotal(Resdata?.orders?.commercialDetails[1]);
      setPayments(Resdata?.orders?.paymentsDetails[0]);

      console.log("Playments from WorkOrderView ", payments);
      if (Resdata.status === 200) {
        toast({
          title: "Customer Information fetched",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: Resdata.msg || "something wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching other information",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // api calling 2 times

  useEffect(() => {
    fetchClientOrderDetails();
    console.log("Fetchclient ordered Called");
  }, [setAllData]);

  //liasoning Page  flag for showing and hiding fields
  const watchRequirement = watch("requirement") === "Yes" ? true : false;
  const watchLoad = watch("load") === "Yes" ? true : false;
  const watchMeter = watch("meter") === "Yes" ? true : false;

  // for products page
  const [products, setProducts] = useState([
    {
      productDetails: {
        product: "",
        spvCapacity: "",
        unitPrice: "",
        amount: "",
        description: "",
      },
    },
  ]);

  // for payment page
  const [payment, setPayment] = useState([
    {
      installment: "",
      projectCost: "",
      paymentMode: "",
      paymentDate: "",
      percentage: "",
    },
  ]);

  const totalTabs = 6;
  const handleTabChange = (index) => {
    console.log("Index", index);
    setActiveTab(index);
  };
  const handleNextButtonClick = (index) => {
    // Move to the next tab
    handleTabChange(index);
    // setActiveTab((prevTab) => prevTab + 1);
    console.log("Active Tab", activeTab);
  };

  // name-change
  console.log("&&&&", workorderdetails);

  const handleNameChange = async () => {
    const formdata = getValues();
    console.log(formdata.clientName, formdata, "***");

    try {
      const token = localStorage.getItem("token");
      const clientId = workorderdetails?._id;
      const clientname = formdata?.clientName;

      let response = await fetch(
        `${apiUrl}/workOrder/updateClientInfo/${clientId}`,
        {
          method: "PUT",
          body: JSON.stringify({ clientName: formdata.clientName }),

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let Resdata = await response.json();
      // console.log("WorkOrderViewData ->->->-.>", Resdata);
      if (Resdata.status === 200) {
        toast({
          title: "Name changed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: Resdata.msg || "something wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Changing Client Name",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Tabs index={activeTab} isLazy>
        <TabList>
          <Tab>CLIENT INFORMATION</Tab>
          <Tab>DOCUMENTS</Tab>
          <Tab>PLANT DETAILS</Tab>
          <Tab>LIASONING DETAILS</Tab>
          <Tab>COMMERCIAL</Tab>
          <Tab>PAYMENT</Tab>
        </TabList>

        <TabPanels>
          {/* <ClientInformation Page/> */}
          <TabPanel tabIndex={activeTab}>
            <Box>
              {/* <h1>Client Information</h1> */}
              {/* <FormControl display="flex" alignItems="center">
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
              </FormControl> */}

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
                    <FormControl>
                      <FormLabel>
                        {toggle ? "Company" : "Client"} Name
                      </FormLabel>
                      <Input
                        marginTop={"0.2rem"}
                        placeholder={toggle ? "Company Name" : "Client Name"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        // background={}
                        name="clientName"
                        id="clientName"
                        // isDisabled
                        {...register("clientName", {
                          required: `${
                            toggle ? "Company" : "Client"
                          } Name is required`,
                          message: "Invalid Inputs",
                        })}
                        // onChange={(e) => handleInputChange(e)}
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
                    <Button sm mt="1" onClick={handleNameChange}>
                      Update Name
                    </Button>
                  </Box>
                  <Box>
                    <FormControl>
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
                          maxLength={10} // Change maxlength to maxLength and set it to 10
                          control={control}
                          isDisabled
                          {...register("consumerNumber", {
                            required: "Consumer Number is required",
                            pattern: {
                              value: /^[0-9]{10,}$/, // Ensure at least 10 digits
                              message: "Invalid number format",
                            },
                          })}
                          // onChange={(e) => handleInputChange(e)}
                        />
                      </InputGroup>
                      {errors.consumerNumber && (
                        <Text color="red.500">
                          {errors.consumerNumber.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  {/* <Box>
                    <FormControl isRequired>
                      <FormLabel>Category</FormLabel>
                      <Select
                        placeholder="Category"
                        marginTop={"0.5rem"}
                        isRequired={true}
                        type="text"
                        width={{ base: "100%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        // control={control}
                        name="category"
                        // value={watch("category")}
                        {...register("category", {
                          required: "Category is required",
                          message: "invalid input",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      >
                        <option value="Project">Project</option>
                        <option value="Retail">Retail</option>
                      </Select>
                      {errors.category && (
                        <Text color="red.500">{errors.category.message}</Text>
                      )}
                    </FormControl>
                  </Box> */}
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
                        isDisabled
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
                          isDisabled
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
                  {/* <Box>
                    <FormControl isRequired>
                      <FormLabel>Billing Address</FormLabel>
                      <Input
                        placeholder="Billing Address"
                        marginTop={"0.2rem"}
                        isRequired
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="billingAdd"
                        id="billingAdd"
                        {...register("billingAdd", {
                          required: "Billing Address is required",
                          message: "Invalid Inputs",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.billingAdd && (
                        <Text color="red.500">{errors.billingAdd.message}</Text>
                      )}
                    </FormControl>
                  </Box> */}
                  {/* <Box>
                    <FormControl>
                      <FormLabel>Email Id</FormLabel>
                      <Input
                        placeholder="Email Id"
                        marginTop={"0.2rem"}
                        type="email"
                        // background={"grey"}
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="emailID"
                        {...register("emailID", {
                          required: "Email is required",
                          message: "invalid address",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.emailID && (
                        <Text color="red.500">{errors.emailID.message}</Text>
                      )}
                    </FormControl>
                  </Box> */}
                </Stack>

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
                          isDisabled
                          {...register("contactPersonName", {
                            required: "GST Number is required",
                            message: "invalid address",
                          })}
                          //   onChange={(e) => handleInputChange(e)}
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
                          isDisabled
                          {...register("gstNumber", {
                            required: "GST Number is required",
                            message: "invalid address",
                          })}
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.gstNumber && (
                          <Text color="red.500">
                            {errors.gstNumber.message}
                          </Text>
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
                        isDisabled
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
                        isDisabled
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
                  {/* <Box>
                    <FormControl>
                      <FormLabel>Billing Unit Number</FormLabel>
                      <Input
                        placeholder="Billing Unit Number"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="billingUnitNumber"
                        {...register("billingUnitNumber", {
                          required: "Billing Unit Number is required",
                          message: "invalid Field",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.billingUnitNumber && (
                        <Text color="red.500">
                          {errors.billingUnitNumber.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box> */}
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
                        }}
                        value={Getcity}
                        width={{ base: "250px", md: "400px" }}
                        height={"50px"}
                        backgroundColor="gray.100"
                        placeholder="Select city"
                        isRequired
                        isDisabled
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
                  {/* <FormControl>
              <FormLabel>Client Book By</FormLabel>
              <Input
                placeholder="Client Book By"
                marginTop={"0.2rem"}
                type="text"
                isRequired={false}
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="clientBookBy"
                {...register("clientBookBy", {
                  message: "invalid field",
                })}
                onChange={(e) => handleInputChange(e)}
              />
              {errors.clientBookBy && (
                <Text color="red.500">{errors.clientBookBy.message}</Text>
              )}
            </FormControl>
          </Box> */}
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
                          isDisabled
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

                      {errors.pin && (
                        <Text color="red.500">{errors.pin.message}</Text>
                      )}
                    </FormControl>
                  </Box>
                  {/* <Box>
                    <FormControl>
                      <FormLabel>Client Book By</FormLabel>
                      <Input
                        placeholder="Client Book By"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        isRequired={false}
                        border={"1px solid #707070"}
                        control={control}
                        name="clientBookBy"
                        {...register("clientBookBy", {
                          message: "invalid field",
                        })}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {errors.clientBookBy && (
                        <Text color="red.500">Customer

                          {errors.clientBookBy.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box> */}
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
                        isDisabled
                        {...register("dob", {
                          message: "Invalid date format",
                        })}
                      />
                      {errors.dob && (
                        <Text color="red.500">{errors.dob.message}</Text>
                      )}
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
                        isDisabled
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
                        <Text color="red.500">
                          {errors.requirement.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>

                  {console.log("SetProject data ", projectkw)}

                  {/* <Input
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
              /> */}
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
                          isDisabled
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
                          isDisabled
                          onChange={(e) => handleSelectChange(e.target.value)}
                          value={watch("retailProductName")}
                          {...register("retailProductName", {
                            message: "invalid input",
                          })}
                        >
                          <option value="Solar Water Heater">
                            Solar Water Heater
                          </option>
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
                        isDisabled
                        onChange={(e) => handleSelectChange(e.target.value)}
                        value={watch("clientlevel")}
                        {...register("clientlevel", {
                          required: "clientlevel Role is required",
                          message: "invalid input",
                        })}
                      >
                        <option value="Small">Small</option>
                        <option value="Mid">Mid</option>
                        <option value="High-value">High-value</option>
                      </Select>
                      {errors.clientlevel && (
                        <Text color="red.500">
                          {errors.clientlevel.message}
                        </Text>
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
                        isDisabled
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
                        isDisabled
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
                              isDisabled
                              {...register("referralName", {
                                required: "Name is required for referral",
                                message: "invalid input",
                              })}
                            />
                            {errors.referralName && (
                              <Text color="red.500">
                                {errors.referralName.message}
                              </Text>
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
                            isDisabled
                            // Add necessary props, such as onChange and value
                            {...register("otherSource", {
                              required: "otherSource is required for referral",
                              message: "invalid input",
                            })}
                          />
                          {errors.otherSource && (
                            <Text color="red.500">
                              {errors.otherSource.message}
                            </Text>
                          )}
                        </FormControl>
                      </Box>
                      {/* </Stack> */}
                    </>
                  )}
                  {/* </Box> */}
                </Stack>
                {/* Display installation service */}
                <Text fontSize={17} color={"#808080"}>
                  DISPATCH/INSTALLATION/SERVICE
                </Text>

                {/* check box */}
                {/* <Checkbox
                  color="green.800"
                  // value={watch("sameAsAbove")}
                  {...register("sameAsAbove")}
                >
                  Same as Above
                </Checkbox> */}

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
                        isDisabled
                        {...register("deliveryAdd", {
                          required: "Delivery Address is required",
                          message: "invalid city",
                        })}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {errors.deliveryAdd && (
                        <Text color="red.500">
                          {errors.deliveryAdd.message}
                        </Text>
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
                        isDisabled
                        {...register("contactNumberForDispatch", {
                          required: "Contact Number is required",
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
                        // name="contactPerson"
                        name="contactPersonNameInst"
                        isDisabled
                        {...register("contactPersonNameInst", {
                          required: "Contact Person Name is required",
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
                        isDisabled
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
                      siRequired={false}
                      width={{ base: "110%", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="anyAddRemark"
                      isDisabled
                      {...register("anyAddRemark", {
                        message: "invalid city",
                      })}
                      //   onChange={(e) => handleInputChange(e)}
                    />
                    {errors.anyAddRemark && (
                      <Text color="red.500">{errors.anyAddRemark.message}</Text>
                    )}
                  </FormControl>
                </Box>
                {/* </Stack> */}

                {/* save payment */}
                {/* <Button
                  backgroundColor={"#FF9130"}
                  color={"#ffffff"}
                  colorScheme="teal"
                  ml={"15px"}
                  mt={"10px"}
                  //   onClick={handleSubmit(submitHandler)}
                >
                  Submit
                </Button> */}
              </Flex>
            </Box>
          </TabPanel>

          {/* <Documents Page/> */}
          <TabPanel tabIndex={activeTab}>
            <Box gap={50} mt={8}>
              {/* <form onSubmit={handleSubmit(submitForm)}> */}
              {/* Photo and aadhar Card */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="1rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Photo</FormLabel>
                    {/* Remove the file input */}
                    {/* <Input
    marginTop={"0.5rem"}
    alignItems={"center"}
    textAlign={"center"}
    justifyContent={"center"}
    width={{ base: "250px", md: "400px" }}
    type="file"
    display="none"
    height={"40px"}
    border={"1px solid #707070"}
    control={control}
    name="photo"
    id="photo"
    {...register("photo", {
      required: "Photo is required",
      message: "invalid file",
    })}
  /> */}
                    {/* Display the image preview */}
                    {console.log("From Workorder", documentdetails?.photo)}
                    {documentdetails?.photo ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.photo}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.photo);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {/* <Button
    as="label"
    htmlFor="photo"
    cursor="pointer"
    marginTop={"0.5rem"}
    width={{ base: "250px", md: "400px" }}
    height={"40px"}
    border={"1px solid #707070"}
    px={2} // Padding on the x-axis
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    Choose Photo
  </Button> */}
                    {errors.photo && (
                      <Text color="red.500">{errors.photo.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel> Aadhar Card</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      type="file"
                      display="none"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      // control={control}
                      name="aadhar"
                      id="aadhar"
                      {...register("aadhar", {
                        required: "aadhar photo  is required",
                        message: "invalid File",
                      })}
                      //   onChange={(e) => handleFileChange("aadhar", e)} // Make sure "aadhar" is the correct inputName
                    /> */}
                    {/* <Button
                      as="label"
                      htmlFor="aadhar"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose Adhaar
                    </Button> */}
                    {documentdetails?.adharcard ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.adharcard}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.adharcard);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {/* {selectedFiles.aadhar && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.aadhar.name}
                </Text>
                <Image
                  src={selectedFiles.aadhar.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.aadhar && (
                      <Text color="red.500">{errors.aadhar.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* pan and electricity bill */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="2rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Pan Card</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      isRequired
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      // control={control}
                      name="pan"
                      id="pan"
                      {...register("pan", {
                        required: "Pan card photo is required",
                        message: "invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("pan", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="pan"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    {documentdetails?.pancard ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.pancard}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.pancard);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {/* {selectedFiles.pan && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.pan.name}
                </Text>
                <Image
                  src={selectedFiles.pan.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.pan && (
                      <Text color="red.500">{errors.pan.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel> Electricity Bill</FormLabel>
                    {/* <Input
                      type="file"
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      isRequired
                      width={{ base: "250px", md: "400px" }}
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="electricity"
                      id="electricity"
                      {...register("electricity", {
                        required: "Electricity bill is required",
                        message: "Invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("electricity", e)} // Make sure "electricity" is the correct inputName
                    />
                    <Button
                      as="label"
                      htmlFor="electricity"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    {documentdetails?.electricitybill ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.electricitybill}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.electricitybill);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {/* {selectedFiles.electricity && (
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.electricity.name}
                </Text>
                <Image
                  src={selectedFiles.electricity.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.electricity && (
                      <Text color="red.500">{errors.electricity.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* Tax receipt and power of attorney */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="2rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel> Tax Receipt</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      // isRequired
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="tax"
                      id="tax" // Add an id to match the htmlFor in the label
                      {...register("tax", {
                        required: "Tax Receipt photo is required",
                        message: "Invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("tax", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="tax" // Match the id of the file input
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    {documentdetails?.taxreceipt ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.taxreceipt}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.taxreceipt);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {/* {selectedFiles.tax && (
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.tax.name}
                </Text>
                <Image
                  src={selectedFiles.tax.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.tax && (
                      <Text color="red.500">{errors.tax.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Power of Attorney</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      type="file"
                      display="none"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="attorney"
                      id="attorney" // Add an id to match the htmlFor in the label
                      {...register("attorney", {
                        required: "Power of Attorney Photo is required",
                        message: "Invalid File",
                      })}
                      //   onChange={(e) => handleFileChange("attorney", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="attorney" // Match the id of the file input
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    {/* {selectedFiles.attorney && (
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.attorney.name}
                </Text>
                <Image
                  src={selectedFiles.attorney.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {documentdetails?.powerofattorney ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.powerofattorney}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.powerofattorney);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {errors.attorney && (
                      <Text color="red.500">{errors.attorney.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* Annexure-2 and Applicatin Form*/}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="2rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Annexure-2</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="annexure"
                      id="annexure"
                      {...register("annexure", {
                        required: "Annexure photo is required",
                        message: "invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("annexure", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="annexure"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    {documentdetails?.annexure2 ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.annexure2}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.annexure2);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {/* {selectedFiles.annexure && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.annexure.name}
                </Text>
                <Image
                  src={selectedFiles.annexure.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.annexure && (
                      <Text color="red.500">{errors.annexure.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Application Form (A-1 Form)</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      type="file"
                      display="none"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="application"
                      id="application"
                      {...register("application", {
                        required: "Application form photo is required",
                        message: "invalid File",
                      })}
                      //   onChange={(e) => handleFileChange("application", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="application"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    {documentdetails?.applicationform ? (
                      <img
                        name="photo"
                        id="photo"
                        width={{ base: "250px", md: "400px" }}
                        height={"40px"}
                        src={documentdetails?.applicationform}
                        alt="Photo Preview"
                        onClick={() => {
                          window.open(documentdetails?.applicationform);
                        }}
                        style={{
                          width: "150px", // Set the width as needed
                          height: "150px", // Set the height as needed
                          borderRadius: "15px", // Set the border radius as needed
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      "Not Available"
                    )}
                    {/* {selectedFiles.application && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.application.name}
                </Text>
                <Image
                  src={selectedFiles.application.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.application && (
                      <Text color="red.500">{errors.application.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* save button */}
              {/* <Button
                backgroundColor={"#FF9130"}
                color={"#ffffff"}
                colorScheme="teal"
                ml={"15px"}
                mt={"150px"}
                // onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button> */}
            </Box>
          </TabPanel>

          {/* <PlantDetails Page/> */}
          <TabPanel tabIndex={activeTab}>
            <Box>
              {/* Form Started */}
              <Flex
                direction={{ base: "column" }}
                justify="center"
                align="start"
                gap="5"
                mt={5}
              >
                {/* Panel make and panel Remark*/}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  alignItems="center"
                  mx="1rem"
                  mt="1rem"
                >
                  <Box>
                    <FormControl>
                      <FormLabel>Panel Make</FormLabel>
                      <Input
                        //
                        placeholder="Panel Make"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="panelMake"
                        isDisabled
                        {...register("panelMake", {
                          required: "Panel Make is required",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.panelMake && (
                        <Text color="red.500">{errors.panelMake.message}</Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>
                        Panel Remarks{" "}
                        <span style={{ fontWeight: "400" }}>(if Any)</span>
                      </FormLabel>
                      <Input
                        placeholder="Panel Remarks"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        isRequired
                        control={control}
                        name="panelRemark"
                        isDisabled
                        {...register("panelRemark", {})}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.panelRemark && (
                        <Text color="red.500">
                          {errors.panelRemark.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                </Stack>

                {/*  Inverter make and inverter remark*/}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  alignItems="center"
                  mx="1rem"
                  mt="1rem"
                >
                  <Box>
                    <FormControl>
                      <FormLabel>Inverter Make</FormLabel>
                      <Input
                        placeholder="Inverter Make"
                        marginTop={"0.2rem"}
                        isRequired
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="inverterMake"
                        isDisabled
                        {...register("inverterMake", {
                          required: "Inverter Make is required",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.inverterMake && (
                        <Text color="red.500">
                          {errors.inverterMake.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>
                        Inverter Remarks{" "}
                        <span style={{ fontWeight: "400" }}>(if Any)</span>
                      </FormLabel>
                      <Input
                        placeholder="Inverter Remarks"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="inverterRemark"
                        isDisabled
                        {...register("inverterRemark", {
                          required: "Inverter Remark is required",
                          message: "invalid field",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.inverterRemark && (
                        <Text color="red.500">
                          {errors.inverterRemark.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                </Stack>

                {/* structure height and structure emark */}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  alignItems="center"
                  mx="1rem"
                  mt="1rem"
                >
                  <Box>
                    <FormControl>
                      <FormLabel> Structure Height</FormLabel>
                      <Input
                        placeholder="Panel Make"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="structureHeight"
                        isDisabled
                        {...register("structureHeight", {
                          required: "Structure Height is required",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.structureHeight && (
                        <Text color="red.500">
                          {errors.structureHeight.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>
                        Structure Remarks{" "}
                        <span style={{ fontWeight: "400" }}>(if Any)</span>
                      </FormLabel>
                      <Input
                        placeholder="Panel Remarks"
                        marginTop={"0.2rem"}
                        type="email"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="structureRemarks"
                        isDisabled
                        {...register("structureRemarks", {
                          message: "invalid address",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.structureRemarks && (
                        <Text color="red.500">
                          {errors.structureRemarks.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                </Stack>

                {/* Meter Type and Meter Remark */}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  alignItems="center"
                  mx="1rem"
                  mt="1rem"
                >
                  <Box>
                    <FormControl>
                      <FormLabel> Meter height</FormLabel>
                      <Input
                        placeholder="Meter height"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="meterHeight"
                        isDisabled
                        {...register("meterHeight", {
                          required: "Meter height is required",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.meterHeight && (
                        <Text color="red.500">
                          {errors.meterHeight.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>
                        Meter Remark{" "}
                        <span style={{ fontWeight: "400" }}>(if Any)</span>
                      </FormLabel>
                      <Input
                        placeholder="Meter Remark"
                        marginTop={"0.2rem"}
                        type="email"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="meterRemark"
                        isDisabled
                        {...register("meterRemark", {
                          required: "Meter Remark is required",
                          message: "invalid address",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.meterRemark && (
                        <Text color="red.500">
                          {errors.meterRemark.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                </Stack>

                {/* any Additional remark */}
                <Box mx="1rem" mt="1rem" width={"80%"}>
                  <FormControl>
                    <FormLabel>Subsidy</FormLabel>
                    <Input
                      placeholder="N/A"
                      marginTop={"0.2rem"}
                      type="text"
                      width={{ base: "110%", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="subsidy"
                      isDisabled
                      {...register("subsidy", {
                        required: "Subsidy is required",
                        message: "invalid subsidy",
                      })}
                      //   onChange={(e) => handleInputChange(e)}
                    />
                    {errors.subsidy && (
                      <Text color="red.500">{errors.subsidy.message}</Text>
                    )}
                  </FormControl>
                </Box>
                {/* </Stack> */}
                {/* save button */}
                {/* <Button
                  backgroundColor={"#FF9130"}
                  color={"#ffffff"}
                  colorScheme="teal"
                  ml={"15px"}
                  mt={"10px"}
                  //   onClick={handleSubmit(submitHandler)}
                >
                  Submit
                </Button> */}
              </Flex>
            </Box>
          </TabPanel>

          {/* <LiasoningDetails Page/> */}
          <TabPanel tabIndex={activeTab}>
            <Box>
              <Flex
                direction={{ base: "column" }}
                justify="center"
                align="start"
                gap="5"
                mt={1}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  mx="1rem"
                >
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={6}
                    mx="1rem"
                  >
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Existing Name</FormLabel>
                        <Input
                          placeholder="Existing Name"
                          marginTop={"0.2rem"}
                          isRequired
                          type="text"
                          width={{ base: "120%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="existingName"
                          isDisabled
                          {...register("existingName", {
                            required: "Existing Name is required",
                            message: "Invalid Input",
                          })}

                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.existingName && (
                          <Text color="red.500">
                            {errors.existingName.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>New Name</FormLabel>
                        <Input
                          placeholder="New Name"
                          marginTop={"0.2rem"}
                          type="text"
                          width={{ base: "120%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="newName"
                          isDisabled
                          {...register("newName", {
                            required: "New Name is required",
                            message: "Invalid Input",
                          })}
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.newName && (
                          <Text color="red.500">{errors.newName.message}</Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  mx="1rem"
                >
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={6}
                    mx="1rem"
                  >
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Existing Load</FormLabel>
                        <Input
                          placeholder="Existing Load"
                          marginTop={"0.2rem"}
                          isRequired
                          type="text"
                          width={{ base: "120%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="existingLoad"
                          isDisabled
                          {...register("existingLoad", {
                            required: "Existing Load is required",
                            message: "Invalid Input",
                          })}
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.existingLoad && (
                          <Text color="red.500">
                            {errors.existingLoad.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>New Load</FormLabel>
                        <Input
                          placeholder="New Load"
                          marginTop={"0.2rem"}
                          type="text"
                          width={{ base: "120%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="newLoad"
                          isDisabled
                          {...register("newLoad", {
                            required: "New Load is required",
                            message: "Invalid Input",
                          })}
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.newLoad && (
                          <Text color="red.500">{errors.newLoad.message}</Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  mx="1rem"
                >
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={6}
                    mx="1rem"
                  >
                    <Box>
                      <FormControl>
                        <FormLabel>Existing Meter Type</FormLabel>
                        <Input
                          placeholder="Existing Meter Type"
                          marginTop={"0.2rem"}
                          type="text"
                          width={{ base: "120%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="existingMeterType"
                          isDisabled
                          {...register("existingMeterType", {
                            required: "Existing Meter Type is required",
                            message: "Invalid Input",
                          })}
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.existingMeterType && (
                          <Text color="red.500">
                            {errors.existingMeterType.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>New Meter Type</FormLabel>
                        <Input
                          placeholder="New Meter Type"
                          marginTop={"0.2rem"}
                          type="text"
                          width={{ base: "120%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="newMeterType"
                          isDisabled
                          {...register("newMeterType", {
                            required: "New Meter Type is required",
                            message: "Invalid Input",
                          })}
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.newMeterType && (
                          <Text color="red.500">
                            {errors.newMeterType.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>
              </Flex>
            </Box>
          </TabPanel>

          {/* <Commercial Page/> */}
          <TabPanel tabIndex={activeTab}>
            <Box>
              <Flex
                direction={{ base: "column" }}
                justify="center"
                align="start"
                gap="5"
                mt={5}
              >
                {console.log(commercialdetailss, "commercialdetailss@#$%%%")}
                {commercialdetailss &&
                  commercialdetailss?.map((products, index) => {
                    return (
                      <>
                        <React.Fragment key={index}>
                          {products.productDetails &&
                            products?.productDetails?.map((product, index) => {
                              return (
                                <>
                                  {/* {console.log(
                                  product?.productDetails[0]?.amount,
                                  "!!!"
                                )} */}
                                  {product !== null &&
                                    product !== undefined && (
                                      <>
                                        <Box>
                                          <Stack
                                            direction={{
                                              base: "column",
                                              md: "row",
                                            }}
                                            spacing={6}
                                            alignItems="center"
                                            mx="1rem"
                                          >
                                            {console.log(product, "@@@@@@")}
                                            <Box>
                                              <FormControl>
                                                <FormLabel>Product</FormLabel>
                                                <Select
                                                  placeholder="Select option"
                                                  marginTop={"0.5rem"}
                                                  isRequired
                                                  type="text"
                                                  width={{
                                                    base: "100%",
                                                    md: "400px",
                                                  }}
                                                  height={"40px"}
                                                  border={"1px solid #707070"}
                                                  control={control}
                                                  // name={`product_${index}`}
                                                  value={product?.product}
                                                  // value={product.}
                                                  isDisabled
                                                  // {...register(
                                                  //   `products[${index}].productDetails.product`,
                                                  //   {
                                                  //     required:
                                                  //       "Product Role is required",
                                                  //     message: "invalid input",
                                                  //   }
                                                  // )}
                                                  onChange={(e) =>
                                                    handleInputChange(e)
                                                  }
                                                >
                                                  <option value="Yes">
                                                    Yes
                                                  </option>
                                                  <option value="No">No</option>
                                                </Select>
                                                {errors[
                                                  `products[${index}].productDetails.product`
                                                ] && (
                                                  <Text color="red.500">
                                                    {
                                                      errors[
                                                        `products[${index}].productDetails.product`
                                                      ].message
                                                    }
                                                  </Text>
                                                )}
                                              </FormControl>
                                            </Box>
                                            <Box>
                                              <FormControl>
                                                <FormLabel>
                                                  SPV Capacity
                                                </FormLabel>
                                                <Input
                                                  marginTop={"0.2rem"}
                                                  placeholder="Type"
                                                  type="text"
                                                  width={{
                                                    base: "120%",
                                                    md: "400px",
                                                  }}
                                                  height={"40px"}
                                                  border={"1px solid #707070"}
                                                  control={control}
                                                  isDisabled
                                                  // name={`spvCapacity_${index}`}
                                                  value={product?.spvCapacity}
                                                  // {...register(
                                                  //   `products[${index}].productDetails.spvCapacity`,
                                                  //   {
                                                  //     required:
                                                  //       "SPV Capacity is required",
                                                  //     message: "invalid input",
                                                  //   }
                                                  // )}
                                                  onChange={(e) =>
                                                    handleInputChange(e)
                                                  }
                                                />
                                                {errors[
                                                  `products[${index}].productDetails.spvCapacity`
                                                ] && (
                                                  <Text color="red.500">
                                                    {
                                                      errors[
                                                        `products[${index}].productDetails.spvCapacity`
                                                      ].message
                                                    }
                                                  </Text>
                                                )}
                                              </FormControl>
                                            </Box>
                                          </Stack>
                                          <Stack
                                            direction={{
                                              base: "column",
                                              md: "row",
                                            }}
                                            spacing={6}
                                            alignItems="center"
                                            mx="1rem"
                                            // mt="1rem"
                                          >
                                            <Box>
                                              <FormControl>
                                                <FormLabel>
                                                  Unit Price
                                                </FormLabel>
                                                <Input
                                                  placeholder="Type"
                                                  marginTop={"0.2rem"}
                                                  type="text"
                                                  width={{
                                                    base: "120%",
                                                    md: "400px",
                                                  }}
                                                  height={"40px"}
                                                  border={"1px solid #707070"}
                                                  control={control}
                                                  isDisabled
                                                  // name={`unitPrice_${index}`}
                                                  value={product?.unitPrice}
                                                  // value={watch(`products[${index}].productDetails.unitPrice`)}
                                                  // {...register(
                                                  //   `products[${index}]?.productDetails?.unitPrice`,
                                                  //   {
                                                  //     required:
                                                  //       "Unit Price is required",
                                                  //     message: "invalid input",
                                                  //   }
                                                  // )}
                                                  onChange={(e) =>
                                                    handleInputChange(e)
                                                  }
                                                />
                                                {errors[
                                                  `products[${index}]?.productDetails?.unitPrice`
                                                ] && (
                                                  <Text color="red.500">
                                                    {
                                                      errors[
                                                        `products[${index}]?.productDetails?.unitPrice`
                                                      ].message
                                                    }
                                                  </Text>
                                                )}
                                              </FormControl>
                                            </Box>
                                            <Box>
                                              <FormControl isRequired>
                                                <FormLabel>Amount</FormLabel>
                                                <Input
                                                  placeholder="Amount"
                                                  marginTop={"0.2rem"}
                                                  type="number"
                                                  width={{
                                                    base: "120%",
                                                    md: "400px",
                                                  }}
                                                  height={"40px"}
                                                  border={"1px solid #707070"}
                                                  isRequired
                                                  isDisabled
                                                  control={control}
                                                  // name={`amount_${index}`}
                                                  value={product?.amount}
                                                  // value={watch(`products[${index}].productDetails.amount`)}
                                                  // {...register(
                                                  //   `products[${index}]?.productDetails?.amount`,
                                                  //   {
                                                  //     required:
                                                  //       "amount is required",
                                                  //     message: "invalid input",
                                                  //   }
                                                  // )}
                                                  onChange={(e) =>
                                                    handleInputChange(e)
                                                  }
                                                />
                                                {errors[
                                                  `products[${index}].productDetails.amount`
                                                ] && (
                                                  <Text color="red.500">
                                                    {
                                                      errors[
                                                        `products[${index}].productDetails.amount`
                                                      ].message
                                                    }
                                                  </Text>
                                                )}
                                              </FormControl>
                                            </Box>
                                          </Stack>
                                          <Stack
                                            direction={{
                                              base: "column",
                                              md: "row",
                                            }}
                                            spacing={6}
                                            alignItems="center"
                                            mx="1rem"
                                            // mt="1rem"
                                          >
                                            <Box width="71%">
                                              <FormControl>
                                                <FormLabel>
                                                  Description
                                                </FormLabel>
                                                <Input
                                                  placeholder="Description"
                                                  marginTop="0.2rem"
                                                  type="text"
                                                  width="100%" // Use 100% width for full width
                                                  height="100px"
                                                  border="1px solid #707070"
                                                  // name={`description_${index}`}
                                                  // value={watch(`products[${index}].productDetails.description`)}
                                                  value={product?.description}
                                                  isDisabled
                                                  // {...register(
                                                  //   `products[${index}].productDetails.description`,
                                                  //   {
                                                  //     required:
                                                  //       "description is required",
                                                  //     message: "invalid input",
                                                  //   }
                                                  // )}
                                                  onChange={(e) =>
                                                    handleInputChange(e)
                                                  }
                                                />
                                                {errors[
                                                  `products[${index}].productDetails.description`
                                                ] && (
                                                  <Text color="red.500">
                                                    {
                                                      errors[
                                                        `products[${index}].productDetails.description`
                                                      ].message
                                                    }
                                                  </Text>
                                                )}
                                              </FormControl>
                                            </Box>
                                          </Stack>
                                        </Box>

                                        <Box>
                                          <Stack
                                            direction={{
                                              base: "column",
                                              md: "row",
                                            }}
                                            spacing={6}
                                            alignItems="center"
                                            mx={{ base: "1rem", md: "0" }}
                                            width="100%"
                                            ml={{ base: "0px", md: "15px" }}
                                          >
                                            {/* ... */}
                                          </Stack>
                                          {/* <hr
                                            style={{
                                              marginTop: "20px",
                                              height: "1px",
                                              border: "none",
                                              backgroundColor: "black",
                                            }}
                                          /> */}
                                        </Box>
                                        <Button
                                          backgroundColor={"#FF9130"}
                                          color={"#ffffff"}
                                          colorScheme="teal"
                                          ml={"15px"}
                                          isDisabled
                                          onClick={handleAddProduct}
                                        >
                                          <AddIcon />
                                          Add Product
                                        </Button>
                                      </>
                                    )}

                                  {/* bill amount and meter Charges */}
                                </>
                              );
                            })}
                        </React.Fragment>

                        {products?.billAmt !== null &&
                          products?.billAmt !== undefined && (
                            <>
                              <Stack
                                direction={{
                                  base: "column",
                                  md: "row",
                                }}
                                spacing={6}
                                alignItems="center"
                                mx="1rem"
                                // mt="1rem"
                              >
                                {console.log(products?.billAmt, "product")}
                                <Box>
                                  <FormControl isRequired>
                                    <FormLabel>A) Bill Amount</FormLabel>
                                    <Input
                                      placeholder="Xxxxxxxx"
                                      marginTop={"0.2rem"}
                                      isRequired
                                      type="number"
                                      width={{
                                        base: "120%",
                                        md: "400px",
                                      }}
                                      height={"40px"}
                                      border={"1px solid #707070"}
                                      control={control}
                                      isDisabled
                                      value={products?.billAmt}
                                      name="billAmount"
                                      {...register("billAmount", {
                                        required: "Bill Amount is required",
                                      })}
                                      onChange={(e) => handleInputChange(e)}
                                    />
                                  </FormControl>
                                  <Text color={"#FF9130"} fontWeight={"500"}>
                                    (GST 18%)
                                  </Text>
                                  {errors.billAmount && (
                                    <Text color="red.500">
                                      {errors.billAmount.message}
                                    </Text>
                                  )}
                                </Box>
                                <Box>
                                  <FormControl>
                                    <FormLabel>B) Meter Charges</FormLabel>
                                    <Input
                                      placeholder="Meter Charges"
                                      marginTop={"0.2rem"}
                                      type="number"
                                      width={{
                                        base: "120%",
                                        md: "400px",
                                      }}
                                      height={"40px"}
                                      border={"1px solid #707070"}
                                      control={control}
                                      name="meterCharges"
                                      isDisabled
                                      value={products?.meterCharges}
                                      {...register("meterCharges", {
                                        required: "Meter Charges is required",
                                        message: "Invalid Fields",
                                      })}
                                      onChange={(e) => handleInputChange(e)}
                                    />
                                  </FormControl>
                                  <Text color={"#FF9130"} fontWeight={"500"}>
                                    (GST 18%)
                                  </Text>
                                  {errors.meterCharges && (
                                    <Text color="red.500">
                                      {errors.meterCharges.message}
                                    </Text>
                                  )}
                                </Box>
                              </Stack>

                              <Stack
                                direction={{
                                  base: "column",
                                  md: "row",
                                }}
                                spacing={6}
                                alignItems="center"
                                mx="1rem"
                                // mt="1rem"
                              >
                                <Box>
                                  <FormControl>
                                    <FormLabel>Other Charges</FormLabel>
                                    <Input
                                      placeholder="Xxxxxxxx"
                                      marginTop={"0.2rem"}
                                      type="number"
                                      width={{
                                        base: "120%",
                                        md: "400px",
                                      }}
                                      height={"40px"}
                                      border={"1px solid #707070"}
                                      control={control}
                                      name="otherCharges"
                                      isDisabled
                                      value={products?.otherCharges}
                                      {...register("otherCharges", {
                                        required: "Other Charges is required",
                                        message: "Invalid Fields",
                                      })}
                                      onChange={(e) => handleInputChange(e)}
                                    />
                                  </FormControl>
                                  <Text color={"#FF9130"} fontWeight={"500"}>
                                    (Xxxx)
                                  </Text>
                                  {errors.otherCharges && (
                                    <Text color="red.500">
                                      {errors.otherCharges.message}
                                    </Text>
                                  )}
                                </Box>
                                <Box>
                                  <FormControl>
                                    <FormLabel>
                                      Total Project Cost (A+B)
                                    </FormLabel>
                                    <Input
                                      placeholder="Total Project Cost"
                                      marginTop={"0.2rem"}
                                      type="number"
                                      width={{
                                        base: "120%",
                                        md: "400px",
                                      }}
                                      height={"40px"}
                                      border={"1px solid #707070"}
                                      control={control}
                                      name="totalCost"
                                      isDisabled
                                      value={products?.totalCost}
                                      {...register("totalCost", {
                                        required: "Total Cost is required",
                                        message: "Invalid address",
                                      })}
                                      onChange={(e) => handleInputChange(e)}
                                    />
                                  </FormControl>
                                  <Text color={"#FF9130"} fontWeight={"500"}>
                                    (GST 18%)
                                  </Text>
                                  {errors.totalCost && (
                                    <Text color="red.500">
                                      {errors.totalCost.message}
                                    </Text>
                                  )}
                                </Box>
                              </Stack>

                              <Button
                                backgroundColor={"#FF9130"}
                                color={"#ffffff"}
                                colorScheme="teal"
                                ml={"15px"}
                                mt={"10px"}
                                isDisabled={
                                  clientid === null || clientid === undefined
                                }
                                onClick={handleSubmit(submitHandlerCommercial)}
                              >
                                Submit
                              </Button>
                            </>
                          )}
                      </>
                    );
                  })}

                {
                  //   products.map((product, index) => {
                  //   <Box key={index}>
                  //   <Stack
                  //     direction={{ base: "column", md: "row" }}
                  //     spacing={6}
                  //     alignItems="center"
                  //     mx="1rem"
                  //   >
                  //
                  //  }
                  // // )}
                  //       )
                  // }
                }
                {/* Add Product Button */}
              </Flex>
            </Box>
          </TabPanel>

          {/* <Payment Page /> */}
          <TabPanel tabIndex={activeTab}>
            {" "}
            <Box>
              <Box>
                <Flex
                  direction={{ base: "column" }}
                  justify="center"
                  align="start"
                  gap="5"
                  mt={5}
                >
                  {console.log(paymentdetails, "Line 3312")}
                  {paymentdetails &&
                    paymentdetails?.length > 0 &&
                    paymentdetails?.map((payment, index) => (
                      <Box key={index}>
                        <Stack
                          direction={{ base: "column", md: "row" }}
                          spacing={6}
                          alignItems="center"
                          mx="1rem"
                        >
                          {console.log(payment, "payment")}
                          <Box>
                            {" "}
                            <FormControl>
                              <FormLabel>Installment</FormLabel>
                              <Select
                                placeholder="Select option"
                                marginTop={"0.5rem"}
                                type="text"
                                width={{ base: "100%", md: "400px" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                control={control}
                                name="installment"
                                isDisabled
                                value={paymentdetails[index].installment}
                                // {...register("installment", {
                                //   required: "Installment is required",
                                //   message: "Invalid Input",
                                // })}
                                onChange={(e) => {
                                  setValue("installment", e.target.value);
                                }}
                              >
                                <option value="Advance">Advance</option>
                                <option value="1st Installment">
                                  1st Installment
                                </option>
                                <option value="2nd Installment">
                                  2nd Installment
                                </option>
                                <option value="3rd Installment">
                                  3rd Installment
                                </option>
                                <option value="final Installment">
                                  Final Installment
                                </option>
                              </Select>
                              {errors.installment && (
                                <Text color="red.500">
                                  {errors.installment.message}
                                </Text>
                              )}
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl>
                              <FormLabel>Project Cost</FormLabel>
                              <Input
                                marginTop={"0.2rem"}
                                placeholder="Project Cost"
                                type="text"
                                width={{ base: "120%", md: "400px" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                control={control}
                                name="projectCost"
                                isDisabled
                                value={paymentdetails[index].projectCost}
                                // {...register("projectCost", {
                                //   required: "Project Cost is required",
                                //   message: "Invalid Input",
                                // })}
                                onChange={handleProjectCostChange}
                              />
                              {errors.projectCost && (
                                <Text color="red.500">
                                  {errors.projectCost.message}
                                </Text>
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
                          <Box width="50%">
                            <FormControl>
                              <FormLabel>Payment Mode </FormLabel>

                              <Select
                                placeholder="Select option"
                                marginTop={"0.5rem"}
                                type="text"
                                width={{ base: "100%", md: "400px" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                control={control}
                                name="paymentMode"
                                isDisabled
                                value={paymentdetails[index].paymentMode}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "payment",
                                    e.target.value
                                  )
                                }

                                // {...register("paymentMode", {
                                //   required: "Payment Mode is required",
                                //   message: "Invalid Input",
                                // })}
                              >
                                {PaymentModes.map((paymentMode, index) => (
                                  <option key={index} value={paymentMode}>
                                    {paymentMode}
                                  </option>
                                ))}
                              </Select>

                              {errors.paymentMode && (
                                <Text color="red.500">
                                  {errors.paymentMode.message}
                                </Text>
                              )}
                            </FormControl>
                          </Box>
                          <Box width="50%">
                            <FormControl>
                              <FormLabel>Payment Date</FormLabel>
                              <Input
                                marginTop={"0.2rem"}
                                type="date"
                                width={{ base: "250px", md: "400px" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                value={paymentdetails[index].paymentDate}
                                name="paymentDate"
                                isDisabled
                                // {...register("paymentDate", {
                                //   required: "Payment Date is required",
                                //   message: "Invalid Inputs",
                                // })}
                              />
                              {errors.paymentDate && (
                                <Text color="red.500">
                                  {errors.paymentDate.message}
                                </Text>
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
                            <FormControl>
                              <FormLabel>Installment Amount Paid</FormLabel>
                              <Input
                                marginTop={"0.2rem"}
                                placeholder="Installment Amount"
                                type="number"
                                width={{ base: "250px", md: "400px" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                name="paymentAmount"
                                isDisabled
                                // {...register("paymentAmount", {
                                //   message: "Invalid Input",
                                // })}
                                value={paymentdetails[index].paymentAmount}
                                onChange={handleInstallmentAmountChange}
                              />
                              {errors.paymentAmount && (
                                <Text color="red.500">{installmentError}</Text>
                              )}
                            </FormControl>
                          </Box>

                          <Box>
                            <FormControl>
                              <FormLabel>Remaning Amount Paid</FormLabel>
                              <Input
                                marginTop={"0.2rem"}
                                placeholder="Installment Amount"
                                type="number"
                                width={{ base: "120%", md: "100%" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                name="remainingBalance"
                                value={paymentdetails[index].remainingBalance}
                                readOnly
                                // {...register("remainingBalance", {
                                //   message: "Invalid Input",
                                // })}
                              />

                              {errors.remainingBalance && (
                                <Text color="red.500">
                                  {errors.remainingBalance.message}
                                </Text>
                              )}
                            </FormControl>
                          </Box>
                        </Stack>
                        <hr
                          style={{
                            marginTop: "20px",
                            height: "1px",
                            border: "none",
                            backgroundColor: "black",
                          }}
                        />
                      </Box>
                    ))}
                </Flex>
              </Box>

              {Array.from({ length: paymentCount }).map((_, index) => (
                <Box key={index}>
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={6}
                    alignItems="center"
                    mx="1rem"
                  >
                    {console.log(payment, "payment")}
                    <Box>
                      {" "}
                      <FormControl>
                        <FormLabel>Installment</FormLabel>
                        <Select
                          placeholder="Select option"
                          marginTop={"0.5rem"}
                          type="text"
                          width={{ base: "100%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="installment"
                          // isDisabled
                          // value={paymentdetails[index].installment}
                          {...register("installment", {
                            required: "Installment is required",
                            message: "Invalid Input",
                          })}
                          onChange={(e) => {
                            setValue("installment", e.target.value);
                          }}
                        >
                          <option value="Advance">Advance</option>
                          <option value="1st Installment">
                            1st Installment
                          </option>
                          <option value="2nd Installment">
                            2nd Installment
                          </option>
                          <option value="3rd Installment">
                            3rd Installment
                          </option>
                          <option value="final Installment">
                            Final Installment
                          </option>
                        </Select>
                        {errors.installment && (
                          <Text color="red.500">
                            {errors.installment.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Project Cost</FormLabel>
                        <Input
                          marginTop={"0.2rem"}
                          placeholder="Project Cost"
                          type="text"
                          width={{ base: "120%", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="projectCost"
                          // value={paymentdetails[index].projectCost}
                          // isDisabled
                          {...register("projectCost", {
                            required: "Project Cost is required",
                            message: "Invalid Input",
                          })}
                          onChange={handleProjectCostChange}
                        />
                        {errors.projectCost && (
                          <Text color="red.500">
                            {errors.projectCost.message}
                          </Text>
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
                      <FormControl>
                        <FormLabel>Payment Mode </FormLabel>

                        <Select
                          placeholder="Select option"
                          marginTop={"0.5rem"}
                          type="text"
                          width={{ base: "250px", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          control={control}
                          name="paymentMode"
                          // value={paymentdetails[index].paymentMode}
                          onChange={(e) =>
                            handleInputChange(index, "payment", e.target.value)
                          }
                          // isDisabled
                          {...register("paymentMode", {
                            required: "Payment Mode is required",
                            message: "Invalid Input",
                          })}
                        >
                          {PaymentModes.map((paymentMode, index) => (
                            <option key={index} value={paymentMode}>
                              {paymentMode}
                            </option>
                          ))}
                        </Select>

                        {errors.paymentMode && (
                          <Text color="red.500">
                            {errors.paymentMode.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Payment Date</FormLabel>
                        <Input
                          marginTop={"0.2rem"}
                          type="date"
                          width={{ base: "250px", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          // isDisabled
                          // value={paymentdetails[index].paymentDate}
                          name="paymentDate"
                          {...register("paymentDate", {
                            required: "Payment Date is required",
                            message: "Invalid Inputs",
                          })}
                        />
                        {errors.paymentDate && (
                          <Text color="red.500">
                            {errors.paymentDate.message}
                          </Text>
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
                      <FormControl>
                        <FormLabel>Installment Amount Paid</FormLabel>
                        <Input
                          marginTop={"0.2rem"}
                          placeholder="Installment Amount"
                          type="number"
                          width={{ base: "250px", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          name="paymentAmount"
                          {...register("paymentAmount", {
                            message: "Invalid Input",
                          })}
                          // value={paymentdetails[index].paymentAmount}
                          onChange={handleInstallmentAmountChange}
                        />
                        {errors.paymentAmount && (
                          <Text color="red.500">{installmentError}</Text>
                        )}
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl>
                        <FormLabel>Remaning Amount Paid</FormLabel>
                        <Input
                          marginTop={"0.2rem"}
                          placeholder="Installment Amount"
                          type="number"
                          width={{ base: "250px", md: "400px" }}
                          height={"40px"}
                          border={"1px solid #707070"}
                          name="remainingBalance"
                          value={remainingBalance}
                          readOnly
                          {...register("remainingBalance", {
                            message: "Invalid Input",
                          })}
                        />

                        {errors.remainingBalance && (
                          <Text color="red.500">
                            {errors.remainingBalance.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                  <hr
                    style={{
                      marginTop: "20px",
                      height: "1px",
                      border: "none",
                      backgroundColor: "black",
                    }}
                  />
                </Box>
              ))}

              <Button
                backgroundColor={"#FF9130"}
                color={"#ffffff"}
                colorScheme="teal"
                ml={"15px"}
                mt={"30px"}
                onClick={addNewPayment}
                // addNewPayment
                // onClick={addNewPayment}
              >
                <AddIcon />
                Add Payment
              </Button>

              <Center>
                {/* save payment */}
                <Button
                  colorScheme="green"
                  color={"#ffffff"}
                  ml={"15px"}
                  mt={"30px"}
                  type="submit"
                  onClick={submitHandlerPayment}
                  size="lg"
                >
                  Save
                </Button>
              </Center>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div>
        <Flex>
          <Box p="4" bg={activeTab <= 0}>
            {activeTab > 0 && (
              <Button
                colorScheme="teal"
                onClick={() => handleTabChange(activeTab - 1)}
              >
                Previous
              </Button>
            )}
          </Box>
          <Spacer />
          <Box p="4" bg={activeTab < totalTabs}>
            {activeTab < totalTabs - 1 && (
              <Button
                colorScheme="teal"
                onClick={() => handleNextButtonClick(activeTab + 1)}
              >
                Next
              </Button>
            )}
          </Box>
        </Flex>
      </div>
    </>
  );
}
export default WorkOrderView;
