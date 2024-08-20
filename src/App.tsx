import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./templates/Home";
import Workflow from "./templates/Workflow";
import CreateWorkflowConfig from "./templates/Workflow/Config/Create";
import UpdateWorkflowConfig from "./templates/Workflow/Config/Update";
import WorkflowInstance from "./templates/Workflow/Instance";
import Signup from "./templates/Auth/Signup";
import Login from "./templates/Auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/workflow/:workflowId"
          element={
            <AuthRoute>
              <Workflow />
            </AuthRoute>
          }
        />
        <Route
          path="/workflow/config/create"
          element={
            <AuthRoute>
              <CreateWorkflowConfig />
            </AuthRoute>
          }
        />
        <Route
          path="/workflow/config/:workflowId"
          element={
            <AuthRoute>
              <UpdateWorkflowConfig />
            </AuthRoute>
          }
        />
        <Route
          path="/workflow/instance/:instanceId"
          element={
            <AuthRoute>
              <WorkflowInstance />
            </AuthRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
