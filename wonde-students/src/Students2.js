import React from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { useState,useEffect } from 'react'

const token = process.env.REACT_APP_TOKEN
const school_id = process.env.REACT_APP_SCHOOL_ID

function Students() {

    const [classId, setClassId] = useState(null)
    const [employees, setEmployees] = useState({})
    const [students, setStudents] = useState({})
    // const [employeesClasses, setEmployeesClasses] = useState({})
    const [classesE, setClassesE] = useState({})
    const [fullName, setFullName] = useState({})

    useEffect(() =>  {
        getEmployees()
        // getStudents()
    }, [])
        const url2 = `https://api.wonde.com/v1.0/schools/${school_id}/employees?include=classes&per_page=100`
        // const url3 = `https://api.wonde.com/v1.0/schools/${school_id}/classes?include=students&?per_page=500`

        
        

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
        // console.log(employees)
        // console.log(res.data.data[1].classes.data[0].name)
      })
      .catch((error) => {
          console.log(error)
      })

}    

//STUDENTS FETCH
// const getStudents = () => {
//     axios.get(url3, {
//         headers: {
//             'Authorization': `Bearer ${token}` 
//           }
//     })
//       .then(res => {
//         // setStudents(res.data.data)
//         setClassesE(res.data.data)
//         // console.log(students)
//         // console.log(students[0].classes.data)
//         // console.log(classesE)
//         // console.log(classesE[0].students.data)
//     })
//       .catch((error) => {
//           console.log(error)
//       })
//     }

//STUDENTS FETCH per CLASS ID

let matches = []
const showStudents = async (classIdIs) => {
    const angelClass = classIdIs
    const response = axios.get(`https://api.wonde.com/v1.0/schools/${school_id}/classes/${angelClass}?include=students`, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
      .then(res => {
        setStudents(res.data.data.students.data)
    // console.log(students)
     // console.log(students[0].classes.data)
        fullNameFunction()

    })
      .catch((error) => {
          console.log(error)
      })

      let fullNameArray = []
      let fullNameString = []
      const fullNameFunction = () => {
        for(let i=0; i<students.length; i++) {
            fullNameArray.push(students[i].forename + ' ' + students[i].surname + '<br>')
            fullNameString = new String(fullNameArray)
            fullNameString = fullNameString.split(',').join('')
    }
    // console.log(fullNameString)
    const studentsList = document.getElementById('students-data')
    studentsList.innerHTML = fullNameString
}
}
    
      
        // for(let i=0; i<classesE.length; i++) {
        //     if(classesE[i].id == classIdIs) {
        //         // matches.push(classesE[i].name)
        //         // setClassesE(matches)
        //         // console.log(matches)
        //         // console.log(classesE)
        //         console.log('Match!')
        //         for (let s=0; s<classesE[i].students.data.length; s++) {
        //             matches.push(classesE[i].students.data[s].forename) 
        //             // console.log(matches)
        //             console.log('match2')

                    
        //         }
        //     } else {
        //         console.log('No matched students')
        //     }
        // }    

    // console.log(classesE)
  

    
if (employees.length > 0) {
    return (
        employees.map(employee => {
            // console.log(employee.classes.data)
            return(
                <div className='data' key={employee.id}>
                    <p className="link employee">{employee.forename} {employee.surname}</p>
                    {employee.classes.data.map(tclass => {
                        return(
                            <div 
                                key={tclass.id} 
                                className="link classes" 
                            >{tclass.name}
                                <button onClick={ () => showStudents(tclass.id) }>Show Students</button>                          
                                <div className="students">
                                    <div id="students-data"></div>
                                </div>     
                            </div>  
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
