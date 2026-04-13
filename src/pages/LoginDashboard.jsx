import NavMainContainer from "../layout/NavMainContainer";
import SideBar from "../layout/SideBar";
import cat from "../assets/ems.jpg"

export default function LoginDashboard(){
    return <div class="dashboard-container" style={{backgroundImage:`url(${cat})`,backgroundSize: "cover",backgroundPosition: "center"}}>
        <NavMainContainer/>
    </div>
}