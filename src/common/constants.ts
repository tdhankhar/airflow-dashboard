import { InstanceState } from "./interface";

const INSTANCE_STATE_COLOR_MAP = {
  [InstanceState.SCHEDULED]: "blue",
  [InstanceState.QUEUED]: "orange",
  [InstanceState.RUNNING]: "cyan",
  [InstanceState.SUCCESS]: "green",
  [InstanceState.FAILED]: "red",
  [InstanceState.ARCHIVED]: "secondary",
};

export { INSTANCE_STATE_COLOR_MAP };
