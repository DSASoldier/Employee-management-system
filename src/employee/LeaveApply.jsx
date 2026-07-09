import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/context";

export default function LeaveApply() {

    const { applyLeave } = useContext(UserContext);

    const [formData, setFormData] = useState({
        leave: "",
        fromDate: "",
        endDate: "",
        description: ""
    });

    const [errors, setErrors] = useState({});
    const userEmail = localStorage.getItem("token");

    console.log("Form Data:", formData);
    console.log("Errors:", errors);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const validate = () => {
        let newErrors = {};

        if (!formData.leave)
            newErrors.leave = "Select leave type";

        if (!formData.fromDate)
            newErrors.fromDate = "Select starting date";

        if (!formData.endDate)
            newErrors.endDate = "Select ending date";

        if (formData.fromDate && formData.endDate &&
            formData.endDate < formData.fromDate) {
            newErrors.endDate = "Invalid date range";
        }

        if (!formData.description.trim())
            newErrors.description = "Enter reason for leave";


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if(validate()){
            alert("Leave Applied Successfully");
            console.log(formData);
            applyLeave({...formData,userEmail:userEmail});
            setFormData({
                leave: "",
                fromDate: "",
                endDate: "",
                description: ""
            });
        }
    };


    return (
        <div className="leave-container">

            <form className="leave-card" onSubmit={handleSubmit}>

                <h2>Apply For Leave</h2>


                <div className="form-group">

                    <label>Select Leave Type</label>

                    <select
                        name="leave"
                        value={formData.leave}
                        onChange={handleChange}
                    >
                        <option value="">Select Leave</option>
                        <option value="Sick">Sick Leave</option>
                        <option value="Paid">Paid Leave</option>
                        <option value="Casual">Casual Leave</option>

                    </select>

                    <span className="error">
                        {errors.leave}
                    </span>

                </div>



                <div className="form-group">

                    <label>Choose Dates</label>

                    <div className="date-box">

                        <div>
                            <input
                                type="date"
                                name="fromDate"
                                value={formData.fromDate}
                                onChange={handleChange}
                            />

                            <span className="error">
                                {errors.fromDate}
                            </span>
                        </div>


                        <div>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />

                            <span className="error">
                                {errors.endDate}
                            </span>
                        </div>

                    </div>

                </div>



                <div className="form-group">

                    <label>Reason</label>

                    <textarea
                        name="description"
                        placeholder="Enter reason for leave"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>


                    <span className="error">
                        {errors.description}
                    </span>

                </div>



                <button className="apply-btn">
                    Apply Leave
                </button>


            </form>

        </div>
    );
}