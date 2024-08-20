import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import WorkflowService from "../../../services/workflow-service";
import type { WorkflowInstance } from "../../../common/interface";
import { InstanceState } from "../../../common/interface";
import { INSTANCE_STATE_COLOR_MAP } from "../../../common/constants";

type WorkflowInstanceWithLogs = WorkflowInstance & {
  instanceLogs: string;
};

const WorkflowInstance = () => {
  const { instanceId } = useParams();
  if (!instanceId) return;

  const [instance, setInstance] = useState({} as WorkflowInstanceWithLogs);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { instance } = await WorkflowService.getWorkflowInstance(instanceId);
        setInstance(instance);
        setLoading(false);
      } catch (_err) {
        return alert("Something went wrong.");
      }
    };
    fetchData();
  }, []);

  const handleArchiveInstance = async () => {
    setLoading(true);
    try {
      await WorkflowService.archiveWorkflowInstance(instanceId);
      navigate(0);
    } catch (_err) {
      setLoading(false);
      return alert("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }
  return (
    <div className="workflow-instance container">
      <div className="card border">
        <div className="header">
          <div>
            <div className={`tag tag-${INSTANCE_STATE_COLOR_MAP[instance.state]}`}>{instance.state}</div>
            <p>{new Date(instance.executionTimestamp).toUTCString()}</p>
          </div>
          <div>
            {![InstanceState.SUCCESS, InstanceState.FAILED, InstanceState.ARCHIVED].includes(instance.state) && (
              <button className="btn danger-button" onClick={handleArchiveInstance}>
                Archive instance
              </button>
            )}
          </div>
        </div>
        <div className="instance-logs border">
          CONTAINER LOGS FOR : {instanceId}
          <pre>{instance.instanceLogs}</pre>
        </div>
      </div>
    </div>
  );
};

export default WorkflowInstance;
