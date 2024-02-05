import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import RootLayout from "./Component/Layout/RootLayout";
import DashboardOverview from "./Component/Dashboard/DashboardOverview/DashboardOverview";
// import Dashboard from "./Component/Dashboard/Dashboard";
import NewLeads from "./Component/Dashboard/NewLeads/NewLeads";
import Onboarding from "./Component/Dashboard/Onboarding/Onboarding";
// import SignOut from "./Component/Dashboard/SignOut/SignOut";
import FollowUP from "./Component/Dashboard/FollowUP/FollowUp";
// import InProgress from "./Component/Dashboard/InProgress/InProgress";
import NewLeadsform from "./Component/Dashboard/NewLeads/NewLeadsform";
import Login from "./Component/Login/Login"; // Import your Login component
import ProtectedRoute from "./Component/Protected/ProtectedRoute";
import ViewForm from "./Component/Dashboard/NewLeads/ViewForm";
import AddEmployee from "./Component/Dashboard/Employee/AddEmployee";
import NewEmployee from "./Component/Dashboard/Employee/NewEmployee";
import EmpViewForm from "./Component/Dashboard/Employee/EmpViewForm";

//import AddProduct from "./Component/Dashboard/Product/AddProduct";
//import NewProduct from "./Component/Dashboard/Product/NewProduct";

import TodaysLeads from "./Component/Dashboard/DashboardOverview/TodaysLeads";
import WorkOrder from "./Component/Dashboard/WorkOrder/WorkOrder";
import WorkOrderLanding from "./Component/Dashboard/WorkOrder/WorkOrderLanding";
import WorkOrderView from "./Component/Dashboard/WorkOrder/WorkOrderView";
import LostLeads from "./Component/Dashboard/LostLeads/LostLeads";
//import EmpViewProduct from "./Component/Dashboard/EmpProducte/EmpViewForm";

// Transfer Leads
import TransferLeads from "./Component/Dashboard/TransferedLeads/TransferedLeads";

// Assigned Leads
import AssignedLeads from "./Component/Dashboard/AssignedLeads/AssignedLeadsTable";
import Customers from "./Component/Dashboard/Customers/Customers";
import NextDay from "./Component/Dashboard/NextDay/NextDay";
import Upcoming from "./Component/Dashboard/Upcoming/Upcoming";
import Missed from "./Component/Dashboard/Missed/Missed";
import HighValueleadsTable from "./Component/Dashboard/HighValueLeads/HighValueleadsTable";
import HighValueLeadsForm from "./Component/Dashboard/HighValueLeads/HighValueLeadsForm";
import NextDayDetails from "./Component/Dashboard/NextDay/NextDayDetails";
import Documents from "./Component/Dashboard/WorkOrder/Documents";
import ClientInformation from "./Component/Dashboard/WorkOrder/ClientInformation";
import PlantDetails from "./Component/Dashboard/WorkOrder/PlantDetails";
import PendingLeads from "./Component/Dashboard/PendingLeads/PendingLeads";
import PendingWorkOrderDetails from "./Component/Dashboard/PendingLeads/PendingWorkOrderDetails";
import { SalesManagersLeadsTable } from "./Component/Dashboard/SalesManagerLeads/SalesManagersLeadsTable";
import SalesManagerLeadsForm from "./Component/Dashboard/SalesManagerLeads/SalesManagerLeadsForm";
import Morethan3followupsTable from "./Component/Dashboard/Morethan3Followups/Morethan3followupsTable";
import Morethan3followupform from "./Component/Dashboard/Morethan3Followups/Morethan3followupform";
import DyanamicDashboard from "./Component/Dashboard/DashboardOverview/DyanamicDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        {/* Use the "index" attribute to specify the default child route */}
        <Route
          index
          element={<ProtectedRoute Component={DashboardOverview} />}
        />
        <Route
          path="followup"
          element={<ProtectedRoute Component={FollowUP} />}
        />
        <Route
          path="nextday"
          element={<ProtectedRoute Component={NextDay} />}
        />
        <Route
          path="nextday/:id"
          element={<ProtectedRoute Component={NextDayDetails} />}
        />
        <Route
          path="upcoming"
          element={<ProtectedRoute Component={Upcoming} />}
        />
        <Route path="missed" element={<ProtectedRoute Component={Missed} />} />
        <Route
          path="customers"
          element={<ProtectedRoute Component={Customers} />}
        />
        <Route
          path="newleads"
          element={<ProtectedRoute Component={NewLeads} />}
        />
        <Route
          path="newleads/form"
          element={<ProtectedRoute Component={NewLeadsform} />}
        />
        <Route
          path="newleads/viewform"
          element={<ProtectedRoute Component={ViewForm} />}
        />

        {/*Sales Manager- My Leads */}
        <Route
          path="getmyleads"
          element={<ProtectedRoute Component={SalesManagersLeadsTable} />}
        />
        {/* <Route
          path="getmyleads/:customerId"
          element={<ProtectedRoute Component={SalesManagerLeadsForm} />}
        /> */}
        <Route
          path="newEmpoyee"
          element={<ProtectedRoute Component={NewEmployee} />}
        />
        <Route
          path="newEmpoyee/addEmployee"
          element={<ProtectedRoute Component={AddEmployee} />}
        />
        <Route
          path="newEmpoyee/empViewForm"
          element={<ProtectedRoute Component={EmpViewForm} />}
        />
        <Route
          path="todayleads"
          element={<ProtectedRoute Component={TodaysLeads} />}
        />

        <Route
          path="onboarding"
          element={<ProtectedRoute Component={Onboarding} />}
        />

        {/* work order route */}

        <Route
          path="workorder"
          element={<ProtectedRoute Component={WorkOrderLanding} />}
        />
        <Route
          path="workorder/:customerId"
          element={<ProtectedRoute Component={WorkOrderView} />}
        />
        <Route
          path="workorder/WorkOrderform"
          element={<ProtectedRoute Component={WorkOrder} />}
        />
        <Route
          path="workorder/WorkOrderform"
          element={<ProtectedRoute Component={WorkOrder} />}
        />
        <Route
          path="workorder/WorkOrderform/client-information"
          element={<ProtectedRoute Component={ClientInformation} />}
        />
        <Route
          path="workorder/WorkOrderform/documents"
          element={<ProtectedRoute Component={Documents} />}
        />
        <Route
          path="workorder/WorkOrderform/plant-details"
          element={<ProtectedRoute Component={PlantDetails} />}
        />
        {/* </Route> */}

        <Route
          path="lostleads"
          element={<ProtectedRoute Component={LostLeads} />}
        />

        {/* Route for Transfer Leads */}

        <Route
          path="transferleads"
          element={<ProtectedRoute Component={TransferLeads} />}
        />

        {/* Assigned Leads Route */}

        <Route
          path="assignedleads"
          element={<ProtectedRoute Component={AssignedLeads} />}
        />
        <Route
          path="lostleads"
          element={<ProtectedRoute Component={LostLeads} />}
        />

        {/* High Value Leads */}
        <Route
          path="highvalueleads"
          element={<ProtectedRoute Component={HighValueleadsTable} />}
        />
        <Route
          path="highvalueleads/:customerId"
          element={<ProtectedRoute Component={HighValueLeadsForm} />}
        />

        {/* Pending Leads  */}
        <Route
          path="pendingleads"
          element={<ProtectedRoute Component={PendingLeads} />}
        />

        <Route
          path="pendingworkorderdetails"
          element={<ProtectedRoute Component={PendingWorkOrderDetails} />}
        />

        {/* More than 3 FollowUps Route */}
        <Route
          path="morethan3followups"
          element={<ProtectedRoute Component={Morethan3followupsTable} />}
        />

        <Route
          path="morethan3followups/:id"
          element={<ProtectedRoute Component={Morethan3followupform} />}
        />
        <Route
          path="dyanamicdashboard"
          element={<ProtectedRoute Component={DyanamicDashboard} />}
        />
        {/* Uncomment the following line if you have a SignOut component */}
        {/* <Route path="signout" element={<ProtectedRoute element={<SignOut />} />} /> */}
      </Route>

      {/* ?? Testing route for dyanamic dashboard */}
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
