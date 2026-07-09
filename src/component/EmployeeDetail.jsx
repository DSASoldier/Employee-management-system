import { useState } from "react";

export default function EmployeeDetail({edited,heading,details,detailsInfo, handleEditClick,handleSaveClick}){
    
    
    console.log(detailsInfo)
    console.log(details)
    const data = {};

    function handleInputChange(value, detail) {
        data[detail.toLowerCase().replace(/\s+/g, '')] = value;
    }

    return <div className={edited ? 'editing' : ''}>

            <h2>{heading} {heading==='Personal Info'? <span onClick={handleEditClick} className="edit-icon">✏️</span>:'' }</h2>

            {details.map((detail,index)=><div key={index} >
                <h3>{detail}</h3>
                {heading==='Personal Info'?<div>

                    {edited ? <input type="text" defaultValue={detailsInfo[index]} onChange={(e)=>handleInputChange(e.target.value,detail)}/> : <p>{detailsInfo[index]}</p>}
                </div>:<p>{detailsInfo[index]}</p>}
            
            </div>)}

        {edited  && <button onClick={()=>handleSaveClick(data)}>Save</button>}
    </div>
    
}