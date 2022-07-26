import { Tweet } from "./tweet";

export interface User {
  id:number;
  firstName:string;
  lastName:string;
  gender:string;
  dob:Date;
  email:string;
  password:string;
  tweets?:Tweet[];
}
