import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }

    function viewPassword()
    {
      var passwordInput = document.getElementById('password');
      var passStatus = document.getElementById('pass-status');
     
      if (passwordInput.type === 'password'){
        passwordInput.type='text';
        passStatus.className='fa fa-eye-slash';
        
      }
      else{
        passwordInput.type='password';
        passStatus.className='fa fa-eye';
      }
    }
    function viewPassword1()
    {
      var passwordInput = document.getElementById('cf_password');
      var passStatus = document.getElementById('pass-status1');
     
      if (passwordInput.type === 'password'){
        passwordInput.type='text';
        passStatus.className='fa fa-eye-slash';
        
      }
      else{
        passwordInput.type='password';
        passStatus.className='fa fa-eye';
      }
    }
    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>

            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Password <i id="pass-status" className="fa fa-eye" aria-hidden="true" onClick={viewPassword}></i></label>
                <input type="password" name="password" id="password" value={password}
                onChange={handleChangeInput} />

                <label htmlFor="cf_password">Confirm Password <i id="pass-status1" className="fa fa-eye" aria-hidden="true" onClick={viewPassword1}></i></label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password}
                onChange={handleChangeInput} />         

                <button onClick={handleResetPass}>Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword