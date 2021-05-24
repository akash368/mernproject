import React, {useState, useEffect} from 'react'

function Home() {
    const [userData, setuserData] = useState('');

    const [Show, setShow] = useState(false);
	
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
            setuserData(data); 
            setShow(true)               // usestate ki help se jo data 'data' name ke variable m aya hai use hm output m dynamic data show karayenge
            

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
    return (
        <div className="Background">
            <p className="home-content">Welcome</p><h1 style={{
                color:"#D33A3D",
                marginLeft:"40%",
                fontSize:"50px",
                fontFamily:"callibri"

            }}>{userData.name}<br /></h1><p className="home-title">{ Show ? "Happy to see you back" : "This is Home Page"}</p>
        </div>
    )
}

export default Home
