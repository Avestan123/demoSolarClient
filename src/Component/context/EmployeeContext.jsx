import { createContext, useEffect, useState } from "react";

const EmployeeContext = createContext();
const apiUrl = import.meta.env.VITE_APP_API_URL;
const token = localStorage.getItem("token");
const user_id = localStorage.getItem("userId");
console.log(user_id);

const userRole = localStorage.getItem("role");

export default EmployeeContext;

export const EmployeeProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState();
  const [highvalueleads, setHighvaluelead] = useState();
  const [employeeLength, setEmployeesLength] = useState();
  console.log("Employees Data in context", employeeData);

  const setEmployeeDataToState = (employeeData) => {
    setEmployeeData(employeeData);
  };

  const clearEmployeeDataFromState = () => {
    setEmployeeData(null);
  };

  const fetchemployeesList = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/generalUtility/getAllEmployeesForContext`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        }
      );
      const data = await response.json();
      console.log("-------Data from EmployeeContext---------", data);
      // alert("Employee Context fetchempoloyee called", data);
      setEmployeeData(data);
      setEmployeeDataToState(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHighValueLeads = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/sales/getHighValueLeads`, {
        method: "GET",
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("High Value Leads context", data);
      setHighvaluelead(data);
    } catch (error) {
      alert(error);
    }
  };
  // getHighValueLeads();
  useEffect(() => {
    fetchemployeesList();
    getHighValueLeads();

    console.log("Employee Context fetchempoloyee called");
  }, [user_id]);

  useEffect(() => {
    // setLoading(true);
    const getEmployees = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/getAllEmployees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        });
        const data = await response.json();
        console.log(data?.employees);
        if (data) {
          setEmployeesLength(data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employeeData,
        highvalueleads,
        employeeLength,
        fetchemployeesList,
        setEmployeeData,
        setEmployeeDataToState,
        clearEmployeeDataFromState,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
