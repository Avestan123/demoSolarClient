import React from "react";
import { useWorkForm } from "../../../context/WorkFormContext";
import { useToast } from "@chakra-ui/react";

const PendingLiasening = () => {
  const toast = useToast();
  const { state, updateFormData, clearFormData } = useWorkForm();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handleInputChange = (e) => {
    console.log("called");
    const { name, value } = e.target;
    console.log("Context data:", state, name, value);
    // Use the spread operator to clone the liasoningDetails object
    const updatedLiasoningDetails = { ...state.liasoningDetails };
    // Check if the dropdown value is "No" and reset specific fields to zero
    if (name === "requirement" && value === "No") {
      updatedLiasoningDetails.existingName = "";
      updatedLiasoningDetails.newName = "";
      updatedLiasoningDetails[name] = value;
      // Repeat this for other fields that need to be reset
    } else if (name === "load" && value === "No") {
      // Update only the specific field
      updatedLiasoningDetails.existingLoad = "";
      updatedLiasoningDetails.newLoad = "";
      updatedLiasoningDetails[name] = value;
    } else if (name === "meter" && value === "No") {
      updatedLiasoningDetails.existingMeterType = "";
      updatedLiasoningDetails.newMeterType = "";
      updatedLiasoningDetails[name] = value;
    } else {
      updatedLiasoningDetails[name] = value;
    }


    updateFormData("liasoningDetails", updatedLiasoningDetails);
  };
  return <div>PendingLiasening</div>;
};

export default PendingLiasening;
