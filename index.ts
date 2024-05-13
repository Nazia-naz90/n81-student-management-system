#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Defined a student class
class Student{           // PARENTS CLASS
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string){
    this.id =Student.counter ++ ;
    this.name = name;
    this.courses =[]; // Initialize an empty Array for courses
    this.balance = 100;
  }
  // Method to enrol a student in a course
  enrol_course(course:string){
    this.courses.push(course);    
  }
  // Method to View a student balance
  view_balance(){
    console.log(chalk.green(`Balance for ${this.name} : $${this.balance}`));
    
  }
  // Method to pay student fees
  pay_fees(amount:number){
      this.balance -=amount;
      console.log(chalk.bgMagentaBright(`$${amount}Fees paid successfully for ${this.name}`));
      console.log(chalk.bold.bgCyan(`Remaining Balance : $${this.balance}`));
      
  }
  // Method to display student status
  show_status(){
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.courses}`);
    console.log(`Balance: ${this.balance}`);
    }
}
// Defining a Student Manager
class Student_manager{         // SUB CLASS
  students: Student[]

  constructor(){
    this.students = [];
  }
  //Method to add a new student
  add_student(name: string){
   let student = new Student(name); 
   this.students.push( student);
   console.log(chalk.greenBright(`Student: ${name} added successfully. Student's id ${student.id}`));
   
  }
  // Method to enroll a student in a course
  enroll_student(Student_id: number, course:string){
  let student=  this.find_student(Student_id);
if(student){
 student.enrol_course(course);
 console.log(chalk.bold.magentaBright(`${student.name} enrolled in ${course} successfully`));
}  
}

// Method to view a student balance
view_student_balance(Student_id:number){
  let student=  this.find_student(Student_id);
 if(student){
  student.view_balance();
  } 
  else{
    console.log(chalk.bold.redBright("Student not found please enter a correct student ID"));
    
   }
}
// Method to pay student fees
pay_student_fees(Student_id:number,amount:number){
  let student = this.find_student(Student_id);
  if(student){
    student.pay_fees(amount); 
  }
  else{
    console.log(chalk.bold.redBright("Student not found. Please enter a correct student ID"));
    
  }
}



// Method to display student status
show_student_status(Student_id:number){
let student = this.find_student(Student_id);
if(student){
student.show_status();
}
}



// Method to find a student by student_id
find_student(Student_id:number){
  return this.students.find(std => std.id === Student_id);
}
}

// Main function to run the program
async function main() {
  console.log(chalk.bold.yellowBright.underline("Welcome to 'CodeWithNazia' - Student Management system"));
  console.log(chalk.bold.yellowBright("-".repeat(60)));
  console.log(chalk.bold.yellowBright("-".repeat(60)));
  
  let student_manager =new Student_manager();

  // While loop to keep program running
  while(true){
     let choice = await inquirer.prompt([
      {
        name: "choice",
        type : "list",
        message : "Select an option",
        choices : ["Add Student",
          "Enrol student",
          "View Student Balance",
          "Pay Fees",
          "Show Student's status",
          "Exit",
        ]
        
      }
     ]);
   
     // Using Switch Case to handle user choice
     switch(choice.choice){
     case "Add Student":
      let name_input = await inquirer.prompt([
        {
       name: "name",
       type: "input",
       message:chalk.bold.blueBright( " Enter a student name"),   
        }
      ]);
      student_manager.add_student(name_input.name);
  break;
 
case "Enrol student":
    let course_input = await inquirer.prompt([
      {
       name: "Student_id",
       type: "number",
       message: chalk.bold.blueBright("Enter a student ID"),

      },
      {
            name: "course",
            type: "input",
            message:chalk.bold.cyan( "Enter a course Name !"),
      }
    ]);
    student_manager.enroll_student(course_input.Student_id,course_input.course);
   break;

   case "View Student Balance":
    let balance_input = await inquirer .prompt([
      {
        name: "Student_id",
        type: "number",
        message: chalk.bold.blue("Enter a student ID !"),
      }
    ]);
    student_manager.view_student_balance(balance_input.Student_id);
    break;

    case "Pay Fees":
      let fees_input = await inquirer.prompt([
        {
          name: "Student_id",
          type: "number",
          message: chalk.bold.blue("Enter a student ID"),
        },
        {
          name: "amount",
          type: "number",
          message: chalk.bold.greenBright("Enter the amount to pay .")
        }
      ]);
      student_manager.pay_student_fees(fees_input.Student_id,fees_input.amount);
      break;

      case "Show Student's status":
        let status_input = await inquirer.prompt([
          {
           name: "Student_id",
           type: "number",
           message:"Enter a student Id",
          }
        ]);
        student_manager.show_student_status(status_input.Student_id);
        break;

        case "Exit":
          console.log(chalk.bold.green("Existing....."));
          process.exit();
          
     }
   
  }
} 

// Calling a main function
main();