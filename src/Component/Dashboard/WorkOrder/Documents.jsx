import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import WorkorderExistinguser from "../../context/EmployeeContext";
// import { useToast } from "@chakra-ui/react";

const Documents = () => {
  const { state, updateFormData } = useWorkForm();
  // const toast = useToast();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [workorderdatanullcheck, setWorkordernullcheck] = useState([]);
  const {
    // state: { workorderdata, myleadsdetailsworkorder },
    state: { workorderdata, useData },
  } = useLocation();
  const [loading, setLoading] = useState(false);

  console.log("workorderdata from documtnts", useData?.lead);

  const data = useContext(WorkorderExistinguser);
  console.log("data from documtnts", data);

  const clientid = localStorage.getItem("client_id");


  useEffect(() => {
    if (clientid === null || clientid === undefined) {
      toast({
        title: "Please Fill Client Information First",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }, []);

  useEffect(() => {
    const combinedData = [];

    if (
      workorderdata !== null &&
      workorderdata !== undefined &&
      Array.isArray(workorderdata)
    ) {
      combinedData.push(...workorderdata);
    } else if (workorderdata !== null && typeof workorderdata === "object") {
      combinedData.push(workorderdata);
    }

    if (Array.isArray(useData)) {
      combinedData.push(...useData?.lead);
    } else if (useData !== null && typeof useData === "object") {
      combinedData.push(useData?.lead);
    }

    setWorkordernullcheck(combinedData);

  }, [workorderdata, useData]);

  useEffect(() => {
    console.log("Context data:", state.documents);
  }, [state]);

  console.log("workorderdatanullcheck", workorderdatanullcheck);

  useEffect(() => {
    console.log("Context data:", state);
    const documents = state.documents;
    console.log("Documtnts in documtnts file", documents);

    const initialPreviews = {};


    setSelectedFiles(initialPreviews);
    // Update local state for file preview
  }, [setValue, state]);

  // state to store file
  const [selectedFiles, setSelectedFiles] = useState({
    photo: null,
    aadhar: null,
    pan: null,
    electricity: null,
    tax: null,
    attorney: null,
    annexure: null,
    application: null,
  });
  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (inputName, e) => {
    const files = e.target.files;
    console.log("Line 180", files);
    if (files.length > 0) {
      const file = files[0];
      console.log("Line 183", file);

      console.log("Selected File:", file);


      if (inputName === "photo") {
        workorderdatanullcheck[0].photo = null;
      }
      if (inputName === "aadhar") {
        workorderdatanullcheck[0].adharcard = null;
      }
      if (inputName === "pan") {
        workorderdatanullcheck[0].pancard = null;
      }
      if (inputName === "electricity") {
        workorderdatanullcheck[0].electricitybill = null;
      }
      if (inputName === "tax") {
        workorderdatanullcheck[0].taxreceipt = null;
      }
      if (inputName === "attorney") {
        workorderdatanullcheck[0].powerofattorney = null;
      }
      if (inputName === "annexure") {
        workorderdatanullcheck[0].annexure2 = null;
      }
      if (inputName === "application") {
        workorderdatanullcheck[0].applicationform = null;
      }

      // workorderdatanullcheck[0].forEach((document) => {

      // setWorkordernullcheck(workorderdatanullcheck[0]?.adharcard = null);

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

  // handler to submit form
  const onSubmit = async (data) => {
    console.log(data, selectedFiles);
    // const token = localStorage.getItem("token");
    setLoading(true);
    let formData = new FormData();
    if (
      selectedFiles?.photo?.file !== null &&
      selectedFiles?.photo?.file !== undefined
    ) {
      formData.append("photo", selectedFiles?.photo?.file);
    }
    if (
      workorderdatanullcheck[0].photo !== null &&
      workorderdatanullcheck[0].photo !== undefined
    ) {
      formData.append("photo", workorderdatanullcheck[0].photo);
    }
    if (
      selectedFiles?.aadhar?.file !== undefined &&
      selectedFiles?.aadhar?.file !== null
    ) {
      formData.append("adharcard", selectedFiles?.aadhar?.file);
      console.log("Selected Files");
    }
    if (
      workorderdatanullcheck[0]?.adharcard !== null &&
      workorderdatanullcheck[0]?.adharcard !== undefined
    ) {
      formData.append("adharcard", workorderdatanullcheck[0]?.adharcard);
      console.log("Workorder");
    }

    console.log(selectedFiles?.aadhar?.file);
    if (
      selectedFiles?.pan?.file !== undefined &&
      selectedFiles?.pan?.file !== null
    ) {
      console.log("Line 316", selectedFiles?.pan?.file);
      formData.append("pancard", selectedFiles?.pan?.file);
    }
    if (
      workorderdatanullcheck[0]?.pancard !== null &&
      workorderdatanullcheck[0]?.pancard !== undefined
    ) {
      formData.append("pancard", workorderdatanullcheck[0]?.pancard);
    }

    if (
      workorderdatanullcheck[0]?.electricitybill !== null &&
      workorderdatanullcheck[0]?.electricitybill !== undefined
    ) {
      formData.append(
        "electricitybill",
        workorderdatanullcheck[0]?.electricitybill
      );
    }
    if (
      selectedFiles?.electricity?.file != null &&
      selectedFiles?.electricity?.file !== undefined
    ) {
      formData.append("electricitybill", selectedFiles?.electricity?.file);
    }

    console.log("Electrivc bill", selectedFiles?.electricity?.file);

    if (
      workorderdatanullcheck[0]?.taxreceipt !== null &&
      workorderdatanullcheck[0]?.taxreceipt !== undefined
    ) {
      formData.append("taxreceipt", workorderdatanullcheck[0]?.taxreceipt);
    }

    if (
      selectedFiles?.tax?.file !== null &&
      selectedFiles?.tax?.file !== undefined
    ) {
      formData.append("taxreceipt", selectedFiles?.tax?.file);
    }

    if (
      workorderdatanullcheck[0]?.powerofattorney !== null &&
      workorderdatanullcheck[0]?.powerofattorney !== undefined
    ) {
      formData.append(
        "powerofattorney",
        workorderdatanullcheck[0]?.powerofattorney
      );
    }
    if (
      selectedFiles?.attorney?.file !== null &&
      selectedFiles?.attorney?.file !== undefined
    ) {
      formData.append("powerofattorney", selectedFiles?.attorney?.file);
    }

    if (
      workorderdatanullcheck[0]?.annexure2 !== null &&
      workorderdatanullcheck[0]?.annexure2 !== undefined
    ) {
      formData.append("annexure2", workorderdatanullcheck[0]?.annexure2);
    }

    if (
      selectedFiles?.annexure?.file !== null &&
      selectedFiles?.annexure?.file !== undefined
    ) {
      formData.append("annexure2", selectedFiles?.annexure?.file);
    }

    if (
      workorderdatanullcheck[0]?.applicationform !== null &&
      workorderdatanullcheck[0]?.applicationform !== undefined
    ) {
      formData.append(
        "applicationform",
        workorderdatanullcheck[0]?.applicationform
      );
    }
    if (
      selectedFiles?.application?.file !== null &&
      selectedFiles?.application?.file !== undefined
    ) {
      formData.append("applicationform", selectedFiles?.application?.file);
    }

    // if (workorderdatanullcheck[0]?.photo !== null ||workorderdatanullcheck[0]?.photo !== undefined ) {
    //   formData.append("photo", workorderdatanullcheck[0]?.photo);
    // }

    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    let response = await fetch(
      `${apiUrl}/workOrder/saveDocuments/${clientid}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      }
    );

    if (loading) {
      return (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="absolute"
          top="50%"
        />
      );
    }

    let Resdata = await response.json();
    if (Resdata.status === 200) {
      setLoading(false);
      console.log(Resdata);

      toast({
        title: Resdata.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      // resetForm(data);
      // navigate("/newleads");
    } else {
      // resetForm(data);
      setLoading(false);

      toast({
        title: Resdata.msg || "something wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
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
        <Box>
          <FormControl>
            <FormLabel>Photo</FormLabel>
            <Input
              marginTop={"0.5rem"}
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"center"}
              width={{ base: "250px", md: "400px" }}
              type="file"
              display="none"
              // visibility="hidden"
              height={"40px"}
              border={"1px solid #707070"}
              control={control}
              name="photo"
              id="photo"
              {...register("photo", {
                message: "invalid file",
              })}
              onChange={(e) => handleFileChange("photo", e)}
            />
            <Button
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
            </Button>
            {selectedFiles.photo && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.photo.name}
                </Text>
                <Image
                  src={selectedFiles.photo.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => {
                    console.log("clicked");
                    window.open(selectedFiles.photo.preview, "_blank");
                  }}
                />
              </Box>
            )}

            {errors.photo && (
              <Text color="red.500">{errors.photo.message}</Text>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Upload Aadhar Card</FormLabel>
            <Input
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
                message: "invalid File",
              })}
              onChange={(e) => handleFileChange("aadhar", e)} // Make sure "aadhar" is the correct inputName
            />
            <Button
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
            </Button>
            {console.log(selectedFiles)}
            {workorderdatanullcheck[0]?.adharcard && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected:
                  {/* {selectedFiles.aadhar.name} */}
                </Text>
                <Image
                  // src={selectedFiles.aadhar.preview}
                  src={workorderdatanullcheck[0]?.adharcard}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => {
                    console.log("clicked");
                    window.open(selectedFiles.aadhar.preview, "_blank");
                  }}
                />
              </Box>
            )}
            {selectedFiles?.aadhar && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected:
                  {/* {selectedFiles.aadhar.name} */}
                </Text>
                <Image
                  // src={selectedFiles.aadhar.preview}
                  src={URL.createObjectURL(selectedFiles?.aadhar?.file)}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => {
                    console.log("clicked");
                    window.open(
                      URL.createObjectURL(selectedFiles?.aadhar?.file),
                      "_blank"
                    );
                  }}
                />
              </Box>
            )}
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
        <Box>
          <FormControl>
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
              name="pan"
              id="pan"
              {...register("pan", {
                message: "invalid file",
              })}
              onChange={(e) => handleFileChange("pan", e)}
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
            </Button>
            {workorderdatanullcheck[0]?.pancard && (
              // selectedFiles.pan
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected:
                  {/* {selectedFiles.pan.name} */}
                </Text>
                <Image
                  src={workorderdatanullcheck[0]?.pancard}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => {
                    window.open(
                      // selectedFiles.pan.preview
                      workorderdatanullcheck[0]?.pancard,
                      "_blank"
                    );
                  }}
                />
              </Box>
            )}
            {selectedFiles.pan && (
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
                    src={URL.createObjectURL(selectedFiles.pan.file)}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      console.log("clicked");
                      window.open(selectedFiles.aadhar.preview, "_blank");
                    }}
                  />
                </Box>
              </>
            )}
            {errors.pan && <Text color="red.500">{errors.pan.message}</Text>}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Upload Electricity Bill</FormLabel>
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
              name="electricity"
              id="electricity"
              {...register("electricity", {
                message: "Invalid file",
              })}
              onChange={(e) => handleFileChange("electricity", e)} // Make sure "electricity" is the correct inputName
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
            </Button>
            {console.log(workorderdatanullcheck[0]?.electricitybill)}
            {
              // selectedFiles.electricity
              workorderdatanullcheck[0]?.electricitybill && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected:
                    {/* {selectedFiles.electricity.name} */}
                  </Text>
                  <Image
                    // src={selectedFiles.electricity.preview}
                    src={workorderdatanullcheck[0]?.electricitybill}
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      window.open(
                        workorderdatanullcheck[0]?.electricitybill,
                        "_blank"
                      );
                    }}
                  />
                </Box>
              )
            }
            {selectedFiles?.electricity && (
              // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected:
                  {/* {selectedFiles.aadhar.name} */}
                </Text>
                <Image
                  // src={selectedFiles.aadhar.preview}
                  src={URL.createObjectURL(selectedFiles?.electricity?.file)}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => {
                    console.log("clicked");
                    window.open(
                      URL.createObjectURL(selectedFiles?.electricity?.file),
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
      </Stack>

      {/* Tax receipt and power of attorney */}
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={50}
        alignItems="center"
        mx="1rem"
        mt="2rem"
      >
        <Box>
          <FormControl>
            <FormLabel>Upload Tax Receipt</FormLabel>
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
              name="tax"
              id="tax" // Add an id to match the htmlFor in the label
              {...register("tax", {
                message: "Invalid file",
              })}
              onChange={(e) => handleFileChange("tax", e)}
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
            </Button>
            {
              // selectedFiles.tax
              workorderdatanullcheck[0]?.taxreceipt && (
                <Box mt={2}>
                  <Text color="green.500">
                    File selected:
                    {/* {selectedFiles.tax.name} */}
                  </Text>
                  <Image
                    src={
                      // selectedFiles.tax.preview
                      workorderdatanullcheck[0]?.taxreceipt
                    }
                    alt="Preview"
                    w="150px"
                    h="150px"
                    borderRadius="15px"
                    cursor="pointer"
                    onClick={() => {
                      window.open(
                        workorderdatanullcheck[0]?.taxreceipt,
                        "_blank"
                      );
                    }}
                  />
                </Box>
              )
            }
            {selectedFiles?.tax && (
              // setWorkordernullcheck(workorderdatanullcheck[0]?.electricitybill = ""),
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected:
                  {/* {selectedFiles.aadhar.name} */}
                </Text>
                <Image
                  // src={selectedFiles.aadhar.preview}
                  src={URL.createObjectURL(selectedFiles?.tax?.file)}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => {
                    console.log("clicked");
                    window.open(
                      URL.createObjectURL(selectedFiles?.tax?.file),
                      "_blank"
                    );
                  }}
                />
              </Box>
            )}
            {errors.tax && <Text color="red.500">{errors.tax.message}</Text>}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Power of Attorney</FormLabel>
            <Input
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
                message: "Invalid File",
              })}
              onChange={(e) => handleFileChange("attorney", e)}
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
            </Button>
            {selectedFiles.attorney && (
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
                  cursor="pointer"
                  onClick={() => {
                    window.open(selectedFiles.attorney.preview, "_blank");
                  }}
                />
              </Box>
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
        <Box>
          <FormControl>
            <FormLabel>Annexure-2</FormLabel>
            <Input
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
                message: "invalid file",
              })}
              onChange={(e) => handleFileChange("annexure", e)}
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
            </Button>
            {selectedFiles?.annexure && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected:
                  {/* {selectedFiles.annexure.name} */}
                </Text>
                <Image
                  src={URL.createObjectURL(selectedFiles?.annexure?.file)}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => {
                    window.open(selectedFiles.annexure.preview, "_blank");
                  }}
                />
              </Box>
            )}
            {errors.annexure && (
              <Text color="red.500">{errors.annexure.message}</Text>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Application Form (A-1 Form)</FormLabel>
            <Input
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
                message: "invalid File",
              })}
              onChange={(e) => handleFileChange("application", e)}
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
            </Button>
            {selectedFiles.application && (
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
                  cursor="pointer"
                  onClick={() => {
                    window.open(selectedFiles.application.preview, "_blank");
                  }}
                />
              </Box>
            )}
            {errors.application && (
              <Text color="red.500">{errors.application.message}</Text>
            )}
          </FormControl>
        </Box>
      </Stack>

      {/* save button */}
      <Button
        backgroundColor={"#FF9130"}
        color={"#ffffff"}
        colorScheme="teal"
        ml={"15px"}
        mt={"30px"}
        isDisabled={clientid === null || clientid === undefined}
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Documents;
