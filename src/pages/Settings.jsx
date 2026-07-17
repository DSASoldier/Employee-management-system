import { UserContext } from "../context/context";
import { useContext, useState } from "react";
import AddEmployeeModal from "../layout/AddEmployeeModal";


export default function Settings(){


    const context = useContext(UserContext);


    const editUsers = context.editUsers;

    const deleteUserData = context.deleteUserData;


    const employees = context.users || [];



    const [open,setOpen] = useState(false);

    const [index,setIndex] = useState(0);


    const [status1,setStatus1] = useState("active");


    const [profileImage,setProfileImage] = useState(null);





    const handleClickOpen = (index)=>{


        setIndex(index);

        setStatus1(
            employees[index]?.status || "active"
        );


        setOpen(true);

    }





    const handleClose = ()=>{

        setOpen(false);

    }





    const handleSubmit=(event)=>{


        event.preventDefault();



        const formData = new FormData(
            event.currentTarget
        );



        const formJson = Object.fromEntries(
            formData.entries()
        );



        formJson.id2 =
        employees[index].id2;



        formJson.status =
        status1;



        formJson.image =
        profileImage;




        editUsers(
            formJson,
            index
        );



        handleClose();


    }





    const uploadProfileImage=(file)=>{


        if(!file.type.startsWith("image")){

            alert("Please select image");

            return;

        }



        const reader = new FileReader();



        reader.onloadend=()=>{

            setProfileImage(
                reader.result
            );

        }



        reader.readAsDataURL(file);


    }







return (

<div className="settings-page">





<AddEmployeeModal


handleClickOpen={handleClickOpen}

uploadProfileImage={uploadProfileImage}

handleClose={handleClose}

open={open}


handleSubmit={handleSubmit}



name={employees[index]?.Name}

id={employees[index]?.EmployeeId}

role={employees[index]?.Designation}

email={employees[index]?.email}

status={employees[index]?.status}

date={
employees[index]?.joiningDate 
||
employees[index]?.date
}


status1={status1}

setStatus1={setStatus1}



/>







<div className="settings-header">

<h2>
Employee Management
</h2>


</div>







<div className="settings-table">



<div className="settings-table-header">


<span>Name</span>

<span>ID</span>

<span>Role</span>

<span>Email</span>

<span>Status</span>

<span>Date</span>

<span>Action</span>


</div>









{
employees.map((employee,index)=>(


<div

className="settings-row"

key={employee.id2}


>


<span>

{employee.Name}

</span>




<span>

{employee.EmployeeId}

</span>





<span>

{employee.Designation}

</span>





<span>

{employee.email}

</span>





<span>


<b

className={
employee.status?.toLowerCase()==="active"

?

"status-active"

:

"status-leave"

}

>

{employee.status}

</b>


</span>





<span>

{
employee.joiningDate 
||
employee.date
}

</span>







<div className="action-buttons">


<button

className="edit-btn"

onClick={()=>handleClickOpen(index)}

>

Edit

</button>





<button

className="delete-btn"

onClick={()=>{

if(window.confirm(
"Are you sure you want to delete this employee?"
))

deleteUserData(employee.id2)

}}

>

Delete

</button>



</div>





</div>



))

}





</div>





</div>

)

}