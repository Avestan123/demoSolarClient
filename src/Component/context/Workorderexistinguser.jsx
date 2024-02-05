import { createContext, useEffect, useState } from "react";
import axios from "axios";
const WorkorderExistinguser = createContext();

const userRole = localStorage.getItem("role");

export default WorkorderExistinguser;

export const WorkOrderDetailsProvide = ({ children }) => {
  const [workorderdetails, setworkorderdetails] = useState();

  const getclientworkorderDetails = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    try {
      //   console.log(workOrderData?._id);
      const id = localStorage.getItem("workorderid");
      let res = await axios.get(
        `${apiUrl}/workOrder/get_client_work_details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        setExistinguser(res.data.orders.clientInfo[0]);
        setworkorderdetails(res.data.orders.clientInfo[0]);
        console.log(res.data.orders.clientInfo[0]);
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

  useEffect(() => {
    getclientworkorderDetails();
  });

  return (
    <WorkorderExistinguser.Provider
      value={{
        workorderdetails,
        setworkorderdetails,
      }}
    >
      {children}
    </WorkorderExistinguser.Provider>
  );
};
