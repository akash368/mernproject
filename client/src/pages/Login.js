import React, {useState, useContext} from 'react'
import loginpic from '../image/login.png'
import {NavLink, useHistory} from 'react-router-dom'
import {UserContext} from '../App';

const Login = () => {

    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async(e) =>
    {
        e.preventDefault();
        const res = await fetch('/login',{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(
                {
                    email,password
                })
        });

        const data =await res.json();

        if(res.status === 400 || !data)
        {
            window.alert("Invalid login credentials");
            console.log("Invalid login");
        }
        else
        {
            dispatch({type:"USER", payload:true})  // toggling logout and login button
            window.alert("Successfully logged In");
            console.log("Successfully logged In");
            history.push('/')
        }
    }
    
    return (
        <div className="Background">
        <section className="register-section">
            <div className="container mt-5">
                <div className="register-content row">
                    <div className="register-img col-sm">
                        <img src={loginpic} alt="signup" className="login-img responsive" /><br/>
                        <NavLink to="/pages/Registration" className="jumptologin">Don't have an account</NavLink>
                    </div>
                    <div className="register-form col-sm">
                        <h1 className="form-title mt-3">Login In</h1>
                        <form className="main-form" method="post">
                            

                            <div className="form-group">
                                <label htmlFor="email">
                                <i class="fas fa-envelope-open icon"></i>
                                </label>
                                <input type="text" className="register-input" name="email" id="email" autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Id"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i class="fas fa-key icon"></i>
                                </label>
                                <input type="password" className="register-input" name="password" id="password" autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" onClick={login} value="Log In"/>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Login
