import { Reply } from "./reply";

export interface Tweet {
  tid:string;
  email:string;
  tweet:string;
  likes:string[];
  created:Date;
  replies:Reply[];
}
