import { Route, Routes } from 'react-router-dom';
import LoginDashboard from '../pages/LoginDashboard';
import DashBoard from '../layout/DashBoard';
import Employee from '../layout/Employee';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import DashBoardProtect from '../route-protection/DashBoardProtect';
import LoginProtect from '../route-protection/LoginProtect';
import Profile from '../pages/Profile';

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
                        <Route path='dashboard' element={<DashBoard />}/>
                        <Route path='employee' element={<Employee/>}/>
                        <Route path='settings' element={<Settings/>}/>
                    </Route>
                    <Route path='/profile' element={<Profile/>}/>

            </Routes>
}