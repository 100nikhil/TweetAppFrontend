import { Reply } from "./reply";

export interface Tweet {
  tid:string;
  tweet:string;
  like:boolean;
  created:string;
  replies:Reply[];
}
