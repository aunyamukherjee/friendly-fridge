import React from 'react';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';
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
        <div>
            <div className ="Title">
                    <p>Login</p>
            </div>
            <div Login-container>
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
                    Login
                    </button>
                    <button
                    style = {style}>
                        <Link to="/authenticate/signup">
                            Sign Up!
                        </Link>
                    
                    </button>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Login;