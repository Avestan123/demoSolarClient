import { useState, useEffect } from "react";
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
  Checkbox,
  Spinner,
  Image,
  CheckboxGroup,
  NumberInput,
  Divider,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { set, useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Country, State, City } from "country-state-city";

// import { useUser }  from "../../context/UserContext";
import { useContext } from "react";
// import user from "../../../../../greenlife-be/models/user";

function ViewForm() {
  const location = useLocation();
  const useData = location.state;
  console.log("Line 32", useData);
  const [showMoreFolowUp, setShowMoreFollowUp] = useState(false);
  const [followUps, setFollowUps] = useState([{}]);
  const [followUpss, setFollowUpss] = useState([{}]);
  const [projectstate, setProjectstate] = useState(false);
  const [LostLeadreasin, setLostleadReason] = useState(false);
  const [Reason, setReason] = useState();
  const [Getstate, setstate] = useState();
  const [updatefile, setUpdatefile] = useState();
  const [projectkw, setprojectkw] = useState(true);
  const [retails, setRetails] = useState(true);

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [selectedFiles, setSelectedFiles] = useState({
    electricitybill: null,
    pancard: null,
    adharcard: null,
    taxreceipt: null,
  });

  const addFollowUp = () => {
    setFollowUps([...followUps, {}]);
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

  localStorage.removeItem("client_id");

  console.log("userData", useData);

  const { userData } = useUser();
  console.log("userData", userData);

  // const userid =
  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", Getstate);

  const isAdmin = userData?.userRole === "Admin";
  const isSales = userData?.userRole === "Sales";
  // console.log("isAdmin", isAdmin, "isSales", isSales);

  // HAndleing Follow Ups
  const [followupData, setFollowupData] = useState({
    followUps: [
      // Initialize with some data if needed
      { followUpDate: "", remarks: "" },
    ],
  });
  const handleFollowUpChange = (index, key, value) => {
    // console.log("Inside HanldeFollowUpChange", index, key, value);
    // // Clone the data and update the specific follow-up
    // console.log("_____", key, value);
    // const newFollowupData = { ...followupData };
    // newFollowupData.followUps[index][key] = value;
    // setFollowupData(newFollowupData);
    const currentFollowUps = getValues("followUps");
    currentFollowUps[index][key] = value;
    setValue("followUps", currentFollowUps);
  };

  //add more followups and remarks
  const handleNewFollowups = () => {
    setFollowUps([...followUps, {}]);
    // setChecked(!isChecked);
    // Add your custom logic or event handling here
    // if (e.target.checked) {
    //   // Checkbox is checked, do something
    //   console.log("Checkbox is checked!");
    //   setShowMoreFollowUp(true)
    // } else {
    //   // Checkbox is unchecked, do something else
    //   console.log("Checkbox is unchecked!");
    //   setShowMoreFollowUp(false)
    // }
  };

  // var customerId = useData._id;
  console.log("useData", useData);
  var customerId = useData?.lead?._id;

  console.log("customer id ", customerId);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const [myleadsdetailsworkorder, setmyleadsdetailsworkorder] = useState();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // console.log("_id:", _id);
  // reset form function
  function resetForm(data) {
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, "");
    });
  }

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // for selected fles

  // const handleFileChange = (fieldName) => (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFiles((prevFiles) => ({
  //     ...prevFiles,
  //     [fieldName]: file,
  //   }));

  // };

  const [updatedimg, setUpdatedimg] = useState({
    electricitybill: null,
    pancard: null,
    adharcard: null,
    taxreceipt: null,
  });

  const handleFileChange = (inputName, e) => {
    const files = e.target.files;
    console.log("121", inputName);

    console.log("122 line", files);
    if (files.length > 0) {
      const file = files[0];

      console.log("Selected File:", file);

      console.log("Line 128", e.target.value);
      // Check if the state is updated correctly
      setSelectedFiles((prevfile) => ({
        ...prevfile,
        [inputName]: null,
      }));
      // console.log("assssssss", selectedFiles);

      setUpdatedimg((prevFiles) => {
        const updatedFiles = {
          ...prevFiles,
          [inputName]: { file, inputName: URL.createObjectURL(file) },
        };
        console.log("Updated Files State:", updatedFiles);
        return updatedFiles;
      });
    }
  };

  const handleSelectChange = (selectedValue) => {
    setValue("requirement", selectedValue);
  };

  useEffect(() => {
    // Set initial form values
    console.log("View Form userData", useData);
    setValue("clientName", useData?.lead?.clientName);
    setValue("email", useData?.lead?.email);
    setValue("number", useData?.lead?.number);
    setValue("dob", useData?.lead?.dob);
    setValue("address", useData?.lead?.address);
    setValue("state", userData?.lead?.state);
    setValue("city", useData?.lead?.city);
    setstate(useData?.lead?.state);
    setValue("followUpDate", useData?.lead?.followUpDate);
    setValue("otherSource", useData?.lead?.otherSource);
    setValue("source", useData?.lead?.source);
    setValue("kilowatts", useData?.lead?.kilowatts);
    setValue("projectname", useData?.lead?.projectname);
    setValue("pin", useData?.lead?.pin);
    setValue("referralName", useData?.lead?.referralName);

    setValue("requirement", useData?.lead?.requirement);
    setValue("remarks", useData?.lead?.remarks);
    setValue("clientlevel", useData?.lead?.clientlevel);
    setValue("followUps", useData?.lead?.followUps);
    // setValue("kilowatts", useData?.lead?.kilowatts);
    setValue("altNumber", useData?.lead?.altNumber);
    setValue("retailProductName", useData?.lead?.retailProductName);
    // setValue("electricitybill", useData?.lead?.electricitybill);
    // setValue("pancard", useData?.lead?.pancard);
    // setValue("adharcard", useData?.lead?.adharcard);
    // setValue("taxreceipt", useData?.lead?.taxreceipt);
    console.log("before setting adhar card", useData?.lead?.adharcard);
    setSelectedFiles((prevfile) => ({
      ...prevfile,
      adharcard: useData?.lead?.adharcard,
    }));

    console.log("Adhar card set value 173", selectedFiles.adharcard);
    // setSelectedFiles("pancard", useData?.lead?.pancard);
    setSelectedFiles((prevfile) => ({
      ...prevfile,
      pancard: useData?.lead?.pancard,
    }));

    console.log("PAncard in line 176", selectedFiles.pancard);
    setSelectedFiles((prevfile) => ({
      ...prevfile,
      electricitybill: useData?.lead?.electricitybill,
    }));

    console.log("Electricity bill in line 181", selectedFiles.electricitybill);

    setSelectedFiles((prevfile) => ({
      ...prevfile,
      taxreceipt: useData?.lead?.taxreceipt,
    }));

    console.log("SEtvalue data 192", selectedFiles.adharcard);
    setValue("gstnumber", useData?.lead?.gstnumber);
    setValue("contactperson", useData?.lead?.contactperson);

    console.log("Line198 for sele cted file", selectedFiles);

    setFollowUps(useData?.additionalFollowups || []);
    // additional followups

    // if (useData?.additionalFollowups) {
    //   console.log(useData?.additionalFollowups);
    //   useData?.additionalFollowups.forEach((followUp, index) => {
    //     console.log(
    //       `Setting value for followUpDate[${index}]:`,
    //       followUp?.followUpDate,
    //       "",
    //       followUp?.remarks
    //     );
    //     console.log(`Setting value for remarks[${index}]:`, followUp?.remarks);
    //     setValue(`followUps[${index}].followUpDate`, followUp?.followUpDate);
    //     setValue(`followUps[${index}].remarks`, followUp?.remarks);
    //     // Set other values if needed
    //   });
    //   // setFollowUps(useData.additionalFollowups)
    // }
    console.log("Line 288", useData?.additionalFollowups);
    if (useData?.lead?.additionalFollowups) {
      useData?.lead?.additionalFollowups.forEach((followUp, index) => {
        console.log(
          `Setting value for followUpDate[${index}]:`,
          followUp?.followUpDate,
          "Remarks:",
          followUp?.remarks
        );

        // Set the initial values for follow-up dates and remarks

        setValue(`followUps[${index}].followUpDate`, followUp?.followUpDate);
        setValue(`followUps[${index}].remarks`, followUp?.remarks);

        // Set other values if needed
      });
    }

    if (useData?.lead?.additionalFollowups) {
      const updatedFollowUps = useData?.lead?.additionalFollowups.map(
        (followUp, index) => {
          console.log(
            `Setting value for followUpDate[${index}]:`,
            followUp?.followUpDate,
            "Remarks:",
            followUp?.remarks
          );

          // Return an object with the followUpDate and remarks values
          return {
            followUpDate: followUp?.followUpDate,
            remarks: followUp?.remarks,
          };
        }
      );

      // Update the followUps state with the accumulated values
      setFollowUpss(updatedFollowUps);
    }
  }, [useData, setValue, setSelectedFiles, useData?.lead?.additionalFollowups]);

  //Update the details
  const updateCustomer = async (data) => {
    console.log("data for update", data);
    console.log("Inside Update customer");
    const token = localStorage.getItem("token");
    // const customerId = data._id;
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    // Create a new FormData instance
    const formData = new FormData();

    // Append fields to the formData
    console.log("update Customer Date", data);
    console.log("viewForm Daata", data);

    console.log("viewForm Daata", data);
    formData.append("clientName", data?.clientName);
    console.log("clientName", data?.clientName);
    formData.append("email", data?.email);
    formData.append("number", data?.number);
    formData.append("address", data?.address);
    console.log("address", data?.state);
    formData.append("state", data?.state);
    formData.append("city", data?.city);
    formData.append("followUpDate", data?.followUpDate);
    formData.append("requirement", data?.requirement);
    formData.append("remarks", data?.remarks);
    formData.append("clientlevel", data?.clientlevel);
    formData.append("pin", data?.pin);

    // Append file fields to the formData
    // formData.append("electricityBill", data?.electricityBill);
    // formData.append("electricitybill", selectedFiles?.electricitybill);
    console.log(">>>>>>>>>>>>>>", updatedimg);

    if (updatedimg?.pancard?.file !== null) {
      formData.append("pancard", updatedimg?.pancard?.file);
    }

    // console.log("Pancard Line 302", updatedimg.pancard.file);

    if (updatedimg?.adharcard?.file !== null) {
      console.log("adharcard Line 302", updatedimg?.adharcard?.file);
      formData.append("adharcard", updatedimg?.adharcard?.file);
    }

    if (updatedimg?.taxreceipt?.file !== null) {
      formData.append("taxreceipt", updatedimg?.taxreceipt?.file);
    }

    if (updatedimg?.electricitybill?.file !== null) {
      formData.append("electricitybill", updatedimg?.electricitybill?.file);
    }

    // formData.append("electricitybill", setUpdatedimg[0]?.electricitybill);
    // formData.append("pancard", data?.pancard);
    // formData.append("pancard", selectedFiles?.pancard);
    // formData.append("adharcard", data?.adharcard);
    // formData.append("adharcard", selectedFiles?.adharcard);

    // formData.append("textRecipe", data?.textRecipe);
    // formData.append("taxreceipt", selectedFiles?.taxreceipt);

    formData.append("reason", data?.reason);
    console.log("Reason   ", data?.reason);
    setReason(data?.reason);

    if (data.gstnumber) {
      formData.append("gstnumber", data?.gstnumber);
    }
    if (data.contactperson) {
      formData.append("contactperson", data?.contactperson);
    }
    console.log("Follow up >>>>>>>>>>>>", data);

    // if (data?.followUps?.length > 0) {
    //   data?.followUps?.forEach((followUp, index) => {
    //     formData?.append(
    //       `followUps[${index}].followUpDate`,
    //       followUp?.followUpDate
    //     );
    //     formData?.append(`followUps[${index}].remarks`, followUp?.remarks);
    //   });
    // }

    // if (followupData?.followUps?.length > 0) {
    //   console.log(followupData);
    //   followupData?.followUps?.forEach((followUp, index) => {
    //     console.log("Followups is for Each", followUp);
    //     setFollowUps([
    //       `folloUps[${index}].follwUpDate`,
    //       followUp?.followUpDate,
    //     ]);
    //     formData.append(
    //       `followUps[${index}].followUpDate`,
    //       followUp?.followUpDate
    //     );
    //     setFollowUps([`folloUps[${index}].remarks`, followUp?.remarks]);
    //     formData.append(`followUps[${index}].remarks`, followUp?.remarks);
    //   });
    // }

    const fomdataa = getValues();
    console.log("%^$%%%%", fomdataa);
    console.log("Line 288", fomdataa?.followUps);
    // if (fomdataa?.followUps) {
    //   fomdataa?.followUps?.forEach((followUp, index) => {
    //     console.log(
    //       `Setting value for followUpDate[${index}]:`,
    //       followUp?.followUpDate,
    //       "Remarks:",
    //       followUp?.remarks
    //     );

    //     // Set the initial values for follow-up dates and remarks
    //     setValue(`followUps[${index}].followUpDate`, followUp?.followUpDate);
    //     setValue(`followUps[${index}].remarks`, followUp?.remarks);
    //     formData.append(
    //       `followUps[${index}].followUpDate`,
    //       followUp?.followUpDate
    //     );
    //     formData.append(`followUps[${index}].remarks`, followUp?.remarks);

    //     // Set other values if needed
    //   });
    // }
    // else {
    //   return alert("Please add atleast one followup", followUps);
    // }
    // Append follow-ups array to the formData
    // formData.append("followUps", JSON.stringify(followupData?.followUps));

    if (fomdataa?.followUps) {
      const followUpsArray = fomdataa.followUps.map((followUp, index) => {
        console.log(
          `Setting value for followUpDate[${index}]:`,
          followUp?.followUpDate,
          "Remarks:",
          followUp?.remarks
        );

        // Set the initial values for follow-up dates and remarks
        setValue(`followUps[${index}].followUpDate`, followUp?.followUpDate);
        setValue(`followUps[${index}].remarks`, followUp?.remarks);

        return {
          followUpDate: followUp?.followUpDate,
          remarks: followUp?.remarks,
        };
      });

      // Now, followUpsArray contains the desired structure
      console.log("Formatted followUpsArray:", followUpsArray);

      // Append the followUpsArray to your FormData if needed
      formData.append("followUps", JSON.stringify(followUpsArray));

      // Rest of your code...
    }

    const Data = JSON.stringify(formData);
    formData.forEach((value, key) => {
      console.log("!!!!!!!!!!!!!!!!!!", key, value);
    });

    try {
      // Make the fetch request
      // localStorage.setItem("form Data", formData);
      console.log("From customerId ", customerId, data, formData);
      let response = await fetch(
        `${apiUrl}/sales/updateCustomerDetails/${customerId}`,
        {
          method: "POST",
          body: formData,

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let Resdata = await response.json();
      setmyleadsdetailsworkorder(Resdata);
      console.log("View form ~~~~~~~~~~~ ", Resdata);
      // console.log("ViewForm Update Data button", Resdata);
      if (Resdata.status === 200) {
        toast({
          title: "Customer Information Updated",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newleads", { state: { data: Resdata } });
      } else {
        resetForm(data);

        toast({
          title: Resdata.msg || "something wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Update Data button Error", error);
      toast({
        title: "Error updating customer information",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Delete The customer
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/sales/deleteCustomer`, {
        method: "POST",
        body: JSON.stringify({
          customerId: id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resdata = await response.json();
      if (resdata) {
        setLoading(false);
        toast({
          title: "Deleted sucessfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newleads");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Deleting Customer",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // addd customer to ost lead
  const handleLostLead = async (id) => {
    const formData = new FormData();
    // formData.append("reason",reason);
    // console.log(register);
    console.log(getValues("reason"));
    const Reason = getValues("reason");
    setLoading(true);
    // formData.append("reason", reason);
    // console.log("Reason line 391 ->>>>>>>>>>>>>>>>>>>>>>>>>>>>", );
    try {
      const token = localStorage.getItem("token");
      console.log("Id fromhandle Lost lead", id);
      // console.log("Form data reason line 396", reason);
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      // const reqbody = {
      //   customerId: id,
      //   reason: formData.reason,
      // };
      // console.log("393 lin", Reason);
      const response = await fetch(`${apiUrl}/sales/setCustomerAsLost/${id}`, {
        method: "POST",
        body: JSON.stringify({ reason: Reason }),

        // JSON.stringify({
        //   customerId: id,
        // }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resdata = await response.json();
      console.log("Viewform Add lost Lead button", resdata);
      if (resdata) {
        setLoading(false);
        toast({
          title: "Added to lost customers.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newleads");
      }
    } catch (error) {
      setLoading(false);
      alert("Error", error.message);
    }
  };

  const onSubmit = (data) => {
    console.log("Line 417", data);
    // updateCustomer(data);
  };
  if (loading) {
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>;
  }

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        mt="4"
      >
        {/* name and email */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Client Name</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                border={"1px solid #707070"}
                contentEditable
                name="clientName"
                id="clientName"
                isDisabled={isAdmin ? false : true}
                color="dark"
                // value = {clientName}
                // onChange={(e) => setClientName(e.target.value)}
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

          <Box>
            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                border={"1px solid #707070"}
                // value = {data.number}
                name="number"
                id="number"
                isDisabled={isAdmin ? false : true}
                {...register("number", {
                  message: "invalid number",
                })}
              />
              {errors.number && (
                <Text color="red.500">{errors.number.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>
        {/* rendering if client contact person name is available && GST number */}
        {useData?.contactperson && useData?.gstnumber ? (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
            py={"1rem"}
          >
            <Box>
              <FormControl isRequired>
                <FormLabel>Contact Person Name</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  isRequired
                  type="text"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  // border={"1px solid #707070"}
                  contentEditable
                  name="contactperson"
                  id="contactperson"
                  isDisabled={isAdmin ? false : true}
                  color="dark"
                  // value = {clientName}
                  // onChange={(e) => setClientName(e.target.value)}
                  {...register("contactperson")}
                />
                {errors.clientName && (
                  <Text color="red.500">{errors.contactperson.message}</Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>GST Number</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  type="number"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  border={"1px solid #707070"}
                  // value = {data.email}
                  backgroundColor="gray.100"
                  name="number"
                  id="number"
                  isDisabled={isAdmin ? false : true}
                  {...register("gstnumber")}
                />
                {errors.email && (
                  <Text color="red.500">{errors.gstnumber.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        ) : (
          " "
        )}
        {/* dob and number */}
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
                border={"1px solid #707070"}
                // value = {data.email}
                isRequired={false}
                backgroundColor="gray.100"
                name="email"
                id="email"
                isDisabled={isAdmin ? false : true}
                {...register("email", {
                  message: "invalid email",
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
              <Input
                marginTop={"0.5rem"}
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                backgroundColor="gray.100"
                isRequired={false}
                // value = {data.number}
                name="altNumber"
                id="altNumber"
                isDisabled={isAdmin ? false : true}
                {...register("altNumber", {
                  message: "invalid number",
                })}
              />
              {errors.altNumber && (
                <Text color="red.500">{errors.altNumber.message}</Text>
              )}
            </FormControl>
          </Box>

          {/* put email id */}
        </Stack>
        {/* number and adddress*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        ></Stack>
        {/* city and followupdate*/}
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
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                isRequired
                backgroundColor="gray.100"
                // value = {data.address}
                name="address"
                id="address"
                isDisabled={isAdmin ? false : true}
                {...register("address", {
                  required: "Address is required",
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
                isDisabled={isAdmin ? false : true}
                {...register("state", {
                  // required: "state is required",
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
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                // value = {data.city}
                backgroundColor="gray.100"
                name="city"
                id="city"
                isDisabled={isAdmin ? false : true}
                {...register("city", {
                  required: "City Name is required",
                  message: "invalid city",
                })}
              />
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
                  isDisabled={isAdmin ? false : true}
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
              <FormLabel>D.O.B</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                // value = {data.number}
                backgroundColor="gray.100"
                name="dob"
                id="dob"
                isDisabled={isAdmin ? false : true}
                {...register("dob", {
                  message: "invalid Date of Birth",
                })}
              />
              {errors.number && (
                <Text color="red.500">{errors.number.message}</Text>
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
                isDisabled={isAdmin ? false : true}
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
                  isDisabled={isAdmin ? false : true}
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
                  isDisabled={isAdmin ? false : true}
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
                isDisabled={isAdmin ? false : true}
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
                isDisabled={isAdmin ? false : true}
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
                isDisabled={isAdmin ? false : true}
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
                      isDisabled={isAdmin ? false : true}
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
                    isDisabled={isAdmin ? false : true}
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
                  placeholder="enter other source"
                  control={control}
                  name="referralName"
                  id="referralName"
                  isDisabled={isAdmin ? false : true}
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
                isDisabled={useData?.allLeads ? false : true}
                justifyContent="center"
              >
                Choose File
              </Button>
              {console.log(selectedFiles.electricitybill)}
              {selectedFiles.electricitybill && (
                // console.log(selectedFiles.electricitybill)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.electricitybill?.name}
                  </Text>
                  <Image
                    src={selectedFiles.electricitybill}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(selectedFiles.electricitybill, "_blank");
                    }}
                  />
                </Box>
              )}
              {console.log(updatedimg.electricitybill)}
              {updatedimg.electricitybill && (
                // console.log(selectedFiles.electricitybill)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.electricitybill?.name}
                  </Text>
                  <Image
                    src={URL.createObjectURL(updatedimg.electricitybill.file)}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(updatedimg.electricitybill.file),
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
              {console.log("pancard card in viw form ", useData)}
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
                isDisabled={useData?.allLeads ? false : true}
              >
                Choose File
              </Button>
              {selectedFiles.pancard && (
                // selectedFiles.adharcard
                // console.log(selectedFiles.aadhar)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.pancard?.name}
                  </Text>
                  {console.log(
                    "pancard card in viw form ",
                    selectedFiles.pancard
                  )}
                  <Image
                    // src={selectedFiles.adharcard}
                    src={selectedFiles.pancard}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(selectedFiles.pancard, "_blank");
                    }}
                  />
                </Box>
              )}
              {updatedimg.pancard && (
                // console.log(selectedFiles.electricitybill)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.pancard?.name}
                  </Text>
                  <Image
                    src={URL.createObjectURL(updatedimg.pancard.file)}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(updatedimg.pancard.file),
                        "_blank"
                      );
                    }}
                  />
                </Box>
              )}
              {errors.pancard && (
                <Text color="red.500">{errors.pancard.message}</Text>
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
                onChange={(e) => {
                  console.log("850 Line", e);
                  handleFileChange("adharcard", e);
                  console.log("adhar card 861", e);
                }}
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
                isDisabled={useData?.allLeads ? false : true}
              >
                Choose File
              </Button>
              {console.log("Adhar card 866", selectedFiles.adharcard)}

              {selectedFiles.adharcard && (
                // selectedFiles.adharcard
                // console.log(selectedFiles.aadhar)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.adharcard?.name}
                  </Text>
                  {console.log(
                    "Adhar card in viw form 871",
                    selectedFiles.adharcard
                  )}
                  <Image
                    // src={selectedFiles.adharcard}
                    src={selectedFiles.adharcard}
                    alt="Preview"
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
              {updatedimg.adharcard && (
                // console.log(selectedFiles.electricitybill)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.adharcard?.name}
                  </Text>
                  <Image
                    src={URL.createObjectURL(updatedimg.adharcard.file)}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(updatedimg.adharcard.file),
                        "_blank"
                      );
                    }}
                  />
                </Box>
              )}
              {errors.adharcard && (
                <Text color="red.500">{errors.adharcard.message}</Text>
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
                isDisabled={useData?.allLeads ? false : true}
              >
                Choose File
              </Button>
              {useData?.lead?.taxreceipt && (
                // selectedFiles.adharcard
                // console.log(selectedFiles.aadhar)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.taxreceipt?.name}
                  </Text>
                  {console.log(
                    "tax  card in viw form ",
                    selectedFiles?.taxreceipt
                  )}
                  <Image
                    // src={selectedFiles.adharcard}
                    src={selectedFiles?.taxreceipt}
                    alt="Preview"
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
              {updatedimg.taxreceipt && (
                // console.log(selectedFiles.electricitybill)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected: {selectedFiles?.taxreceipt?.name}
                  </Text>
                  <Image
                    src={URL.createObjectURL(updatedimg.taxreceipt.file)}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(updatedimg.taxreceipt.file),
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
              <FormLabel>Follow Up Date</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                isRequired
                // value = {data.followUpDate}
                backgroundColor="gray.100"
                name="followUpDate"
                id="followUpDate"
                isDisabled={isAdmin ? false : true}
                {...register("followUpDate", {
                  required: "followUpDate is required",
                  message: "invalid followUpDate",
                })}
              />
              {errors.date && (
                <Text color="red.500">{errors.date.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {console.log(followUps)}

        {followUpss.map((item, index) => (
          <Stack
            key={item._id} // Make sure to set a unique key for each mapped item
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
            mt="1rem"
          >
            <Box>
              <FormControl isRequired>
                <FormLabel>Follow-up Date</FormLabel>

                <Controller
                  control={control}
                  name={`followUps[${index}].followUpDate`}
                  render={({ field }) => (
                    <Input
                      marginTop={"0.5rem"}
                      type="date"
                      width={{ base: "250px", md: "400px" }}
                      height={"50px"}
                      backgroundColor="gray.100"
                      placeholder="Enter address"
                      required
                      isDisabled
                      // onChange={(e) =>
                      //   handleFollowUpChange(index, "followUpDate", e.target.value)
                      // }

                      {...register(`followUps[${index}].followUpDate`, {
                        required: "Follow Up Date is required",
                      })}
                      // isDisabled
                      value={item.followUpDate}
                    />
                  )}
                  rules={{
                    required: "Follow Up Date is required",
                  }}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl isRequired>
                <FormLabel>Remarks</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  type="text"
                  width={{ base: "250px", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="Enter remarks"
                  required
                  isDisabled
                  // onChange={(e) =>
                  //   handleFollowUpChange(index, "remarks", e.target.value)
                  // }
                  {...register(`followUps[${index}].remarks`, {
                    required: "Remarks are required for Project",
                  })}
                  value={item.remarks}
                />
              </FormControl>
            </Box>

            {/* Add more fields as needed */}
          </Stack>
        ))}
        {followUps.map((item, index) => (
          <Stack
            key={item._id} // Make sure to set a unique key for each mapped item
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
            mt="1rem"
          >
            <Box>
              <FormControl isRequired>
                <FormLabel>Follow-up Date</FormLabel>

                <Controller
                  control={control}
                  name={`followUps[${index}].followUpDate`}
                  render={({ field }) => (
                    <Input
                      marginTop={"0.5rem"}
                      type="date"
                      width={{ base: "250px", md: "400px" }}
                      height={"50px"}
                      backgroundColor="gray.100"
                      placeholder="Enter address"
                      required
                      // onChange={(e) =>
                      //   handleFollowUpChange(index, "followUpDate", e.target.value)
                      // }

                      {...register(`followUps[${index}].followUpDate`, {
                        required: "Follow Up Date is required",
                      })}
                      // isDisabled
                      value={item.followUpDate}
                    />
                  )}
                  rules={{
                    required: "Follow Up Date is required",
                  }}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl isRequired>
                <FormLabel>Remarks</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  type="text"
                  width={{ base: "250px", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="Enter remarks"
                  required
                  // onChange={(e) =>
                  //   handleFollowUpChange(index, "remarks", e.target.value)
                  // }
                  {...register(`followUps[${index}].remarks`, {
                    required: "Remarks are required for Project",
                  })}
                  value={item.remarks}
                />
              </FormControl>
            </Box>

            {/* Add more fields as needed */}
          </Stack>
        ))}

        <Center w="100%" mt="2">
          <Divider
            borderWidth="2px"
            colorScheme="red"
            orientation="horizontal"
          />
        </Center>
        {/* add new follow up */}
        {useData?.allLeads && (
          <Stack
            mt="2rem"
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
          >
            <Box>
              <Button colorScheme="green" onClick={handleNewFollowups} mr={5}>
                Add more followups
              </Button>
              {console.log(followUps[0])}

              <Button
                colorScheme="green"
                mt={{ base: "2", md: "0" }}
                mb={{ base: "2", md: "0" }}
              >
                {/* Resdata */}
                {console.log(
                  "myleadsdetailsworkorder",
                  useData
                  // remyleadsdetailsworkordersdata
                )}
                <Link
                  to="/workorder/WorkOrderform"
                  // params={{ state: myleadsdetailsworkorder }}
                  // state={myleadsdetailsworkorder}
                  state={{ useData: useData }}
                >
                  Go to Work Order
                </Link>
              </Button>

              <Button
                colorScheme="red"
                onClick={() => setLostleadReason(!LostLeadreasin)}
                mr={5}
                mx={{ base: "0", md: "4" }}
              >
                Add to Lost Leads
                {/* onClick={() => handleLostLead(useData?.lead._id)} */}
              </Button>
              {LostLeadreasin && (
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  alignItems="center"
                  mx="1rem"
                  mt="1rem"
                >
                  <Box>
                    <FormControl isRequired>
                      <FormLabel>Reason for Lost Lead</FormLabel>
                      <Textarea
                        marginTop={{ base: "0.5rem", md: "0" }}
                        isRequired
                        type="text"
                        width={{ base: "100%", md: "400px" }}
                        height={"50px"}
                        border={"1px solid #707070"}
                        // value = {data.city}
                        gap={2}
                        padding={2}
                        margin={4}
                        backgroundColor="gray.100"
                        name="city"
                        id="city"
                        {...register("reason", {
                          required: "reason is required",
                        })}
                      />
                      {errors.reason && (
                        <Text color="red.500">{errors.reason.message}</Text>
                      )}
                    </FormControl>
                    {console.log(useData?.lead._id)}
                    <Button
                      padding={2}
                      margin={{ base: "2", md: "0" }}
                      colorScheme="yellow"
                      onClick={() => handleLostLead(useData?.lead?._id)}
                    >
                      <Link to="">Submit</Link>
                    </Button>
                  </Box>
                </Stack>
              )}
            </Box>
          </Stack>
        )}

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: "0.2rem", md: "1rem" }}
        >
          {useData?.allLeads && (
            <Box
              display="flex"
              width="100%"
              py={{ base: "2", md: "12" }}
              mt={"1.5rem"}
              bgPosition="center"
              // bgRepeat="no-repeat"
              mb={{ base: "0", md: "2" }}
            >
              <Button
                width={"8rem"}
                height={"2.5rem"}
                borderRadius={"15px"}
                background={"orange"}
                type="submit"
                onClick={updateCustomer}
              >
                Update
              </Button>
            </Box>
          )}

          {isAdmin && (
            <Box
              display="flex"
              width="100%"
              py={{ base: "2", md: "12" }}
              mt={{ base: "0rem", md: "1.6rem" }}
              bgPosition="center"
              // bgRepeat="no-repeat"
              mb={{ base: "0", md: "2" }}
            >
              <Button
                width={"8rem"}
                height={"2.5rem"}
                borderRadius={"15px"}
                background={"red"}
                onClick={() => handleDelete(useData._id)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default ViewForm;
