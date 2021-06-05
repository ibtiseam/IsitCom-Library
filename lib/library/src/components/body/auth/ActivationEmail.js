import React, {useState, useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg} from '../../utils/notification/Notification'



function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <div className="active_page">
           
            {success ? 
             <div className="modal-dialog">
                 <div className="card">
                     <div className="text-right cross">  </div>
                     <div className="card-body text-center"> 
                     <img src="https://img.icons8.com/bubbles/200/000000/trophy.png" alt="welcom"/>
                         <h4>CONGRATULATIONS!</h4>
                         <p> Welcome to ISICTOM LIBRARY </p> <br/>
                         <p>We're excited to have you get started.</p>
                         
                         <Link to="/login">LogIn</Link>
                     </div>
                 </div>
             </div>
     
             : 
             <div className="modal-dialog">
             <div className="card">
                 <div className="text-right cross">  </div>
                 <div className="card-body text-center"> 
                 <img src="/images/err.png" alt="err"/>
                     <h4>{showErrMsg(err)}</h4>
                     <Link to="/"> go Home</Link>
              </div>
             </div>
         </div>
              }
           
        </div>
    )
}

export default ActivationEmail