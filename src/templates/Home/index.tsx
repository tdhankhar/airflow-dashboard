import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import WorkflowService from "../../services/workflow-service";
import type { WorkflowConfig } from "../../common/interface";

const Home = () => {
  const [configs, setConfigs] = useState([] as WorkflowConfig[]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { configs } = await WorkflowService.getWorkflowConfigs();
        setConfigs(configs);
        setLoading(false);
      } catch (_err) {
        return alert("Something went wrong.");
      }
    };
    fetchData();
  }, []);

  const handleCreateWorkflow = () => {
    return navigate("/workflow/config/create");
  };

  if (loading) {
    return (
      <div className="container">
        <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }
  return (
    <div className="home container">
      <div className="card border">
        <div className="header">
          <div>
            <h1>Workflows</h1>
            <p>Here are the workflows present in this account.</p>
          </div>
          <div>
            <button className="btn dark-button" onClick={handleCreateWorkflow}>
              Create new workflow
            </button>
          </div>
        </div>
        <Table<WorkflowConfig>
          columns={[
            {
              title: "Name",
              key: "workflowName",
              render: (row) => String(row.workflowName),
            },
            {
              title: "Active",
              key: "active",
              render: (row) => <div className={`tag tag-${row.active ? "green" : "red"}`}>{String(row.active)}</div>,
            },
            {
              title: "Cron expression",
              key: "cronExpression",
              render: (row) => String(row.cronExpression),
            },
            {
              title: "Base image",
              key: "baseImage",
              render: (row) => String(row.baseImage),
            },
            {
              title: "Updated at",
              key: "updatedAt",
              render: (row) => String(new Date(row.updatedAt).toUTCString()),
            },
          ]}
          rows={configs}
          onRow={(row: WorkflowConfig) => ({
            onClick: () => navigate(`/workflow/${row.id}`),
          })}
        />
      </div>
    </div>
  );
};

export default Home;
