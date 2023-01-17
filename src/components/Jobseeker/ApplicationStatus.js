import React, { useState, useEffect } from 'react'

function ApplicationStatus() {
    const [appstatus, setappstatus] = useState([])
    const getstatus = async () => {
        const response = await fetch("http://localhost:5000/api/jobseeker/getapplicationstatus/", {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        if (json.success) {
            setappstatus(json.jobarr);
        }
    }
    useEffect(() => {
        getstatus();
    }, [])


    var checkApplicationStatus = function (status) {
        if (status.rejected === 1)
            return "Sorry, you are rejected!"
        else if (status.hired === 1)
            return "Congrats! You are Hired!"
        else if (status.round === 0)
            return "Just Applied!"
        else if (status.round === 1)
            return "Aptitude cleared!"
        else if (status.round === 2)
            return "Technical round cleared!"
    }

    var getdate = function (d) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var d = new Date(d);
        var date = d.getDate();
        var month = monthNames[d.getMonth()]
        var year = d.getFullYear();
        return date + " " + month + " " + year;
    }

    let count = 1;
    return (
        <>
            <div className='container mt-4'>
                <br />
                <h1 style={{ display: "inline-block", borderBottom: "3px solid black" }}>Your Job Applications</h1>
                <br />
                <br />
                <table className="table table-hover shadow p-3 mb-5 bg-white rounded">
                    <thead>
                        <tr>
                            <th scope="col" className="px-5">#</th>
                            <th scope="col">Company</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Application Date</th>
                            <th scope="col">Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appstatus.map((obj) => {
                                return (
                                    <tr key={count} className='border'>
                                        <th scope="row" className='px-5'>{count++}</th>
                                        <td>{obj.jobprovider.cname}</td>
                                        <td>{obj.job.title}</td>
                                        <td>{getdate(obj.application.applicationdate)}</td>
                                        <td style={{color:(obj.application.rejected===1) ? "red" : ((obj.application.hired===1) ? "green" : "blue")}}>{checkApplicationStatus(obj.application)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ApplicationStatus;
