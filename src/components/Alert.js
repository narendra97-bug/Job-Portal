import React from 'react';

function Alert(props) {

    const eleStyle={
        top: "25px",
        margin : "auto"
    }

    return <div className="d-flex justify-content-center">
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={eleStyle}>
            <b>{props.alert.msg}</b></div>}
    </div>;
}

export default Alert;
