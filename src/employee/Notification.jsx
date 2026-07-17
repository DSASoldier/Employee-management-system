import { useState } from "react";
import axios from "axios";
import { url } from "../url/url";
import NotificationDetail from "../component/NotificationDetail";

export default function Notification() {

    const [notifivationData, setNotificationData] = useState([]);
    const email = localStorage.getItem("token");

    useState(() => {
        getNotification();
    }, []);

    async function getNotification(){

        const data =await axios.get(`${url}/notifications.json`);
        const notificationArray = data.data;
        
        const usernotification = [];
        const filteredNotification = Object.keys(notificationArray)?.map(key => {
            const notificationData = notificationArray[key];

            if(notificationData.userEmail.toLowerCase().trim()===email.toLowerCase().trim()){
                usernotification.push({
                    id: key,
                    ...notificationData
                });
            }
        })
        setNotificationData(usernotification);
    }

    return (
    <div className="notification-container">
        <h2 className="notification-title">Notifications</h2>

        {notifivationData.length > 0 ? (
            notifivationData.map((notification) => (
                <NotificationDetail
                    key={notification.id}
                    notification={notification}
                />
            ))
        ) : (
            <p className="notification-empty">
                No notifications available.
            </p>
        )}
    </div>
);
}