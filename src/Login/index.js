import React from 'react';
import "./Login.css";

const style = {
    backgroundColor: 'rgba(163, 184, 193, 0.92)',
    font: 'inherit',
    border: '1px solid blue',
    padding: '10px',
    cursor: 'pointer',
    justifyContent: 'center',
    margin: '25px'
  };

const Login = (props) => {
    return (
        <div Login-container>
            <div className= "Login-items">
                <p>Name:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "Login-items">
                <p>Password:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            {/* <div className= "Login-items"> */}
                <button
                style = {style}
                /*onClick={() => }*/ >
                Login
                </button>
            {/* </div> */}
        </div>
    )
}

export default Login;