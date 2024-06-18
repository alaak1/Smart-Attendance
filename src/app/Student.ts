import {Course} from "./course";

export class Student {
  studentNumber: number;
  studentName: string;
  emailAddress: string;
  password: string;
  course: Course[];

  constructor(studentNumber: number, studentName: string, emailAddress: string, password: string, course: Course[]) {
    this.studentNumber = studentNumber;
    this.studentName = studentName;
    this.emailAddress = emailAddress;
    this.password = password;
    this.course = course;
  }
}
