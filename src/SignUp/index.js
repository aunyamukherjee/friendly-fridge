import React from 'react';
import "./SignUp.css";

const style = {
    backgroundColor: 'rgba(163, 184, 193, 0.92)',
    font: 'inherit',
    border: '1px solid blue',
    padding: '10px',
    cursor: 'pointer',
    justifyContent: 'center',
    margin: '25px'
  };

const SignUp = (props) => {
    return (
        <div>
            <div className ="Title">
                <p>Sign Up</p>
            </div>
            <div className ="Login-container">
                <div className= "Login-items">
                    <p>Name:</p>
                    <input type="text" onChange= {props.changed} value = {props.name} />
                </div>
                <div className= "Login-items">
                    <p>Email:</p>
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
                    Sign Up
                    </button>
                {/* </div> */}
            </div>
        </div>
    )
}

export default SignUp;