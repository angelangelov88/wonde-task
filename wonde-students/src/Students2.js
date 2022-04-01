import React from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { useState,useEffect } from 'react'


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


function Students() {

    // const [students, setStudents] = useState({})
    const [classId, setClassId] = useState(null)
    const [employees, setEmployees] = useState({})
    // const [employeesClasses, setEmployeesClasses] = useState({})
    const [classesE, setClassesE] = useState({})


    useEffect(() =>  {
        getEmployees()
        getStudents()
    }, [])
        // const url = 'https://jsonplaceholder.typicode.com/users'
        // const url = `https://api.wonde.com/v1.0/schools/${school_id}/students?include=classes`
        const url2 = `https://api.wonde.com/v1.0/schools/${school_id}/employees?include=classes`
        const url3 = `https://api.wonde.com/v1.0/schools/${school_id}/classes?include=students`


//EMPLOYEES FETCH
const getEmployees = () => {
    axios.get(url2, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
    .then(res => {
        // let students = res.data;
        setEmployees(res.data.data)
        // setEmployeesClasses(res.data.meta.includes)
        console.log(employees)


        // console.log(res.data.data[1].classes.data[0].name)
      })
      .catch((error) => {
          console.log(error)
      })

}    

//CLASSES FETCH
const getStudents = () => {
    axios.get(url3, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
      .then(res => {
        // let students = res.data;
        setClassesE(res.data.data)

        // console.log(classesE)
        // console.log(res.data.data[1].students.data[0].forename)
      })
      .catch((error) => {
          console.log(error)
      })
    }

// let matches = []
// const showStudents = (classesE, classIdIs) => {
//     for(let i=0; i<classesE.length; i++) {
//         if(classesE.data[i].students.data === classIdIs.id) {
//             matches.push(classesE.data[i].classesE.data)
//             setClassesE()
//         }
//     }
//     console.log(classesE)
//   }

    
if (employees.length > 0) {
    return (
        employees.map(employee => {
            // console.log(employee.classes.data)
            return(
                <div className='data'key={employee.id}>
                    <p className="link employee">{employee.forename} {employee.surname}</p>
                    {employee.classes.data.map(tclass => {
                        return(
                            <p 
                            key={tclass.id} 
                            className="link" 
                            // onClick={() => showStudents(tclass.id)}
                            >{tclass.name}</p>
                        )
                    })
                    } 
                </div>
            )  
        })
    )
} else {
    return(<div>Loading...</div>)
}
}

export default Students;
