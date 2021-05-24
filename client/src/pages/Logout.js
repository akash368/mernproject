import React, { useEffect, useContext } from 'react'
import {useHistory} from 'react-router-dom'

import {UserContext} from '../App'

const Logout = () =>  {
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);

    useEffect(() =>
    {
        fetch('/logout',{
            methods:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credientials:"include"
        }).then((res) =>
        {
            dispatch({type:"USER", payload:false});
            window.alert("Logout");
            history.push('/pages/login',{replace: true});
             if(res.status !== 200)
             {
                 const error = new Error(res.error);
                 throw error;
             }
        }).catch((err) =>
        {
            console.log(err);
        });
        
    });
    return (
        
        

        //promises method


        <div className="Background">
        
        </div>
    )
}

export default Logout
