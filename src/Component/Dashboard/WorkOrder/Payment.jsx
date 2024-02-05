import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Switch,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
  Box,
  Button,
  ButtonGroup,
  Stack,
  useToast,
  Text,
  Spinner,
  Select,
  Checkbox,
  CheckboxGroup,
  border,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx";
const Payment = () => {
  const { state, updateFormData, clearFormData } = useWorkForm();
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
  const [projectCost, setProjectCost] = useState();
  const [installmentAmount, setInstallmentAmount] = useState();
  const [remainingBalance, setRemainingBalance] = useState();
  const [installmentError, setInstallmentError] = useState("");
  const [loading, setLoading] = useState(false);



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

  useEffect(() => {
    remaningamountfunction();
  }, [projectCost, installmentAmount]);


  const toast = useToast();
  const clientId = localStorage.getItem("client_id");
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  if (clientId === null || clientId === undefined || clientId === "") {
    toast({
      title: "Please Fill Client Information First.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  // payment modes
  const PaymentModes = ["Cash", "Cheque", "UPI"];
  // state for product save
  const [payment, setPayment] = useState([
    {
      installment: "",
      projectCost: "",
      paymentMode: "",
      paymentDate: "",
      percentage: "",
      paymentAmount: "",
      remainingBalance: "",
    },
  ]);

  // handle input change
  const handleInputChange = (index, key, value) => {
    const updatedProducts = [...payment];
    updatedProducts[index][key] = value;
    setPayment(updatedProducts);
    console.log("Payment >>>>>>> ");
  };

  // add payment handler
  const handleAddInstallement = () => {
    setPayment([
      ...payment,
      {
        installment: "",
        projectCost: "",
        paymentMode: "",
        paymentDate: "",
        percentage: "",
      },
    ]);
  };

  const submitHandler = async (data) => {
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    console.log(data);
    setLoading(true);
    const formdata = getValues();
    const remaningbalance = formdata.remainingBalance;
    console.log(remaningamountfunction, "$$$$$");
    console.log(formdata, "@@@@@@@");
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/addPaymentDetails/${clientId}`,
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
        setLoading(false);
        toast({
          title: "Payment Details Added Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

      } else {
        // resetForm(data);
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
      setLoading(false);
      toast({
        title: `${err.response.data.error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.error(err);
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
    <Box>
      <Box>
        <Flex
          direction={{ base: "column" }}
          justify="center"
          align="start"
          gap="5"
          mt={5}
        >
          {payment.map((payment, index) => (
            <Box key={index}>
              {/* installment and project Cost */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={6}
                alignItems="center"
                mx="1rem"
              >
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
                      {...register("installment", {
                        required: "Installment is required",
                        message: "Invalid Input",
                      })}
                      onChange={(e) => {
                        setValue("installment", e.target.value);
                      }}
                    >
                      <option value="Advance">Advance</option>
                      <option value="1st installment">1st Installment</option>
                      <option value="2nd installment">2nd Installment</option>
                      <option value="3rd installment">3rd Installment</option>
                      <option value="final installment">
                        Final Installment
                      </option>
                    </Select>
                    {errors.installment && (
                      <Text color="red.500">{errors.installment.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel>Project Cost </FormLabel>
                    <Input
                      // ref={projectCostRef}
                      marginTop={"0.2rem"}
                      placeholder="Project Cost"
                      type="text"
                      width={{ base: "120%", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="projectCost"
                      value={projectCost}
                      {...register("projectCost", {
                        required: "Project Cost is required",
                        message: "Invalid Input",
                      })}
                      onChange={handleProjectCostChange}
                    />
                    {errors.projectCost && (
                      <Text color="red.500">{errors.projectCost.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* payment mode */}
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
                      onChange={(e) =>
                        handleInputChange(index, "payment", e.target.value)
                      }
                      value={watch("paymentMode")}
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
                      <Text color="red.500">{errors.paymentMode.message}</Text>
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
                      // min={getCurrentDate()} // Set the minimum date
                      // control={control}
                      name="paymentDate"
                      {...register("paymentDate", {
                        required: "Payment Date is required",
                        message: "Invalid Inputs",
                      })}
                    />
                    {errors.paymentDate && (
                      <Text color="red.500">{errors.paymentDate.message}</Text>
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
                    <FormLabel>Payment Amount </FormLabel>
                    <Input
                      // ref={installmentsef}
                      marginTop={"0.2rem"}
                      placeholder="Installment Amount"
                      type="number"
                      width={{ base: "120%", md: "100%" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      name="paymentAmount"
                      {...register("paymentAmount", {
                        message: "Invalid Input",
                      })}
                      // value={payment?.percentage}
                      // value={installmentAmount}
                      onChange={handleInstallmentAmountChange}
                    />
                    {errors.paymentAmount && (
                      <Text color="red.500">{installmentError}</Text>
                    )}
                  </FormControl>
                </Box>

                <Box width="50%">
                  <FormControl>
                    <FormLabel>Remaining Balance</FormLabel>
                    <Input
                      marginTop={"0.2rem"}
                      placeholder="Installment Amount"
                      type="number"
                      width={{ base: "120%", md: "100%" }}
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
        </Flex>
      </Box>



      <Center>
        {/* save payment */}
        <Button
          colorScheme="green"
          color={"#ffffff"}
          ml={"15px"}
          mt={"30px"}
          onClick={handleSubmit(submitHandler)}
          size="lg"
        >
          Save
        </Button>
      </Center>
    </Box>
  );
};

export default Payment;
