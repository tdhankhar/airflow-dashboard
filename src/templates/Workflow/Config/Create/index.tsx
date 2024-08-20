import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import WorkflowService from "../../../../services/workflow-service";

const CreateWorkflowConfig = () => {
  const [workflowName, setWorkflowName] = useState("");
  const [cronExpression, setCronExpression] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleWorkflowNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkflowName(e.target.value);
  };
  const handleCronExpressionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCronExpression(e.target.value);
  };
  const handleBaseImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseImage(e.target.value);
  };
  const handleCreateConfig = async () => {
    if (workflowName.length < 3) {
      return alert("Workflow name is invalid.");
    }
    setLoading(true);
    try {
      await WorkflowService.createWorkflowConfig({ workflowName, cronExpression, baseImage });
      navigate("/");
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
            <h1>Create workflow</h1>
            <p>Enter configurations to create your new workflow.</p>
          </div>
        </div>
        <div className="form">
          <div className="field">
            <div className="label">Workflow name</div>
            <input className="border" placeholder="Eg: test" value={workflowName} onChange={handleWorkflowNameChange} />
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
          <button className="btn dark-button" onClick={handleCreateConfig}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkflowConfig;
