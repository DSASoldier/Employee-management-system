import { useState,useRef,useEffect,useContext } from "react";
import { UserContext } from "../context/context";
import axios from "axios";
import EmployeeDetail from "../component/EmployeeDetail";
import { url } from "../url/url";


export default function Profile(){


const context = useContext(UserContext);


const email = context.email;


const fileInputRef = useRef(null);


const [preview,setPreview]=useState(null);


const [phoneNumber,setPhoneNumber]=useState("");

const [address,setAddress]=useState("");

const [emergencyNumber,setEmergencyNumber]=useState("");


const [employeeID,setEmployeeID]=useState("");

const [department,setDepartment]=useState("");

const [designation,setDesignation]=useState("");



const [editButtonClicked,setEditButtonClicked]=useState(false);





useEffect(()=>{

fetchData();

},[email]);







async function fetchData(){


try{


const employeeData =
await axios.get(`${url}/employees.json`);



const employeeDetails =
employeeData.data;



Object.keys(employeeDetails || {})
.forEach(key=>{


const employee =
employeeDetails[key];



if(
employee.email?.toLowerCase().trim()
===
email?.toLowerCase().trim()
){


setEmployeeID(employee.EmployeeId);

setDepartment(employee.Department || "");

setDesignation(employee.Designation);

setPreview(employee.image);


}



});




const personalData =
await axios.get(
`${url}/dataAddbyEmployee.json`
);



Object.keys(personalData.data || {})
.forEach(key=>{


const employee =
personalData.data[key];



if(
employee.email?.toLowerCase().trim()
===
email?.toLowerCase().trim()
){


setPhoneNumber(employee.phonenumber);

setAddress(employee.address);

setEmergencyNumber(employee.emergencycontact);


}



});



}
catch(error){

console.log(error);

}


}







async function saveEmployeeData(data){



try{


const response =
await axios.get(
`${url}/dataAddbyEmployee.json`
);



let updated=false;



Object.keys(response.data || {})
.forEach(key=>{


if(
response.data[key].email
?.toLowerCase()
.trim()
===
email.toLowerCase().trim()

){


axios.patch(
`${url}/dataAddbyEmployee/${key}.json`,
data
);


updated=true;


}


});




if(!updated){


axios.post(
`${url}/dataAddbyEmployee.json`,
data
);


}



}
catch(error){

console.log(error);

}



}








return (

<div className="profile-page">





<div className="profile-card">


<div className="profile-image-container">


{
preview ?

<img
src={preview}
className="large-profile-image"
/>


:

<div className="profile-placeholder">

👤

</div>

}



</div>



<h2>

{email}

</h2>



</div>








<div className="profile-details-container">





<EmployeeDetail


heading="Personal Information"


details={[
"Email",
"Phone number",
"Address",
"Emergency contact"
]}


detailsInfo={[
email,
phoneNumber,
address,
emergencyNumber
]}


edited={editButtonClicked}


handleEditClick={()=>
setEditButtonClicked(true)
}


handleSaveClick={(data)=>{

saveEmployeeData(data);

setEditButtonClicked(false);

}}


/>







<EmployeeDetail


heading="Job Information"


details={[
"Employee Id",
"Department",
"Designation"
]}


detailsInfo={[
employeeID,
department,
designation
]}



/>



</div>





</div>

)



}