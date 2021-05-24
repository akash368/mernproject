import React,{useState} from 'react'
import signup from '../image/signup.png'
import {NavLink, useHistory} from 'react-router-dom'
function Register() {
    const history = useHistory();
    // registration page ke data ko backend pe le jaa rhe...i.e server/auth.js
    const [user, setUser] = useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""
    }) ;

    let name, value;

    const handleInputs  = (e) =>
    {
        console.log(e);
        name = e.target.name;      // name attribute me jo value hogi..like name='email' 
        value = e.target.value;    // name attribute ke corresponding jo value hogi..like email m 'akash@gmail.com'

        setUser({...user, [name]:value});   // ye array ke ander name variable m name attribute ki help c value milegi aur uske correnponding us valiable ki jo value hogi vo get hogi
                                            // like [name:"akash", email:akash@gmail.com, work:"web", phone:"33647345465"]
    }

    const PostData = async(e) =>
    {
        e.preventDefault();

        const {name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        //console.log(data);
        if(res.status === 422 || !data)
        {
            window.alert("Please fill all mandatory fields");
            console.log("Invalid Registration");
        }
        else if(res.status === 423)
        {
            window.alert("Email already exist");
            console.log("Email already exist")
        }
        else if(res.status === 424)
        {
            window.alert("Values are different in password");
        }
        else
        {
            window.alert("Registration Successful");
            console.log("Registration Successful");
            history.push("/pages/Login");
        }
    }

    return (
        <div className="Background">
            <section className="register-section">
                <div className="container mt-5">
                    <div className="register-content row">
                        <div className="register-form col-sm">
                            <h1 className="form-title mt-3">Sign Up</h1>
                            <form className="main-form" method="POST">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="fas fa-user icon"></i>
                                    </label>
                                    <input type="text" className="register-input" name="name" id="name" autoComplete="off"
                                    value={user.name}
                                    onChange={handleInputs}
                                    placeholder="Your Name"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                    <i class="fas fa-envelope-open icon"></i>
                                    </label>
                                    <input type="text" className="register-input" name="email" id="email" autoComplete="off"
                                    value={user.email}
                                    onChange={handleInputs}
                                    placeholder="Email Id"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                    <i class="fas fa-comments icon"></i>
                                    </label>
                                    <input type="text" className="register-input" name="phone" id="phone" autoComplete="off"
                                    value={user.phone}
                                    onChange={handleInputs}
                                    placeholder="Phone Number"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="work">
                                    <i class="fas fa-briefcase icon"></i>
                                    </label>
                                    <input type="text" className="register-input" name="work" id="work" autoComplete="off"
                                    value={user.work}
                                    onChange={handleInputs}
                                    placeholder="Your Profession"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="fas fa-key icon"></i>
                                    </label>
                                    <input type="password" className="register-input" name="password" id="password" autoComplete="off"
                                    value={user.password}
                                    onChange={handleInputs}
                                    placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i class="fas fa-key icon"></i>
                                    </label>
                                    <input type="password" className="register-input" name="cpassword" id="cpassword" autoComplete="off"
                                    value={user.cpassword}
                                    onChange={handleInputs}
                                    placeholder="Confirm your Password"/>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" onClick={PostData} value="Register"/>
                                </div>
                            </form>
                            
                        </div>
                        <div className="register-img col-sm">
                            <img src={signup} alt="signup" className="register-img responsive" /><br/>
                            <NavLink to="/pages/Login" className="jumptologin">Already have an account</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default Register
