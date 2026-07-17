import AddEmployeeModal from "./AddEmployeeModal";

import React, {
    useState,
    useContext,
    useMemo
} from "react";

import {
    Pagination,
    Box
} from "@mui/material";

import { UserContext } from "../context/context";


export default function Employee(){


    const context = useContext(UserContext);


    const users = context.users || [];

    const addUsers = context.addUsers;


    const designation = context.designation || "";



    const [page,setPage] = useState(1);

    const [open,setOpen] = useState(false);


    const [employeeSearch,setEmployeeSearch] = useState("");

    const [employeeRole,setEmployeeRole] = useState("All");

    const [employeeStatus,setEmployeeStatus] = useState("All");


    const [status1,setStatus1] = useState("active");


    const [profileImage,setProfileImage] = useState(null);



    const itemsPerPage = 10;



    const handleClickOpen = () => {

        setOpen(true);

    }



    const handleClose = () => {

        setOpen(false);

    }



    const handleChange = (event,value) => {

        setPage(value);

    }





    const handleSubmit = (event) => {


        event.preventDefault();


        const formData = new FormData(event.currentTarget);


        const formJson = Object.fromEntries(
            formData.entries()
        );



        formJson.status = status1;

        formJson.image = profileImage;



        addUsers(formJson);


        handleClose();


    }






    const uploadProfileImage = (file) => {


        if(!file.type.startsWith("image")){

            alert("Please select image file");

            return;

        }



        const reader = new FileReader();



        reader.onloadend = () => {

            setProfileImage(reader.result);

        }



        reader.readAsDataURL(file);


    }







    const filteredEmployees = useMemo(()=>{


        return users.filter((employee)=>{


            const search = 
            employeeSearch.toLowerCase().trim();




            const matchesSearch =

            employee.Name?.toLowerCase()
            .includes(search)

            ||

            employee.email?.toLowerCase()
            .includes(search)

            ||

            search === "";





            const matchesRole =

            employeeRole === "All"

            ||

            employee.Designation
            ?.toLowerCase()
            .trim()

            ===

            employeeRole.toLowerCase().trim();






            const matchesStatus =

            employeeStatus === "All"

            ||

            employee.status
            ?.toLowerCase()
            .trim()

            ===

            employeeStatus.toLowerCase().trim();





            return (
                matchesSearch
                &&
                matchesRole
                &&
                matchesStatus
            );



        });



    },[
        users,
        employeeSearch,
        employeeRole,
        employeeStatus
    ]);







    const paginatedEmployees =

    filteredEmployees.slice(

        (page-1)*itemsPerPage,

        page*itemsPerPage

    );






return (

<div className="employee-page">



    <AddEmployeeModal

        handleClose={handleClose}

        open={open}

        uploadProfileImage={uploadProfileImage}

        handleSubmit={handleSubmit}

        status1={status1}

        setStatus1={setStatus1}

    />





    <div className="employee-header">


        <h2>
            Employees
        </h2>



        {
        designation.toLowerCase().trim()==="manager"

        &&

        <button

        onClick={handleClickOpen}

        className="employee-add-button"

        >

            + Add Employee

        </button>

        }


    </div>







    <div className="employee-filter-box">



        <input

        type="text"

        placeholder="Search employee..."

        className="employee-search"


        value={employeeSearch}


        onChange={(e)=>{

            setEmployeeSearch(e.target.value);

            setPage(1);

        }}


        />






        <select

        value={employeeRole}

        onChange={(e)=>{

            setEmployeeRole(e.target.value);

            setPage(1);

        }}

        >


            <option value="All">

                All Role

            </option>


            <option value="manager">

                Manager

            </option>


            <option value="accountant">

                Accountant

            </option>


            <option value="salesman">

                Salesman

            </option>


        </select>








        <select


        value={employeeStatus}


        onChange={(e)=>{


            setEmployeeStatus(e.target.value);

            setPage(1);


        }}


        >


            <option value="All">

                All Status

            </option>



            <option value="active">

                Active

            </option>



            <option value="inactive">

                Inactive

            </option>



            <option value="leave">

                Leave

            </option>


        </select>





    </div>








    <div className="employee-table">



        <div className="employee-table-header">


            <span>
                Profile
            </span>


            <span>
                Name
            </span>


            <span>
                ID
            </span>


            <span>
                Role
            </span>


            <span>
                Email
            </span>


            <span>
                Status
            </span>


            <span>
                Joining
            </span>


        </div>








        {

        paginatedEmployees.map((employee)=>(



        <div

        className="employee-row"

        key={employee.id2}


        >



            {


            employee.image


            ?

            <img

            src={employee.image}

            className="employee-avatar"

            />


            :


            <div className="empty-avatar">

                👤

            </div>



            }






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

                    employee.status?.toLowerCase()
                    ==="active"

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

                {employee.joiningDate || employee.date}

            </span>





        </div>



        ))

        }



    </div>








    <Box className="employee-pagination">


        <Pagination


        count={

            Math.ceil(
                filteredEmployees.length/itemsPerPage
            )

        }


        page={page}


        onChange={handleChange}


        />



    </Box>





</div>


)


}