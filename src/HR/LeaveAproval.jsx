export default function LeaveAproval(){

    return <div>

        <p>name</p>

         <div className="form-group">

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

    </div>
}