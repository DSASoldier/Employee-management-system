import React, { useState } from "react";

export default function LeaveAproval() {

    const employee = {
        name: "Sudeep Chatterjee",
        fromDate: "2026-07-05",
        endDate: "2026-07-08",
        reason: "Medical Leave"
    };

    const [comment, setComment] = useState("");

    const handleApprove = () => {
        console.log({
            status: "Approved",
        });
    };

    const handleReject = () => {
        console.log({
            status: "Rejected",
        });
    };

    return (<div className="leave-approval-container">

        <div className="leave-approval-card">

            <h2 className="leave-employee-name">{employee.name}</h2>

            <div className="leave-info">
                <p><strong>From:</strong> {employee.fromDate}</p>
                <p><strong>To:</strong> {employee.endDate}</p>
                <p><strong>Leave Type:</strong> Sick Leave</p>
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
                    onClick={handleApprove}
                >
                    Approve
                </button>

                <button
                    className="reject-button"
                    onClick={handleReject}
                >
                    Reject
                </button>
            </div>

        </div>

    </div>
);
}