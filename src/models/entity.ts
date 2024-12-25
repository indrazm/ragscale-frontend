export interface Project {
  id: string;
  name: string;
  description: string;
  document: string;
  summary: string;
  status: "DONE" | "PROCESSING" | "ON-QUEUE";
  user: {
    id: string;
    username: string;
  };
}
