import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [activeUsers,setActiveUsers]=useState([]);
    const [inactiveUsers,setinactiveUsers]=useState([]);
    const [totalUsers,setTotalUsers]=useState([]);
    const [usersOnLeave,setUsersonLeave]=useState([]);
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState({});
    const logInUser = localStorage.getItem('token') || '';
    const [email,setEmail] = useState(logInUser);
    const [image,setImage] = useState(null);
    const [leaveData,setLeaveData] = useState([]);
    const [designation,setDesignation] = useState('');

    useEffect(()=>{
        fetchData();
    },[]);

    useEffect(()=>{
        fetchData(); 
    },[email]);

    function getEmail(){
        const logInUser = localStorage.getItem('token') || '';
        setEmail(logInUser);
    }


    async function fetchData(){

        try{

            const logInUser = localStorage.getItem('token') || '';

            const res = await axios.get(
                "https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/employees.json"
            );
    
            const dataAddedByEmployee = await axios.get(
                'https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee.json'
            );

            const data = res.data || [];
            const employeedata = dataAddedByEmployee.data || [];

            if(logInUser){
                const adminEmployeesArray = Object.keys(data)?.map(key => {
    
                    const adminData = data[key];
                    
                    if(adminData.email.toLowerCase().trim()===email.toLowerCase().trim()){
                        setImage(adminData.image);
                    }

                    return ({
                        id2: key,
                        ...adminData
                    })
                });
                setDesignation(adminEmployeesArray.find(emp=>emp.email.toLowerCase().trim()===email.toLowerCase().trim())?.Designation || '');
                setUsers(adminEmployeesArray);
            }
            else{
                const adminEmployeesArray = Object.keys(data)?.map(key => {
    
                    const adminData = data[key];
    
                    return ({
                        id2: key,
                        ...adminData
                    })
                });
                setUsers(adminEmployeesArray);
            }

        }
        catch(error){
            console.log(error)
        }
    }

    function addDesinationToEMS(designation){
        setDesignation(designation);
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
            fetchData();

        } catch (error) {
            console.log(error);
        }
    }

    async function adminGetData(){
        try {
            await axios.get(
                `https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/admin.json`
            );

        } catch (error) {
            console.log(error);
        }
    }

    async function addAdminName(name){
        try {
            await axios.post(
                `https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/admin.json`,name
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function applyLeave(leaveData){
        try{
            await axios.post(`https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/leaves.json`,leaveData);
        }
        catch(error){
            console.log(error);
        }
    }

    async function getLeaveData(){
        try{
            const res = await axios.get(`https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/leaves.json`);
            const data = res.data || [];
            const leaveDataArray = Object.keys(data)?.map(key => {
                const leaveData = data[key];
                return ({
                    id: key,
                    ...leaveData
                })
            });
            return leaveDataArray;
        }
        catch(error){
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
        email:email,
        image:image,
        designation:designation,
        fetchData:fetchData,
        addUsers:addUsers,
        editUsers:editUsers,
        deleteUserData:deleteUserData,
        getEmail:getEmail,
        adminGetData:adminGetData,
        addAdminName:addAdminName,
        applyLeave:applyLeave,
        getLeaveData:getLeaveData,
        addDesinationToEMS:addDesinationToEMS,
    }
    
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserProvider