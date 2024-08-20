import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import WorkflowService from "../../services/workflow-service";
import type { WorkflowConfig, WorkflowInstance } from "../../common/interface";
import { INSTANCE_STATE_COLOR_MAP } from "../../common/constants";

const Workflow = () => {
  const { workflowId } = useParams();
  if (!workflowId) return;

  const [config, setConfig] = useState({} as WorkflowConfig);
  const [instances, setInstances] = useState([] as WorkflowInstance[]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ config }, { instances }] = await Promise.all([
          WorkflowService.getWorkflowConfig(workflowId),
          WorkflowService.getWorkflowInstances(workflowId),
        ]);
        setConfig(config);
        setInstances(instances);
        setLoading(false);
      } catch (_err) {
        return alert("Something went wrong.");
      }
    };
    fetchData();
  }, []);

  const handleTriggerInstance = async () => {
    setLoading(true);
    try {
      await WorkflowService.triggerWorkflowInstance(workflowId);
      navigate(0);
    } catch (_err) {
      setLoading(false);
      return alert("Something went wrong.");
    }
  };
  const handleEnableWorkflow = async () => {
    setLoading(true);
    try {
      await WorkflowService.updateWorkflowConfig({ workflowId, active: true });
      navigate(0);
    } catch (_err) {
      setLoading(false);
      return alert("Something went wrong.");
    }
  };
  const handleDisableWorkflow = async () => {
    setLoading(true);
    try {
      await WorkflowService.updateWorkflowConfig({ workflowId, active: false });
      navigate(0);
    } catch (_err) {
      setLoading(false);
      return alert("Something went wrong.");
    }
  };
  const handleUpdateWorkflow = () => {
    return navigate(`/workflow/config/${workflowId}`);
  };

  if (loading) {
    return (
      <div className="container">
        <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }
  return (
    <div className="workflow container">
      <div className="card border">
        <div className="header">
          <div>
            <h1>{config.workflowName}</h1>
            <p>Here are the instances present in this workflow.</p>
          </div>
          <div>
            <button className="btn dark-button" onClick={handleTriggerInstance}>
              Trigger new instance
            </button>
            {config.active ? (
              <button className="btn danger-button" onClick={handleDisableWorkflow}>
                Disable workflow
              </button>
            ) : (
              <button className="btn light-button" onClick={handleEnableWorkflow}>
                Enable workflow
              </button>
            )}
            <button className="btn light-button" onClick={handleUpdateWorkflow}>
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
        </div>
        <Table<WorkflowInstance>
          columns={[
            {
              title: "Instance",
              key: "id",
              render: (row) => String(row.id),
            },
            {
              title: "State",
              key: "state",
              render: (row) => <div className={`tag tag-${INSTANCE_STATE_COLOR_MAP[row.state]}`}>{String(row.state)}</div>,
            },
            {
              title: "Execution timestamp",
              key: "executionTimestamp",
              render: (row) => String(new Date(row.executionTimestamp).toUTCString()),
            },
            {
              title: "Updated at",
              key: "updatedAt",
              render: (row) => String(new Date(row.updatedAt).toUTCString()),
            },
          ]}
          rows={instances}
          onRow={(row: WorkflowInstance) => ({
            onClick: () => navigate(`/workflow/instance/${row.id}`),
          })}
        />
      </div>
    </div>
  );
};

export default Workflow;
