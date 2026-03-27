import { createContext, useEffect, useState } from "react";
import { employees } from "../constant";
import axios from "axios";
import img from '../assets/sudeep.png';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [activeUsers,setActiveUsers]=useState([]);
    const [inactiveUsers,setinactiveUsers]=useState([]);
    const [totalUsers,setTotalUsers]=useState([]);
    const [usersOnLeave,setUsersonLeave]=useState([]);
    const [users,setUsers] = useState(employees);
    const [user,setUser] = useState({
        firstName:'sudeep',
        lastName:'chatterjee',
        gender:'male',
        age:26,
        email:'sudeepchatterje70@gmail.com',
        image:img
    });
    
    useEffect(()=>{

        fetchData();

    },[]);

    async function fetchData(){
        const res = await axios.get(
        "https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees.json"
        );

        const data = res.data;

        const employeesArray = Object.keys(data).map(key => ({
        id2: key,
        ...data[key]
        }));
        
        console.log(employeesArray);

        setUsers(employeesArray);
    }


    async function addUsers(user){

        await axios.post('https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees.json',user) 

        console.log('employee added');

        setUsers([...users,user]);
    }

    async function editUsers(updatedEmployee,index){
        
        console.log(updatedEmployee);

        try {
            await axios.patch(
            `https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees/${updatedEmployee.id2}.json`,
                updatedEmployee
            );

            // Update local state properly
            const updatedUsers = users.map(user =>
            user.id2=== updatedEmployee.id2 ? updatedEmployee : user
            );

            setUsers(updatedUsers);

            console.log("Updated successfully");
        } catch (error) {
            console.log(error);
        }

    }

    async function deleteUserData(id2){
        // let employeeDataList = users.filter((element,i)=>{
        //     return i!==index;
        // })

        // setUsers(employeeDataList);


        try {
            await axios.delete(
            `https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees/${id2}.json`
            );

            fetchData()
            console.log("Employee deleted");

        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        users:users,
        usersOnLeave:usersOnLeave,
        totalUsers:totalUsers,
        inactiveUsers:inactiveUsers,
        activeUsers:activeUsers,
        user:user,
        addUsers:addUsers,
        editUsers:editUsers,
        deleteUserData:deleteUserData,
    }
    
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserProvider