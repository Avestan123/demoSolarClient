import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./Component/context/AuthContext.jsx";
import { UserProvider } from "./Component/context/UserContext.jsx";
import { FormProvider } from "./Component/context/WorkOrderFormContext.jsx";
import { EmployeeProvider } from "./Component/context/EmployeeContext.jsx";
import { WorkOrderDetailsProvide } from "./Component/context/Workorderexistinguser.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <AuthProvider>
      <UserProvider>
        <FormProvider>
          <EmployeeProvider>
            <WorkOrderDetailsProvide>
              <App />
            </WorkOrderDetailsProvide>
          </EmployeeProvider>
        </FormProvider>
      </UserProvider>
    </AuthProvider>
  </ChakraProvider>
);
