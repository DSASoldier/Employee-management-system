import InputComponent from "../component/InputComponent"

export default function ManageEmployeeProfile({headline,names}){

    return <div className="employee-profile-details">

       <InputComponent headline="Your Personal Detail" names={['Name','Contact Information','Address','Date of birth','Emergency contact']}/>

       <InputComponent headline="Your Professional Details" names={['Employee ID','Department','Designation','Joining date','Experience','Manager detail']}/>
       
    </div>
}