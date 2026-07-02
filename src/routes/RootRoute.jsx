import { Route, Routes } from 'react-router-dom';
import LoginDashboard from '../pages/LoginDashboard';
import DashBoard from '../layout/DashBoard';
import Employee from '../layout/Employee';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import DashBoardProtect from '../route-protection/DashBoardProtect';
import LoginProtect from '../route-protection/LoginProtect';
import Profile from '../pages/Profile';
import ManageEmployeeProfile from '../HR/ManageEmployeeProfile';
import LeaveApply from '../employee/LeaveApply';
import LeaveAproval from '../HR/LeaveAproval';

export default function RootRoute(){

    return  <Routes>
                <Route path='/' element={
                    <LoginProtect>
                        <Login />
                    </LoginProtect>
                    }></Route>
                    <Route path='/login-dashboard' element={
                        <DashBoardProtect>
                            <LoginDashboard/>
                        </DashBoardProtect>
                    }>
                        <Route index element={<DashBoard />} />
                        <Route path='dashboard' element={<DashBoard />}/>
                        <Route path='employee' element={<Employee/>}/>
                        <Route path='settings' element={<Settings/>}/>
                        {/* <Route path="user-profile-detail" element={<ManageEmployeeProfile/>}/> */}
                        <Route path='apply-leave' element={<LeaveApply/>}/>
                        <Route path='leave-approve' element={<LeaveAproval/>}/>
                        
                    </Route>

                    <Route path='/profile' element={<Profile/>}/>

            </Routes>
}