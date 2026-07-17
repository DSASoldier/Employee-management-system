import React, { useState } from "react";
import { useEffect,useContext } from "react";
import { UserContext } from "../context/context";

export default function LeaveDetails({ leaveData, handleApprove }) {

    const { users } = useContext(UserContext);

    const [employee, setEmployee] = useState({
        name: "Sudeep Chatterjee",
        fromDate: "2026-07-05",
        endDate: "2026-07-08",
        reason: "Medical Leave"
    });

    useEffect(() => {
        
        const employeeData = users.find(user => user.email.toLowerCase().trim() === leaveData.userEmail.toLowerCase().trim());

        setEmployee({
            name: employeeData ? employeeData.name : "Unknown Employee",
            fromDate: leaveData.fromDate,
            endDate: leaveData.endDate,
            reason: leaveData.description
        });
        
    }, []);

    const [comment, setComment] = useState("");

    return (<div className="leave-approval-container">

        <div className="leave-approval-card">

            <h2 className="leave-employee-name">{employee.name}</h2>

            <div className="leave-info">
                <p><strong>From:</strong> {employee.fromDate}</p>
                <p><strong>To:</strong> {employee.endDate}</p>
                <p><strong>Leave Type:</strong> {leaveData.leave}</p>
            </div>

            <div className="leave-section">
                <h3>Reason</h3>

                <textarea
                    className="leave-readonly-textarea"
                    value={employee.reason}
                    readOnly
                />
            </div>

            <div className="leave-section">
                <h3>HR Comment</h3>

                <textarea
                    className="leave-comment-textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                />
            </div>

            <div className="leave-button-group">
                <button
                    className="approve-button"
                    onClick={()=>handleApprove(leaveData.id, {status: "Approved", comment: comment})}
                >
                    Approve
                </button>

                <button
                    className="reject-button"
                    onClick={()=>handleApprove(leaveData.id, {status: "Rejected", comment: comment})}
                >
                    Reject
                </button>
            </div>

        </div>

    </div>
);
}