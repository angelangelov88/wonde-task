import React, { Component } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { useState } from 'react'

const token = process.env.REACT_APP_TOKEN
const school_id = process.env.REACT_APP_SCHOOL_ID

const teacher_ids = [
    'A1375078684',
    'A1624134916',
    'A1796016840'
]
const teacher_id = "A1976397528"
const class_ids = [
    'A575444512',
    'A1253639300',
    'A344762973'
]

const class_id = 'A575444512'

// const openClasses   = (e, employee_id) => {
//     axios.get('https://api.wonde.com/v1.0/schools/A1930499544/employees/A1796016840?include=classes', {
//         headers: {
//             'Authorization': `Bearer ${token}` 
//           }
//     })
//       .then(res => {
//             res = res.data
//             console.log(res.data.classes.data[0].name)
//             console.log(employee_id)
            
//       })
//       .catch((error) => {
//           console.log(error)
//       })
//   }


export default class Students extends Component {
    state = {
        students: [],
        employees: [],
        employeesClasses: [],
        classesE: [],
    }


    componentDidMount() {
        // const url = 'https://jsonplaceholder.typicode.com/users'
        // const url = `https://api.wonde.com/v1.0/schools/${school_id}/students?include=classes`
        const url2 = `https://api.wonde.com/v1.0/schools/${school_id}/employees?include=classes`
        const url3 = `https://api.wonde.com/v1.0/schools/${school_id}/classes?include=students`


//STUDENTS
        // axios.get(url, {
        //     headers: {
        //         'Authorization': `Bearer ${token}` 
        //       }
        // })
        //   .then(res => {
        //     // let students = res.data;
        //     this.setState({ students: res.data.data });
        //     console.log(this.state.students)
        //     console.log(res.data.data[0].classes.data[0].name)
        //     // console.log(students.data)
        //     // students = students.data
        //     // console.log(students.data[1].initials)
        //     // console.log(students.data[1].forename)
        //     // this.setState({ students })
        //   })
        //   .catch((error) => {
        //       console.log(error)
        //   })


//EMPLOYEES FETCH
          axios.get(url2, {
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        })
          .then(res => {
            // let students = res.data;
            this.setState({ 
                employees: res.data.data, 
                employeesClasses: res.data.meta.includes
            });
            
            console.log(this.state.employees)
            // console.log(res.data)
            console.log(res.data.data[1].classes.data[0].name)
          })
          .catch((error) => {
              console.log(error)
          })

        

//CLASSES FETCH
const axiosStudents = () => {
    axios.get(url3, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
      .then(res => {
        // let students = res.data;
        this.setState({ classesE: res.data.data });
        console.log(this.state.classesE)
        console.log(res.data.data[1].students.data[0].forename)
      })
      .catch((error) => {
          console.log(error)
      })

}
    }

  render() {
    //   const { students } = this.state
    //   const studentList = students.length ? (

    //         students.map(student => {
    //             return (
    //                 <ul key={student.id}>
    //                     <li>{student.forename} {student.surname}</li>
    //                     <li>{student.id}</li>

    //                 </ul>

    //             )

    //         })
    //     ) : (
    //         <div>Loading...</div>
    //     ) 

        const { employees, employeesClasses } = this.state
        const employeeList = employees.length ? (
            employees.map(employee => {
                return (
                    <ul key={employee.id}>
                        <li className="link employee">{employee.forename} {employee.surname}</li>

            {employee.classes.data.length ? (
                <li>{ 
                    employee.classes.data.map((tclass) => {
                        return (
                        <p key={tclass.id} className="link">{tclass.name}</p>

                        )
                    })
                }</li>
                ) 
                :('')}
                    </ul>
                )
            })            
        ) : (
            <div>Loading...</div>
        )
        // const employeeClassesList = employeesClasses.map(employeeClass => {
        //     return (
        //         <div key={employeeClass}>{employeeClass}</div>
        //     )
        // })




        // const { classesE } = this.state
        // const classList = classesE.length ? (
        //     classesE.map(classE => {
        //         return (
        //             <ul key={ classE.id }>
        //                 <li>{ classE.name }</li>
        //                 <li>{ classE.id }</li>
        //                 <li>{ classesE[1].students.data[0].forename } { classesE[1].students.data[0].surname }</li>
        //             </ul>
                    
        //         )
        //     })
        // ) : (
        //     <div>Loading...</div>
        // )
      return (
    <div className='data'>
    <div>
    {/* <h2>Students</h2> */}
       {/* {studentList} */}

    </div>
    <div>
    <h2>Employees</h2>
       {employeeList}
       {/* {employeeClassesList} */}
    </div> 
    <div>
    {/* <h2>Classes</h2> */}
       {/* {classList} */}
    </div>
            {/* <ul>
                {
                    this.state.students.map(student =>
                        <li key={ student.id }>
                        { student.name }
                        <br></br>
                        { student.email }
                        </li>
                        )
                }
            </ul> */}
      </div>
    )
  }
}
