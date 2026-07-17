import {useState} from "react";


export default function EmployeeDetail({

heading,

details,

detailsInfo,

edited,

handleEditClick,

handleSaveClick

}){


const [data,setData]=useState({});



const handleInputChange=(value,detail)=>{


setData(prev=>({

...prev,

[detail
.toLowerCase()
.replace(/\s+/g,"")]:value


}));


}





return (


<div className="employee-detail-card">



<div className="detail-header">


<h2>

{heading}

</h2>



{

heading==="Personal Information"

&&

<span

onClick={handleEditClick}

className="edit-icon"

>

✏️

</span>


}


</div>






{

details.map((detail,index)=>(


<div

className="detail-row"

key={index}

>


<h4>

{detail}

</h4>




{

edited && heading==="Personal Information"


?

<input

defaultValue={detailsInfo[index]}

onChange={(e)=>

handleInputChange(
e.target.value,
detail
)

}


/>


:

<p>

{detailsInfo[index]}

</p>


}



</div>



))


}






{

edited

&&

<button

className="save-button"

onClick={()=>handleSaveClick(data)}

>

Save

</button>

}




</div>



)


}