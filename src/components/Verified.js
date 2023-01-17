import React from 'react';
import { useParams } from 'react-router-dom';
import green from './true.jpg';
import red from './false.png';

function Verified() {
    let { message } = useParams();
    
    return (
        <>
            {
                message.includes("verified")?
                <div>
                    <center>
                        <img src={green} style={{ height: "550px", width: "750px", }} className="center-block"/>
                    </center>
                </div > :  
                <div className='container mt-5 d-flex justify-content-center'>
                    <div className="card mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" >
                        <img className='align-items-center' src={red} style={{ height: "120px", width: "200px", }} />
                        <h1 className='align-items-center'>{message}</h1>
                    </div>
                </div>
                    
                    // <div className='container mt-5 d-flex justify-content-center'>
                    //     <div className="card mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" >
                    //         <img className='align-items-center' src={green} style={{ height: "120px", width: "150px", }} />
                    //         <h1 className='align-items-center'>{message}</h1>
                    //     </div>
                    // </div>:
                    // <div className='container mt-5 d-flex justify-content-center'>
                    //     <div className="card mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" >
                    //         <img className='align-items-center' src={red} style={{ height: "120px", width: "200px", }} />
                    //         <h1 className='align-items-center'>{message}</h1>
                    //     </div>
                    // </div>
            }

        </>
    );
}

export default Verified;