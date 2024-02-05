import React, { useState, useEffect, useContext } from "react";
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
  Image,
  Center,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import EmployeeContext from "../../context/EmployeeContext";

function EmpViewForm() {
  const location = useLocation();
  const useData = location.state;
  const { userData } = useUser();
  const [isTransferred, setIsTransferred] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(false);

  const isAdmin = userData?.userRole === "Admin";
  const employeedata = useContext(EmployeeContext);
  const Employees = employeedata?.employeeData?.employees;
  console.log(Employees);

  var customerId = useData._id;
  console.log("customer id ", useData.employee);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const role = localStorage.getItem("userRole");
  console.log(role);

  const listofdepartments = [
    "Admin",
    "HR",
    "Marketing",
    "Sales",
    "Purches",
    "Accounts",
    "Finance",
    "IT",
    "Services",
    "Store  ",
    "Dispatch",
    "Customer Care",
  ];

  const Role = ["Sales Manager", "Sales Executive", "General Sales Manager"];

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
  const [selectedFiles, setSelectedFiles] = useState({
    electricity: null,
    pan: null,
    aadhar: null,
    tax: null,
  });

  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files[0];
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: file,
    }));
  };

  const handleSelectChange = (selectedValue) => {
    setValue("requirement", selectedValue);
  };

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    // Set initial form values
    setValue("name", useData?.employee?.name);
    setValue("middleName", useData?.employee?.middleName);
    setValue("surName", useData?.employee?.surName);
    setValue("address", useData?.employee?.address);
    setValue("pincode", useData?.employee?.pincode);
    setValue("temporaryAddress", useData?.employee?.temporaryAddress);
    setValue("mobileNo", useData?.employee?.mobileNo);
    setValue("alternateNo", useData?.employee?.alternateNo);
    setValue("email", useData?.employee?.email);
    setValue("referralName", useData?.employee?.referralName);
    setValue("referralPhoneNo", useData?.employee?.referralPhoneNo);
    setValue("referralAddress", useData?.employee?.referralAddress);
    setValue("accountHolderName", useData?.employee?.accountHolderName);
    setValue("accountNo", useData?.employee?.accountNo);
    setValue("ifscCode", useData?.employee?.ifscCode);
    setValue("employeeDepartment", useData?.employee?.employeeDepartment);
    setValue("employeeRole", useData?.employee?.employeeRole);
    setValue("employeeId", useData?.employee?.employeeId);
    setValue("employeePassword", useData?.employee?.employeePassword);

    setValue("city", useData.city);
    setValue("followUpDate", useData.followUpDate);
    setValue("requirement", useData.requirement);
    setValue("remarks", useData.remarks);
    // Set other form values...
  }, [useData, setValue, selectedEmployee, isTransferred]);

  //Update the details
  const updateCustomer = async (data) => {
    const token = localStorage.getItem("token");
    // const customerId = data._id;
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    // Create a new FormData instance
    const formData = new FormData();

    // Append fields to the formData
    formData.append("clientName", data.clientName);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("followUpDate", data.followUpDate);
    formData.append("requirement", data.requirement);
    formData.append("remarks", data.remarks);

    // Append file fields to the formData
    formData.append("electricityBill", data.electricityBill);
    formData.append("pancard", data.pancard);
    formData.append("adharcard", data.adharcard);
    formData.append("textRecipe", data.textRecipe);
    console.log(formData);
    try {
      // Make the fetch request
      console.log(customerId, data, formData);
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
      if (Resdata.status === 200) {
        toast({
          title: "Customer Information Updated",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newleads");
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
      console.error(error);
      toast({
        title: "Error updating customer information",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleTransfer = async () => {
    setIsTransferred(false);
    const val = confirm("Do you wish to transfer all leads");
    console.log("after confirm", val, selectedEmployee);
    setIsTransferred(val);
    if (val) {
      try {
        setLoading(true);
        const employeeId = selectedEmployee;
        console.log("Employee Id : ++++", employeeId);
        const inactiveEmployeeId = useData?.employee?._id;
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${apiUrl}/generalUtility/assignLeadsPermanently/${employeeId}/${inactiveEmployeeId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const resdata = await response.json();
        if (resdata) {
          setLoading(false);
          setIsTransferred(true);
          toast({
            title: "Leads Transferred sucessfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        setLoading(false);
        toast({
          title: "Failed to transfer leads",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  // Delete The customer
  const handleDeactivate = async () => {
    try {
      if (isTransferred) {
        setLoading(true);
        const employeeId = useData?.employee?._id;
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${apiUrl}/generalUtility/deActivateEmployee/${employeeId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
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
          navigate("/newEmpoyee");
        }
      } else {
        toast({
          title: "Please transfer all leads before deactivating.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
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

  const handleSelectEmployee = async (e) => {
    e.preventDefault();
    console.log(e, "Employee Selected");
    setSelectedEmployee(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        gap="5"
        mt="2rem"
      >
        {/* name & Email */}
        <Center>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Employee Details
          </Text>
        </Center>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Employee Name</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="name"
                id="name"
                {...register("name", {
                  required: "Employee Name is required",
                  message: "invalid input",
                })}
              />
              {errors.employeeName && (
                <Text color="red.500">{errors.employeeName.message}</Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>Middle Name </FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="middleName"
                id="middleName"
                {...register("middleName", {
                  //   required: "Email is required",
                  message: "Some thing round",
                })}
              />
              {errors.middleName && (
                <Text color="red.500">{errors.middleName.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Surname</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="surName"
                id="surName"
                {...register("surName", {
                  required: "surName Name is required",
                  message: "invalid input",
                })}
              />
              {errors.surName && (
                <Text color="red.500">{errors.surName.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="address"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="address"
                id="address"
                isRequired
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
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Pin Code</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="pincode"
                id="pincode"
                {...register("pincode", {
                  required: "pincode  is required",
                  message: "invalid input",
                })}
              />
              {errors.pincode && (
                <Text color="red.500">{errors.pincode.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Temporary Address</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="temporaryAddress"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="temporaryAddress"
                id="temporaryAddress"
                {...register("temporaryAddress", {
                  //   required: "Email is required",
                  message: "Some thing wrong",
                })}
              />
              {errors.temporaryAddress && (
                <Text color="red.500">{errors.temporaryAddress.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Id & Password*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Mobile No</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="number"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="mobileNo"
                id="mobileNo"
                {...register("mobileNo", {
                  required: "mobileNo is required",
                  pattern: {
                    value: /^[0-9]{10}$/, // Ensure exactly 10 digits
                    message: "Invalid number format",
                  },
                })}
              />
              {errors.mobileNo && (
                <Text color="red.500">{errors.mobileNo.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>Alternate Contact No</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="number"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                isRequired
                border={"1px solid #707070"}
                control={control}
                name="alternateNo"
                id="alternateNo"
                {...register("alternateNo", {
                  required: "alternateNo  is required",
                  pattern: {
                    value: /^[0-9]{10}$/, // Ensure exactly 10 digits
                    message: "Invalid number format",
                  },
                })}
              />
              {errors.alternateNo && (
                <Text color="red.500">{errors.alternateNo.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                background={"#F2F2F2"}
                border={"1px solid #707070"}
                control={control}
                name="email"
                id="email"
                {...register("email", {
                  required: "email Id is required",
                  message: "invalid input",
                })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {isAdmin && (
          <div>
            {/* Referance  */}
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              alignItems="center"
              mx="1rem"
            >
              <Box>
                <FormControl isRequired>
                  <FormLabel>Reference</FormLabel>
                </FormControl>
              </Box>
            </Stack>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              alignItems="center"
              mx="1rem"
            >
              <Box>
                <>
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={6}
                    alignItems="center"
                    mx="1rem"
                  >
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Refferal Name</FormLabel>
                        <Input
                          marginTop={"0.5rem"}
                          isRequired
                          type="text"
                          width={{ base: "100%", md: "400px" }}
                          height={"50px"}
                          background={"#F2F2F2"}
                          border={"1px solid #707070"}
                          control={control}
                          name="referralName"
                          id="referralName"
                          {...register("referralName", {
                            required: "referralName Name is required",
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

                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Contact No </FormLabel>
                        <Input
                          marginTop={"0.5rem"}
                          type="number"
                          width={{ base: "100%", md: "400px" }}
                          height={"50px"}
                          background={"#F2F2F2"}
                          border={"1px solid #707070"}
                          control={control}
                          name="referralPhoneNo"
                          id="referralPhoneNo"
                          {...register("referralPhoneNo", {
                            //   required: "Email is required",
                            message: "invalid number",
                          })}
                        />
                        {errors.emaireferralPhoneNol && (
                          <Text color="red.500">
                            {errors.referralPhoneNo.message}
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
                  >
                    <Box>
                      <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input
                          marginTop={"0.5rem"}
                          isRequired
                          type="text"
                          width={{ base: "100%", md: "400px" }}
                          height={"50px"}
                          background={"#F2F2F2"}
                          border={"1px solid #707070"}
                          control={control}
                          name="referralAddress"
                          id="referralAddress"
                          {...register("referralAddress", {
                            message: "invalid input",
                          })}
                        />
                        {errors.referralAddress && (
                          <Text color="red.500">
                            {errors.referralAddress.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </>
              </Box>
            </Stack>
            <Box gap={50} mt={8}>
              {/* <form onSubmit={handleSubmit(submitForm)}> */}
              {/* Photo and aadhar Card */}
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                Documents
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="1rem"
              >
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Aadhar Card</FormLabel>
                    <Input
                      marginTop={"0.5rem"}
                      type="file"
                      display="none"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      // control={control}
                      name="adharCard"
                      id="adharCard"
                      {...register("adharCard", {
                        message: "invalid File",
                      })}
                      onChange={(e) => handleFileChange("adharCard", e)} // Make sure "aadhar" is the correct inputName
                      isDisabled={useData?.employee?.adharCard ? true : false}
                    />
                    <Button
                      as="label"
                      htmlFor="adharCard"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      isDisabled={useData?.employee?.adharCard ? true : false}
                    >
                      Choose Adhaar
                    </Button>

                    {useData?.employee?.adharCard && (
                      // console.log(selectedFiles.aadhar)
                      <Box mt={2}>
                        <Text color="green.500">
                          File selected:
                          {/* {selectedFiles.aadhar.name} */}
                        </Text>
                        <Image
                          // src={selectedFiles.aadhar.preview}
                          src={useData?.employee?.adharCard}
                          alt="Preview"
                          w="150px"
                          h="150px"
                          borderRadius="15px"
                          cursor="pointer"
                          onClick={() => {
                            console.log("clicked");
                            window.open(
                              URL.createObjectURL(
                                selectedFiles?.adharCard?.file
                              ),
                              "_blank"
                            );
                          }}
                        />
                      </Box>
                    )}
                    {errors.adharCard && (
                      <Text color="red.500">{errors.adharCard.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel> Pan Card</FormLabel>
                    <Input
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
                      name="panCard"
                      id="panCard"
                      {...register("panCard", {
                        message: "invalid file",
                      })}
                      onChange={(e) => handleFileChange("panCard", e)}
                      isDisabled={useData?.employee?.panCard ? true : false}
                    />
                    <Button
                      as="label"
                      htmlFor="panCard"
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
                      isDisabled={useData?.employee?.panCard ? true : false}
                    >
                      Choose File
                    </Button>

                    {useData?.employee?.panCard && (
                      // {console.log(selectedFiles.aadhar)}

                      <>
                        {/* {setWorkordernullcheck(workorderdatanullcheck[0]?.pancard = "")} */}
                        <Box mt={2}>
                          <Text color="green.500">
                            File selected:
                            {/* {selectedFiles.aadhar.name} */}
                          </Text>
                          <Image
                            // src={selectedFiles.aadhar.preview}
                            src={useData?.employee?.panCard}
                            alt="Preview"
                            w="150px"
                            h="150px"
                            borderRadius="15px"
                            cursor="pointer"
                            onClick={() => {
                              console.log("clicked");
                              window.open(
                                selectedFiles.panCard.preview,
                                "_blank"
                              );
                            }}
                          />
                        </Box>
                      </>
                    )}
                    {errors.panCard && (
                      <Text color="red.500">{errors.panCard.message}</Text>
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
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Upload Marksheet</FormLabel>
                    <Input
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
                      name="markSheet"
                      id="markSheet"
                      {...register("markSheet", {
                        message: "Invalid file",
                      })}
                      onChange={(e) => handleFileChange("markSheet", e)} // Make sure "electricity" is the correct inputName
                      isDisabled={useData?.employee?.markSheet ? true : false}
                    />
                    <Button
                      as="label"
                      htmlFor="markSheet"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      isDisabled={useData?.employee?.markSheet ? true : false}
                    >
                      Choose File
                    </Button>

                    {useData?.employee?.markSheet && (
                      // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
                      // console.log(selectedFiles.aadhar)
                      <Box mt={2}>
                        <Text color="green.500">
                          File selected:
                          {/* {selectedFiles.aadhar.name} */}
                        </Text>
                        <Image
                          // src={selectedFiles.aadhar.preview}
                          src={useData?.employee?.markSheet}
                          alt="Preview"
                          w="150px"
                          h="150px"
                          borderRadius="15px"
                          cursor="pointer"
                          onClick={() => {
                            console.log("clicked");
                            window.open(
                              URL.createObjectURL(
                                selectedFiles?.markSheet?.file
                              ),
                              "_blank"
                            );
                          }}
                        />
                      </Box>
                    )}
                    {errors.markSheet && (
                      <Text color="red.500">{errors.markSheet.message}</Text>
                    )}
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired>
                    <FormLabel>Upload Driving License</FormLabel>
                    <Input
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
                      name="drivingLicense"
                      id="drivingLicense" // Add an id to match the htmlFor in the label
                      {...register("drivingLicense", {
                        message: "Invalid file",
                      })}
                      onChange={(e) => handleFileChange("drivingLicense", e)}
                      isDisabled={
                        useData?.employee?.drivingLicense ? true : false
                      }
                    />
                    <Button
                      as="label"
                      htmlFor="drivingLicense" // Match the id of the file input
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      isDisabled={
                        useData?.employee?.drivingLicense ? true : false
                      }
                    >
                      Choose File
                    </Button>

                    {useData?.employee?.drivingLicense && (
                      // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
                      // console.log(selectedFiles.aadhar)
                      <Box mt={2}>
                        <Text color="green.500">
                          File selected:
                          {/* {selectedFiles.aadhar.name} */}
                        </Text>
                        <Image
                          // src={selectedFiles.aadhar.preview}
                          src={useData?.employee?.drivingLicense}
                          alt="Preview"
                          w="150px"
                          h="150px"
                          borderRadius="15px"
                          cursor="pointer"
                          onClick={() => {
                            console.log("clicked");
                            window.open(
                              useData?.employee?.drivingLicense,
                              "_blank"
                            );
                          }}
                        />
                      </Box>
                    )}
                    {errors.drivingLicense && (
                      <Text color="red.500">
                        {errors.drivingLicense.message}
                      </Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>
            </Box>
            {/*
         Bank Details */}

            <Center>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                Bank Details
              </Text>
            </Center>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              alignItems="center"
              mx="1rem"
            >
              <Box>
                <FormControl isRequired>
                  <FormLabel>Account Holder Name</FormLabel>
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    background={"#F2F2F2"}
                    border={"1px solid #707070"}
                    control={control}
                    name="accountHolderName"
                    id="accountHolderName"
                    {...register("accountHolderName", {
                      required: "accountHolderName Name is required",
                      message: "invalid input",
                    })}
                  />
                  {errors.accountHolderName && (
                    <Text color="red.500">
                      {errors.accountHolderName.message}
                    </Text>
                  )}
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel>Account Number</FormLabel>
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="number"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    background={"#F2F2F2"}
                    border={"1px solid #707070"}
                    control={control}
                    name="accountNo"
                    id="accountNo"
                    {...register("accountNo", {
                      required: "accountNo Name is required",
                      message: "invalid input",
                    })}
                  />
                  {errors.accountNo && (
                    <Text color="red.500">{errors.accountNo.message}</Text>
                  )}
                </FormControl>
              </Box>
            </Stack>

            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              alignItems="center"
              mx="1rem"
            >
              <Box>
                <FormControl isRequired>
                  <FormLabel>Account IFSC Code</FormLabel>
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    background={"#F2F2F2"}
                    border={"1px solid #707070"}
                    control={control}
                    name="ifscCode"
                    id="ifscCode"
                    {...register("ifscCode", {
                      required: "ifscCode Name is required",
                      message: "invalid input",
                    })}
                  />
                  {errors.ifscCode && (
                    <Text color="red.500">{errors.ifscCode.message}</Text>
                  )}
                </FormControl>
              </Box>

              <Box>
                <FormControl>
                  <FormLabel>Upload Bank Details Photo</FormLabel>
                  <Input
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
                    name="bankDetailPhoto"
                    id="bankDetailPhoto" // Add an id to match the htmlFor in the label
                    {...register("bankDetailPhoto", {
                      message: "Invalid file",
                    })}
                    onChange={(e) => handleFileChange("bankDetailPhoto", e)}
                  />
                  <Button
                    as="label"
                    htmlFor="bankDetailPhoto" // Match the id of the file input
                    cursor="pointer"
                    marginTop={"0.5rem"}
                    width={{ base: "250px", md: "400px" }}
                    height={"40px"}
                    border={"1px solid #707070"}
                    px={2} // Padding on the x-axis
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    isDisabled={
                      useData?.employee?.bankDetailPhoto ? true : false
                    }
                  >
                    Choose File
                  </Button>

                  {useData?.employee?.bankDetailPhoto && (
                    // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
                    // console.log(selectedFiles.aadhar)
                    <Box mt={2}>
                      <Text color="green.500">
                        File selected:
                        {/* {selectedFiles.aadhar.name} */}
                      </Text>
                      <Image
                        // src={selectedFiles.aadhar.preview}
                        src={useData?.employee?.bankDetailPhoto}
                        alt="Preview"
                        w="150px"
                        h="150px"
                        borderRadius="15px"
                        cursor="pointer"
                        onClick={() => {
                          console.log("clicked");
                          window.open(
                            useData?.employee?.bankDetailPhoto,
                            "_blank"
                          );
                        }}
                      />
                    </Box>
                  )}
                  {errors.bankDetailPhoto && (
                    <Text color="red.500">
                      {errors.bankDetailPhoto.message}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </Stack>

            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              alignItems="left"
              mx="1rem"
            >
              <Box>
                <FormControl isRequired>
                  <FormLabel>Employee Department</FormLabel>
                  <Select
                    placeholder="Select option"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    background={"#F2F2F2"}
                    border={"1px solid #707070"}
                    control={control}
                    name="employeeDepartment"
                    id="employeeDepartment"
                    {...register("employeeDepartment", {
                      required: "employeeDepartment  is required",
                      message: "invalid input",
                    })}
                  >
                    {listofdepartments.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </Select>
                  {errors.employeeDepartment && (
                    <Text color="red.500">
                      {errors.employeeDepartment.message}
                    </Text>
                  )}
                </FormControl>
              </Box>
              <FormControl isRequired>
                <FormLabel>Employee Role</FormLabel>
                <Select
                  placeholder="Select option"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  background={"#F2F2F2"}
                  border={"1px solid #707070"}
                  control={control}
                  name="employeeRole"
                  id="employeeRole"
                  {...register("employeeRole", {
                    required: "Employee Role is required",
                    message: "invalid input",
                  })}
                >
                  {Role.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </Select>
                {errors.employeeRole && (
                  <Text color="red.500">{errors.employeeRole.message}</Text>
                )}
              </FormControl>
            </Stack>

            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              alignItems="center"
              mx="1rem"
            >
              <Box>
                <FormControl isRequired>
                  <FormLabel>Employee ID</FormLabel>
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    background={"#F2F2F2"}
                    border={"1px solid #707070"}
                    control={control}
                    name="employeeId"
                    id="employeeId"
                    {...register("employeeId", {
                      required: "Employee Id is required",
                      message: "invalid input",
                    })}
                  />
                  {errors.employeeId && (
                    <Text color="red.500">{errors.employeeId.message}</Text>
                  )}
                </FormControl>
              </Box>

              {/* Referance  */}

              <Box>
                <FormControl isRequired>
                  <FormLabel>Employee Password</FormLabel>
                  <Input
                    marginTop={"0.5rem"}
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    background={"#F2F2F2"}
                    isRequired
                    border={"1px solid #707070"}
                    control={control}
                    name="employeePassword"
                    id="employeePassword"
                    {...register("employeePassword", {
                      required: "Employee Password is required",
                      message: "invalid email",
                    })}
                  />
                  {errors.employeePassword && (
                    <Text color="red.500">
                      {errors.employeePassword.message}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </Stack>

            <Stack direction="column">
              <Box
                display="flex"
                alignItems="center "
                justifyContent="start"
                width="100%"
                py={1}
                mt={"1.5rem"}
                bgPosition="center"
                bgRepeat="no-repeat"
                mb={2}
              >
                <Button
                  width={"8rem"}
                  height={"3rem"}
                  borderRadius={"15px"}
                  background={"orange"}
                  // onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </Box>
            </Stack>
          </div>
        )}
        <Flex justifyContent="center" alignItems="center">
          <Stack direction={{ base: "column", md: "row" }}>
            <Box
              display="flex"
              alignItems="center "
              justifyContent="center"
              width="100%"
              py={1}
              mt={"1.5rem"}
              bgPosition="center"
              bgRepeat="no-repeat"
              mb={2}
            >
              <Select onChange={handleSelectEmployee}>
                {Employees &&
                  Employees.filter(
                    (employees) => employees.name !== useData?.employee?.name
                  ).map((emp) => {
                    return (
                      <option key={emp.id} value={emp._id}>
                        {emp.name}
                      </option>
                    );
                  })}
              </Select>
              <Button
                width="20rem"
                // height={"3rem"}
                borderRadius={"15px"}
                colorScheme="teal"
                onClick={handleTransfer}
                mx="1"
              >
                Transfer
              </Button>
            </Box>
            {(role == "Admin" || role == "General Sales Manager") && (
              <Box
                display="flex"
                alignItems="center "
                justifyContent="center"
                width="100%"
                // py={1}
                mt={"1.5rem"}
                bgPosition="center"
                bgRepeat="no-repeat"
                mb={2}
              >
                <Button
                  sm
                  height={"3rem"}
                  borderRadius={"15px"}
                  colorScheme="red"
                  onClick={handleDeactivate}
                >
                  Deactivate
                </Button>
              </Box>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export default EmpViewForm;
