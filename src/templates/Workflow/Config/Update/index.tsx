import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import WorkflowService from "../../../../services/workflow-service";

const UpdateWorkflowConfig = () => {
  const { workflowId } = useParams();
  if (!workflowId) return;

  const [workflowName, setWorkflowName] = useState("");
  const [cronExpression, setCronExpression] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { config } = await WorkflowService.getWorkflowConfig(workflowId);
        setWorkflowName(config.workflowName);
        setCronExpression(config.cronExpression);
        setBaseImage(config.baseImage);
        setLoading(false);
      } catch (_err) {
        return alert("Something went wrong.");
      }
    };
    fetchData();
  }, []);

  const handleCronExpressionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCronExpression(e.target.value);
  };
  const handleBaseImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseImage(e.target.value);
  };
  const handleUpdateConfig = async () => {
    setLoading(true);
    try {
      await WorkflowService.updateWorkflowConfig({ workflowId, active: false, cronExpression, baseImage });
      navigate(`/workflow/${workflowId}`);
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
    <div className="workflow-config container">
      <div className="card border">
        <div className="header">
          <div>
            <h1>Update workflow</h1>
            <p>Edit configurations to update your workflow.</p>
          </div>
        </div>
        <div className="form">
          <div className="field">
            <div className="label">Workflow name</div>
            <input disabled className="border" placeholder="Eg: test" value={workflowName} />
          </div>
          <div className="field">
            <div className="label">Cron expression</div>
            <input
              className="border"
              placeholder="Eg: 0 0 * * *"
              value={cronExpression}
              onChange={handleCronExpressionChange}
            />
            <p>* Put @once for one-time workflows</p>
            <a href="https://crontab.guru" target="_blank">
              crontab.guru
            </a>
            <p>* Verify your cron expression before submitting.</p>
          </div>
          <div className="field">
            <div className="label">Base image</div>
            <input className="border" placeholder="Eg: test-service" value={baseImage} onChange={handleBaseImageChange} />
          </div>
          <button className="btn dark-button" onClick={handleUpdateConfig}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateWorkflowConfig;
