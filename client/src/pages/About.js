import React, { useEffect, useState } from "react";
import {NavLink, useHistory } from "react-router-dom";
import propic from '../image/good.jpg';
const About = () => {

    const [userData, setuserData] = useState(0);

	const history = useHistory();
	
	const callAboutPage = async () => {
	
		try {
			const res = await fetch("/about", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});

			const data = await res.json();
			console.log(data);
            setuserData(data);                // usestate ki help se jo data 'data' name ke variable m aya hai use hm output m dynamic data show karayenge
            

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
			history.push("/pages/Login");
		}
	};

	useEffect(() => {
		callAboutPage();
	}, []);
    return (
        <div className="Background">
            <div class="container-fluid">
                <div class="register-content mt-5 px-5">
                    <form method="GET">
                    <div className="row">
                        <div className="col-md-4 py-3 pl-3">
                            <div className="profile-img" style={
                                {
                                    backgroundImage: `url(${propic})`,
                                    backgroundSize:"cover",
                                    backgroundPosition:"left",
                                    
                                    
                                }
                                }>
                            
                            </div>
                        </div>
                        <div className="col-md-6 py-3">
                            <div>
                                <span className="profile-name">{userData.name}</span><br />
                                <span className="profile-profession">{userData.work}</span><br /><br />
                                <span  className="profile-rate">Ranking:<span className="profile-profession">7/10</span></span>
                            </div>
                            <div className="mt-3 mb-5" >
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home"
                                         role="tab" aria-controls="nav-home" aria-selected="true">About</a>
                                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" 
                                        role="tab" aria-controls="nav-profile" aria-selected="false">Timeline</a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className="col-md-2 py-3">
                            <div className="edit-profile ml-5">
                                <p className="edit-content">Edit Profile</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 pl-3">
                            <NavLink to="#"><span className="more-links">Facebook</span></NavLink><br />
                            <NavLink to="#"><span className="more-links">Instagram</span></NavLink><br />
                            <NavLink to="#"><span className="more-links">Snapchat</span></NavLink><br />
                            <NavLink to="#"><span className="more-links">Twitter</span></NavLink><br />
                            <NavLink to="#"><span className="more-links">Youtube</span></NavLink><br />
                        </div>
                        <div className="col-md-8">
                        <div class="tab-content" id="nav-tabContent">
                            {/* Left side tab*/}
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className="row">
                                <div className="col-md-6 about-title py-1">
                                    UserId
                                </div>
                                <div className="col-md-6 about-content py-1">
                                    {userData._id}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 about-title">
                                    Name
                                </div>
                                <div className="col-md-6 about-content">
                                    {userData.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 about-title py-1">
                                    Email
                                </div>
                                <div className="col-md-6 about-content py-1">
                                    {userData.email}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 about-title">
                                    Phone Number
                                </div>
                                <div className="col-md-6 about-content">
                                    {userData.phone}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 about-title py-1">
                                    Profession
                                </div>
                                <div className="col-md-6 about-content py-1 pb-5">
                                    {userData.work}
                                </div>
                            </div>
                            </div>
                            {/* Left side tab*/}
                            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div className="row about-title pb-5 pl-3">
                                1990 February 19th Adobe Photoshop 1.0.<br />
                                1990 September 10th Archie – the first search engine.<br />
                                1990 December 25th WorldWideWeb – the first browser. <br />
                                1991 April. Gopher. <br />
                                1991 May 14th Line Mode Browser. <br />
                                1991 August. World Wide Web Virtual Library. <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                </form>
                </div>
            </div>
            
        </div>
    )
}

export default About
