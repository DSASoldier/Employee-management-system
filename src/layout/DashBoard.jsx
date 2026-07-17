import { UserContext } from "../context/context";
import { useContext, useEffect, useMemo } from "react";

export default function DashBoard() {

    const context = useContext(UserContext);

    const users = context.users;


    useEffect(() => {
        context.fetchData();
    }, []);


    const stats = useMemo(() => {

        let active = 0;
        let inactive = 0;
        let onLeave = 0;
        let notice = 0;
        let resigned = 0;
        let terminated = 0;


        users.forEach((user) => {

            const status = user.status?.toLowerCase().trim();


            if(status === "active"){
                active++;
            }
            else if(status === "inactive"){
                inactive++;
            }
            else if(status === "leave"){
                onLeave++;
            }
            else if(status === "notice"){
                notice++;
            }
            else if(status === "resigned"){
                resigned++;
            }
            else if(status === "terminated"){
                terminated++;
            }

        });


        return {
            active,
            inactive,
            onLeave,
            notice,
            resigned,
            terminated
        };


    },[users]);



    return (

        <div className="dashboard-root">


            <h1 className="dashboard-title">
                Employee Dashboard
            </h1>



            <div className="dashboard-card-container">


                <div className="dashboard-card total-card">

                    <h3>
                        👥 Total Employees
                    </h3>

                    <h1>
                        {users.length}
                    </h1>

                </div>




                <div className="dashboard-card active-card">

                    <h3>
                        ✅ Active Employees
                    </h3>

                    <h1>
                        {stats.active}
                    </h1>

                </div>





                <div className="dashboard-card leave-card-dashboard">

                    <h3>
                        🌴 Employees On Leave
                    </h3>

                    <h1>
                        {stats.onLeave}
                    </h1>

                </div>





                <div className="dashboard-card notice-card">

                    <h3>
                        📄 Notice Period
                    </h3>

                    <h1>
                        {stats.notice}
                    </h1>

                </div>





                <div className="dashboard-card resigned-card">

                    <h3>
                        ❌ Resigned
                    </h3>

                    <h1>
                        {stats.resigned}
                    </h1>

                </div>





                <div className="dashboard-card terminated-card">

                    <h3>
                        🚫 Terminated
                    </h3>

                    <h1>
                        {stats.terminated}
                    </h1>

                </div>



            </div>


        </div>

    );
}