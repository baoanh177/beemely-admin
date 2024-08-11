import { EActiveStatus } from "@/shared/enums/status";

export interface ILabel {
  id: string;
  name: string;
  description?: string;
  status: EActiveStatus;
}
