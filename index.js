const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table');
const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/EmployeeManager_db')


const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'name',
      message: "What is the new department called?",
      type: `input`,
    }])
  .then(newDepartment => {
    db.query("INSERT INTO departments SET ?", newDepartment, err => {
      if(err) {
        console.log(err)
      }
      console.log("New department successfully added");
      mainMenu();
    });
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      message: "What is the new role you are adding?",
      type: `input`,
    },
    {
      name: 'salary',
      message: "What is the salary of the new role you are adding?",
      type: `input`,
    },
    {
      name: 'department_id',
      message: "What is the id of the new role you are adding?",
      type: `input`,
    }
  ])
    .then(role => {
      db.query("INSERT INTO roles SET ?", role, err => {
        if (err) {
          console.log(err)
        }
      console.log("New role successfully added");
      mainMenu();
    });
});
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'first_name',
      message: "What is the first name of the new employee you are adding?",
      type: `input`,
    },
    {
      name: 'last_name',
      message: "What is the last name of the employee you are adding?",
      type: `input`,
    },
    {
      name: 'role_id',
      message: "What is the role id of the new role you are adding?",
      type: `input`,
    },
    {
      message: "Is the employee a manager?",
      type: 'list',
      choices: ["yes", "no"],
      name: 'managerBoolean'

    }
  ])
    .then(employee => {
      if(employee.managerBoolean === 'yes') {
        delete employee.managerBoolean 
        db.query("INSERT INTO employees SET ?", employee, err => {
          if (err) {
            console.log(err)
          }
        console.log("New employee successfully added");
        mainMenu();
      })
         if(employee.managerBoolean === 'no') {
        inquirer.prompt([
          {
          message: 'What is the id of the manager of the employee?',
          name: 'manager_id',
          type: 'input'
          }
      ])
        .then(junior => {
          delete employee.managerBoolean
          let newEmployee = {
            ...employee,
            ...junior, 
          }
          db.query("INSERT INTO employees SET ?", newEmployee, err => {
            if (err) {
              console.log(err)
            }
          console.log("New employee successfully added");
          mainMenu();
        })
      })
      
    };
};
});
};

const updateRole = () => {
  inquirer.prompt([{
    message: "What is the id of the employee you would like to update?",
    type: 'input',
    name: 'id'
  },
  {
    message: "What is the id of the role the employee should be updated to?",
    type: 'input',
    name: "role_id"
  }])
    .then(employee => {
      let newRole = {
        role_id: employee.role_id
      }
      db.query(`UPDATE INTO employees SET ? WHERE id = ${employee.id}`, newRole, err => {
      if(err) {
        console.log(err)}
      })
    console.log('New employee successfully added');
    mainMenu();
  })
  }

const showDepartment = () => {
  db.query('Select * FROM departments', (err, departments)=> {
    if(err){
      console.log(err)
    }
    console.table(departments)
  })
  mainMenu();
};

const showRoles = () => {
  db.query('Select * FROM roles', (err, roles) => {
    if (err) {
      console.log(err)
    }
    console.table(roles)
  })
  mainMenu();
};

const showEmployees = () => {
  db.query('SELECT * FROM employees', (err, employees)=> {
    if(err) {
      console.log(err)
    }
    console.table(employees)
  })
  mainMenu();
}


const mainMenu = () => {
  inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choices",
    choices: [
        "View all departments",
        "View all roles",
        "View all Employees",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Manager",
        "Quit",
    ]
   }
  ])
  .then((answers) => {
    const { choices } = answers;
    
    if(choices === "View all departments") {
      showDepartments();
    }

    if(choices === "View all roles") {
      showRoles();
    }

    if(choices === "View all employees") {
      showEmployees();
    }

    if(choices === "Add Department") {
      addDepartment();
    }

    if(choices === "Add Role") {
      addRole();
    }

    if(choices === "Add Employee") {
      addEmployee();
    }

    if(choices === "Update an employee manager") {
      updateManager();
    }

    if(choices === "Quit") {
      console.log('Have a nice day!')
    };
  });
};

mainMenu();