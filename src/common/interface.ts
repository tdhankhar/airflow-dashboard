export type WorkflowConfig = {
  id: string;
  workflowName: string;
  active: boolean;
  cronExpression: string;
  baseImage: string;
  createdAt: string;
  updatedAt: string;
};

export enum InstanceState {
  SCHEDULED = "SCHEDULED",
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  ARCHIVED = "ARCHIVED",
}

export type WorkflowInstance = {
  id: string;
  state: InstanceState;
  executionTimestamp: string;
  createdAt: string;
  updatedAt: string;
  workflowId: string;
};
