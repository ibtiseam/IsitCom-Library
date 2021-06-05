import React, {useState} from 'react'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty} from '../../utils/validation/Validation'


const initialState = {
    title: '',
    link: '',
    err: '',
    success: ''
}

function UploadRap() {
    const [rapport, setRapport] = useState(initialState)

    const {title, link, err, success} = rapport
    

    const handleChangeInput = e => {
        const {title, value} = e.target
        setRapport({...rapport, [title]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(title) || isEmpty(link))
                return setRapport({...rapport, err: "Please fill in all fields.", success: ''})

        try {
            const res = await axios.post('/rapport/uploadRap', {
                title,link
            })

            setRapport({...rapport, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setRapport({...rapport, err: err.response.data.msg, success: ''})
        }
    }



    return (
        <div className="login_page">
            <h2>upload</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                        
                         <label htmlFor="link">Link</label>
                        <input type="file" name="link" id="link" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Title" id="title"
                        name="title" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Upload </button>
                </div>
            </form>
        </div>
    )
}

export default UploadRap