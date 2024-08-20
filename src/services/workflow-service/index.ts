import ServerConfigs from "../../../configs/server.json";
import axios from "axios";

axios.defaults.withCredentials = true;

const getWorkflowConfigs = async () => {
  const response = await axios.get(`${ServerConfigs.apiUrl}/workflows`);
  return response.data;
};

const getWorkflowConfig = async (workflowId: string) => {
  const response = await axios.get(`${ServerConfigs.apiUrl}/workflow/${workflowId}`);
  return response.data;
};

const createWorkflowConfig = async (data: { workflowName: string; cronExpression: string; baseImage: string }) => {
  const response = await axios.post(`${ServerConfigs.apiUrl}/workflow`, data);
  return response.data;
};

const updateWorkflowConfig = async (data: {
  workflowId: string;
  active: boolean;
  cronExpression?: string;
  baseImage?: string;
}) => {
  const response = await axios.put(`${ServerConfigs.apiUrl}/workflow`, data);
  return response.data;
};

const getWorkflowInstances = async (workflowId: string) => {
  const response = await axios.get(`${ServerConfigs.apiUrl}/workflow/${workflowId}/instances`);
  return response.data;
};

const triggerWorkflowInstance = async (workflowId: string) => {
  const response = await axios.post(`${ServerConfigs.apiUrl}/workflow/instance/trigger`, {
    workflowId,
  });
  return response.data;
};

const archiveWorkflowInstance = async (instanceId: string) => {
  const response = await axios.put(`${ServerConfigs.apiUrl}/workflow/instance/archive`, {
    instanceId,
  });
  return response.data;
};

const getWorkflowInstance = async (instanceId: string) => {
  const response = await axios.get(`${ServerConfigs.apiUrl}/workflow/instance/${instanceId}`);
  return response.data;
};

export default {
  getWorkflowConfigs,
  getWorkflowConfig,
  createWorkflowConfig,
  updateWorkflowConfig,
  getWorkflowInstances,
  triggerWorkflowInstance,
  archiveWorkflowInstance,
  getWorkflowInstance,
};
