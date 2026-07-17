export default function NotificationDetail({ notification }) {

    return (
        <div className="notification-card">

            <div className="notification-header">

                <span className="notification-icon">
                    🔔
                </span>

                <h3 className="notification-heading">
                    Leave Request Update
                </h3>

            </div>

            <p className="notification-message">
                Dear Employee, your leave request has been from <strong>{notification.fromDate}</strong> to <strong>{notification.endDate}</strong> 
                <span
                    className={
                        notification.status === "Approved"
                            ? "status-approved"
                            : "status-rejected"
                    }
                >
                    {" "}{notification.status}
                </span>.
            </p>

            <div className="notification-comment">

                <strong>HR Comment</strong>

                <p>{notification.comment}</p>

            </div>

        </div>
    );
}