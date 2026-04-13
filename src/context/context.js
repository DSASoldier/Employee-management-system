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
    const [user,setUser] = useState({});
    
    useEffect(()=>{

        fetchData();

    },[]);

    async function fetchData(){

        
        try{

            const res = await axios.get(
            "https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees.json"
            );
    
            const dataAddedByEmployee = await axios.get(
                'https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee.json'
            );

            const data = res.data || [];
            const employeedata = dataAddedByEmployee.data || [];


            const logInUser = localStorage.getItem('token');

            const adminEmployeesArray = Object.keys(data)?.map(key => {

                const adminData = data[key];

                Object.keys(employeedata)?.map(key => {

                    const fullnameByEmployee = employeedata[key].firstName.toLowerCase().trim() + employeedata[key].lastName.toLowerCase().trim();
                    const fullnameSplittingByAdmin = [...adminData.name.toLowerCase().trim().split(' ')];
                    const fullNameByAdmin = fullnameSplittingByAdmin[0]+fullnameSplittingByAdmin[1];
                    
                    if(logInUser.toLowerCase().trim() === adminData.email.toLowerCase().trim()){
                        
                        if(fullNameByAdmin===fullnameByEmployee){
                            setUser({...employeedata[key],image:adminData.image});
                        }
                    }
                })

                return ({
                    id2: key,
                    ...adminData
                })
            });
            

    
            setUsers(adminEmployeesArray);
        }
        catch(error){
            console.log(error)
        }
    }


    async function addUsers(user){

        let employee = {
            ...user,

        }

        await axios.post('https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees.json',employee) 


        setUsers([...users,user]);
    }


    async function editUsers(updatedEmployee,index){
        

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

        } catch (error) {
            console.log(error);
        }

    }

    async function deleteUserData(id2){
        try {
            await axios.delete(
            `https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees/${id2}.json`
            );

            fetchData()

        } catch (error) {
            console.log(error);
        }
    }

    async function dataAddbyEmployee(data){

        await axios.post('https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee.json',data);

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
        dataAddbyEmployee:dataAddbyEmployee,
    }
    
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserProvider