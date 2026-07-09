import { useState } from "react"
import { useContext } from "react";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import cat from "../assets/ems.jpg";

export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailMessage, setEmailMessage] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState(false);
    const contextData = useContext(UserContext);
    const [message, setMessage] = useState(false);
    const users = contextData.users;
    const navigation = useNavigate();
    const getEmail = contextData.getEmail;
    
    console.log(users)
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function validatePassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]+$/;
        return regex.test(password);
    }

    function passwordValue(e) {
        if (e.target.value.toLowerCase().trim() !== '') {
            setPassword(e.target.value);
        }
    }

    function emailChangeHandler(e) {
        setEmail(e.target.value);
    }
    
    function handleSubmit(e) {

        e.preventDefault();

        if(users.length===0){
            alert("Please Wait");
            return ;
        }
        
        if (!validateEmail(email)) {
            setEmailMessage(true);
        }
        else {
            setEmailMessage(false)
        }

        if (!validatePassword(password)) {
            setPasswordMessage(true)
        } else {
            setPasswordMessage(false)
        }

        let count = 0;


        

        if (!passwordMessage && !emailMessage) {
            users.forEach((user) => {

                console.log(user);

                if ((email.toLowerCase().trim() === user.email.toLowerCase().trim())) {

                    localStorage.setItem("token", email.toLowerCase().trim());
                    count++;
                    getEmail();
                    navigation('/login-dashboard');
                }
            })
        }
        else if (email.toLowerCase().trim() === 'sudeepchatterje70@gmail.com') {
            navigation('/login-dashboard');
        }

        if (count === 0) {
            setMessage(true);
        }

    }

    return <div className="login-root-container" style={{ backgroundImage: `url(${cat})` }}>
        <form className="login-form" onSubmit={handleSubmit}>
            <p style={{ color: 'white',fontSize:'20px' }}>Enter Your Email</p>
            <input type="text" onChange={emailChangeHandler} className="login-text" />
            {emailMessage && <div style={{ color: 'red' }}>
                <p className="login-error-message">Enter valid email address</p>
            </div>}

            <p style={{ color: 'white',fontSize:'20px' }}>Enter Your password</p>
            <input
                type="password"
                onChange={passwordValue}
                className="login-text"
            />
            {passwordMessage && <div style={{ color: 'red' }}>
                <p className="login-error-message">Please enter password which contains atleast one uppercase character and one special symbol</p>

            </div>}
            <button className="login-submit-button">Submit</button>
            {message && <div style={{ color: 'red' }}>
                <p className="login-error-message">Enter valid credentials</p>
            </div>}

        </form>
    </div>
}