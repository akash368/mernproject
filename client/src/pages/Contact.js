import React, {useState, useEffect} from 'react'

function Contact() {
    const [userData, setuserData] = useState({name:"", email:"", phone:"", message:""});
	
	const userContact = async () => {
	
		try {
			const res = await fetch("/getData", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			console.log(data);
            setuserData({...userData, name: data.name, email: data.email, phone: data.phone});                // usestate ki help se jo data 'data' name ke variable m aya hai use hm output m dynamic data show karayenge
            

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);

		}
	};

	useEffect(() => {
		userContact();
	}, []);

    // storing data in states

    const contactData = (e) =>
    {
        const  name = e.target.name;
        const value = e.target.value;
        setuserData({...userData, [name]:value});
    }

    // sending data to backend and then we add one more field in database and store out data in database on mongodb

    const sendMessage = async (e) =>
    {
        e.preventDefault();

        const{name, email, phone, message} =userData;

        const res=await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if(!data)
        {
            console.log("message not send");
            window.alert({message:"Please login"})
        }
        else
        {
            alert("Message Send");
            setuserData({... userData, message:" "})
        }
    }

    return (
        <div className="contact-info Background">
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                        <div className="contact-info-item d-flex justify-item-start align-item-center">
                        <i class="fas fa-comments contact-icon"></i>
                            <div className="contact-content">
                                <div className="contact-content-title">
                                    Phone
                                </div>
                                <div className="contact-content-text">
                                    +91-120045789
                                </div>
                            </div>
                        </div>

                        <div className="contact-info-item d-flex justify-item-start align-item-center">
                        <i class="fas fa-envelope-open contact-icon"></i>
                            <div className="contact-content">
                                <div className="contact-content-title">
                                    Email
                                </div>
                                <div className="contact-content-text">
                                    wolf@ofiice.com
                                </div>
                            </div>
                        </div>

                        <div className="contact-info-item d-flex justify-item-start align-item-center">
                        <i class="fas fa-address-book contact-icon"></i>
                            <div className="contact-content">
                                <div className="contact-content-title">
                                    Address
                                </div>
                                <div className="contact-content-text">
                                    U.P, India - 226003
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                   <div className="register-content con mt-5">
                       <h1 className="form-title">Get in touch</h1>
                        <form method="POST"> 
                            <div class="row contact-form">
                                <div class="col">
                                <input type="text" class="form-control" name="name" placeholder="Your name"  onChange={contactData} value={userData.name} required="true"/>
                                </div>
                                <div class="col">
                                <input type="email" class="form-control" name="email" placeholder="Email" onChange={contactData} value={userData.email} required="true"/>
                                </div>
                                <div class="col">
                                <input type="number" class="form-control" name="phone" placeholder="Phone Number" onChange={contactData} value={userData.phone} required="true"/>
                                </div>
                                
                            </div>
                            <div class="form-group contact-form">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name="message" onChange={contactData} placeholder="Message" required="true"></textarea>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" onClick={sendMessage}
                                className="form-submit" value="Submit"/>
                            </div>
                        </form>
                   </div>
            </div>
        </div>
    )
}

export default Contact
