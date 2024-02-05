import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Spinner,
  Image,
  Text,
  Flex,
  RadioGroup,
  Radio,
  Select,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddEmployee() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // Documents
  const [selectedFiles, setSelectedFiles] = useState({
    photo: null,
    adharCard: null,
    panCard: null,

    markSheet: null,
    drivingLicense: null,

    bankDetailPhoto: null,
  });
  const [loading, setLoading] = useState();
  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxFileSize = 5 * 1024 * 1024;
  const handleFileChange = (inputName, e) => {
    const files = e.target.files;
    console.log("Line 180", files);
    if (files.length > 0) {
      const file = files[0];
      console.log("Line 183", file);

      console.log("Selected File:", file);

      // Check if the state is updated correctly
      // console.log("Workorder ", workorderdatanullcheck[0]);
      // workorderdatanullcheck[0].forEach((document) => {
      //   console.log("Line 189", document);
      //   if (document.fileName === inputName) {
      //     document.file = null;
      //     // document.preview = URL.createObjectURL(file);
      //   }
      // });
      // if (inputName === "photo") {
      //   workorderdatanullcheck[0].photo = null;
      // }
      // if (inputName === "aadhar") {
      //   workorderdatanullcheck[0].adharcard = null;
      // }
      // if (inputName === "pan") {
      //   workorderdatanullcheck[0].pancard = null;
      // }
      // if (inputName === "electricity") {
      //   workorderdatanullcheck[0].electricitybill = null;
      // }
      // if (inputName === "tax") {
      //   workorderdatanullcheck[0].taxreceipt = null;
      // }
      // if (inputName === "attorney") {
      //   workorderdatanullcheck[0].powerofattorney = null;
      // }
      // if (inputName === "annexure") {
      //   workorderdatanullcheck[0].annexure2 = null;
      // }
      // if (inputName === "application") {
      //   workorderdatanullcheck[0].applicationform = null;
      // }

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

  const [toggelreferance, setToggelreferance] = useState(false);
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

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("employeeId", data.employeeId);
    formData.append("employeePassword", data.employeePassword);
    formData.append("employeeRole", data.employeeRole);
    formData.append("employeeDepartment", data.employeeDepartment);
    formData.append("middleName", data.middleName);
    formData.append("surName", data.surName);
    formData.append("address", data.address);
    formData.append("pincode", data.pincode);
    formData.append("temporaryAddress", data.temporaryAddress);
    formData.append("mobileNo", data.mobileNo);
    formData.append("alternateNo", data.alternateNo);
    formData.append("referralName", data.referralName);
    formData.append("referralPhoneNo", data.referralPhoneNo);
    formData.append("referralAddress", data.referralAddress);
    formData.append("accountHolderName", data.accountHolderName);

    formData.append("accountNo", data.accountNo);
    formData.append("ifscCode", data.ifscCode);
    formData.append("adharCard", selectedFiles.adharCard?.file);
    formData.append("panCard", selectedFiles.panCard?.file);
    formData.append("markSheet", selectedFiles.markSheet?.file);
    formData.append("drivingLicense", selectedFiles.drivingLicense?.file);
    formData.append("bankDetailPhoto", selectedFiles.bankDetailPhoto?.file);

    console.log(data);
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    setLoading(true);
    let response = await fetch(`${apiUrl}/admin/addEmployee`, {
      method: "POST",
      body: formData,
      "Content-Type": "multipart/form-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let Resdata = await response.json();
    console.log(Resdata);
    if (Resdata.status === 200) {
      setLoading(false);
      toast({
        title: "Employeee Added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      resetForm(data);
      navigate("/newEmpoyee");
    } else if (Resdata.status === 409) {
      setLoading(false);
      toast({
        title: "Email Id and Employee Id should not be Same",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      setLoading(false);
      resetForm(data);

      toast({
        title: Resdata.msg || "something wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return loading ? (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  ) : (
    <>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        gap="5"
        mt="5rem"
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

          {/* Referance  */}
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Reference</FormLabel>
              <RadioGroup
                // defaultValue="2"
                value={toggelreferance ? "1" : "2"}
                onChange={() => setToggelreferance(!toggelreferance)}
              >
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="blue"
                    value="1"
                    // onClick={() => setToggelreferance(!toggelreferance)}
                  >
                    Yes{console.log(toggelreferance, "Yes Button")}
                  </Radio>
                  <Radio
                    colorScheme="blue"
                    value="2"
                    // onClick={() => setToggelreferance(!toggelreferance)}
                  >
                    No{console.log(toggelreferance, "No buttoon")}
                  </Radio>
                </Stack>
              </RadioGroup>
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
            {toggelreferance ? (
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
            ) : (
              ""
            )}
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
                <FormLabel>Upload Aadhar Card</FormLabel>
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
                >
                  Choose Adhaar
                </Button>

                {selectedFiles?.adharCard && (
                  // console.log(selectedFiles.aadhar)
                  <Box mt={2}>
                    <Text color="green.500">
                      File selected:
                      {/* {selectedFiles.aadhar.name} */}
                    </Text>
                    <Image
                      // src={selectedFiles.aadhar.preview}
                      src={URL.createObjectURL(selectedFiles?.adharCard?.file)}
                      alt="Preview"
                      w="150px"
                      h="150px"
                      borderRadius="15px"
                      cursor="pointer"
                      onClick={() => {
                        console.log("clicked");
                        window.open(
                          URL.createObjectURL(selectedFiles?.adharCard?.file),
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
                <FormLabel>Upload Pan Card</FormLabel>
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
                >
                  Choose File
                </Button>

                {selectedFiles.panCard && (
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
                        src={URL.createObjectURL(selectedFiles.panCard.file)}
                        alt="Preview"
                        w="150px"
                        h="150px"
                        borderRadius="15px"
                        cursor="pointer"
                        onClick={() => {
                          console.log("clicked");
                          window.open(selectedFiles.panCard.preview, "_blank");
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
                >
                  Choose File
                </Button>

                {selectedFiles?.markSheet && (
                  // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
                  // console.log(selectedFiles.aadhar)
                  <Box mt={2}>
                    <Text color="green.500">
                      File selected:
                      {/* {selectedFiles.aadhar.name} */}
                    </Text>
                    <Image
                      // src={selectedFiles.aadhar.preview}
                      src={URL.createObjectURL(selectedFiles?.markSheet?.file)}
                      alt="Preview"
                      w="150px"
                      h="150px"
                      borderRadius="15px"
                      cursor="pointer"
                      onClick={() => {
                        console.log("clicked");
                        window.open(
                          URL.createObjectURL(selectedFiles?.markSheet?.file),
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
                >
                  Choose File
                </Button>

                {selectedFiles?.drivingLicense && (
                  // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
                  // console.log(selectedFiles.aadhar)
                  <Box mt={2}>
                    <Text color="green.500">
                      File selected:
                      {/* {selectedFiles.aadhar.name} */}
                    </Text>
                    <Image
                      // src={selectedFiles.aadhar.preview}
                      src={URL.createObjectURL(
                        selectedFiles?.drivingLicense?.file
                      )}
                      alt="Preview"
                      w="150px"
                      h="150px"
                      borderRadius="15px"
                      cursor="pointer"
                      onClick={() => {
                        console.log("clicked");
                        window.open(
                          URL.createObjectURL(
                            selectedFiles?.drivingLicense?.file
                          ),
                          "_blank"
                        );
                      }}
                    />
                  </Box>
                )}
                {errors.drivingLicense && (
                  <Text color="red.500">{errors.drivingLicense.message}</Text>
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
                <Text color="red.500">{errors.accountHolderName.message}</Text>
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
              >
                Choose File
              </Button>

              {selectedFiles?.bankDetailPhoto && (
                // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
                // console.log(selectedFiles.aadhar)
                <Box mt={2}>
                  <Text color="green.500">
                    File selected:
                    {/* {selectedFiles.aadhar.name} */}
                  </Text>
                  <Image
                    // src={selectedFiles.aadhar.preview}
                    src={URL.createObjectURL(
                      selectedFiles?.bankDetailPhoto?.file
                    )}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(
                        URL.createObjectURL(
                          selectedFiles?.bankDetailPhoto?.file
                        ),
                        "_blank"
                      );
                    }}
                  />
                </Box>
              )}
              {errors.bankDetailPhoto && (
                <Text color="red.500">{errors.bankDetailPhoto.message}</Text>
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
                <Text color="red.500">{errors.employeeDepartment.message}</Text>
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
                <Text color="red.500">{errors.employeePassword.message}</Text>
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
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default AddEmployee;
