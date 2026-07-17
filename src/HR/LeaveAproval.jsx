import React, { useState,useEffect,useContext} from "react";
import { UserContext } from "../context/context";
import LeaveDetails from "../component/LeaveDetails";
import axios from "axios";
import { url } from "../url/url";
import { computeHeadingLevel } from "@testing-library/dom";

export default function LeaveAproval() {

    const { getLeaveData } = useContext(UserContext);
    const [leaveDetails, setLeaveDetails] = useState([]);

    useEffect(() => {
        const fetchLeaveData = async () => {
            const leaveData = await getLeaveData();
            setLeaveDetails(leaveData);
        };
        fetchLeaveData();

    }, []);


    async function handleApprove(leaveId, updatedData) {
        console.log(`Leave with ID ${leaveId} approved.`);

        try {

            const leaveToUpdate = leaveDetails.find(leave => leave.id === leaveId);
            if (!leaveToUpdate) {
                console.error("Leave not found");
                return;
            }

            const updatedLeave = { ...leaveToUpdate, status: updatedData.status,comment: updatedData.comment };

            const data = await axios.delete(`${url}/leaves/${leaveId}.json`);
            await axios.post(`${url}/notifications.json`, updatedLeave);
            const updatedLeaveDetails = leaveDetails.filter(leave => leave.id !== leaveId);
            
            setLeaveDetails(updatedLeaveDetails);
        } catch (error) {
            console.error("Error approving leave:", error);
        }

    }
    return <div>
        <h2>employee leaves</h2>
        {leaveDetails.map((leave) => (
            <LeaveDetails key={leave.id} leaveData={leave} handleApprove={handleApprove} />
        ))}
    </div>

}