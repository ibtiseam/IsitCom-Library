import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'

import { dispatchGetAllRapports, fetchAllRapports } from '../../../redux/actions/rapportsAction'

const initialState = {
    title: '',
    link: '',
    err: '',
    success: ''
}

function Library() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const rapports = useSelector(state => state.rapports)
    const [rapport, setRapport] = useState(initialState)

    const {isLogged,isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {err, success} = data
    const {title, link} = rapport
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

  useEffect(() => {
        if(isLogged){
            fetchAllRapports(token).then(res =>{
                dispatch(dispatchGetAllRapports(res))
            })
        }
    },[token, isLogged, dispatch, callback])

    const changeRapport = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'application/pdf')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
             await axios.post('/api/upload_rapport', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleDelete = async (id) => {
        try {
            if(rapport._id !== id){
                if(window.confirm("Are you sure you want to delete this rapport?")){
                    setLoading(true)
                    await axios.delete(`/rapport/deleteRapport/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const res = await axios.post('/rapport/uploadRap', {
                title,link
            })

            setRapport({...rapport, err: '', success: res.data.msg})
        } catch (err) {
            console.log(err)
            err.response.data.msg && 
            setRapport({...rapport, err: err.response.data.msg, success: ''})
        }

    }
    const handleChangeInput = e => {
        const {title, value} = e.target
        setRapport({...rapport, [title]:value, err: '', success: ''})
    }
    return (
        <>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
        </div>
        <div className="profile_page">
            {isAdmin ?
              <div className="col-left">
              <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="title">Title</label>
                  <input type="text" placeholder="Title" id="title"
                      name="title"  onChange={handleChangeInput} />
              </div>

              <div>
                  <span>
                  <i className="fas fa-upload">
                      <p>Upload</p>
                      <input type="file" name="link" id="link" onChange={changeRapport} />
                      </i>
                      </span>
              </div>
              <div className="row">
                  <button type="submit">confirm </button>
              </div>
              </form>
          </div>
             : ""
            }
          
            <div className="col-right">
                <h2>Rapports List </h2>

                <div style={{overflowX: "auto"}}>
                <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Link</th>
                               {isAdmin? <th>Action</th> :""}
                                
                            </tr>
                        </thead>
                      
                        <tbody>
                            {
                                rapports.map(rapport => (
                                    <tr key={rapport._id}>
                                        <td>{rapport._id}</td>
                                        <td>{rapport.title}</td>
                                        <td>
                                            <a href={rapport.link} download>
                                            <i className="fas fa-download" title="download">
                                            
                                            </i>
                                            </a>

                                            </td>
                                            {isAdmin ?
                                            
                                        <td>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(rapport._id)} ></i>
                                        </td>
                                        : "" }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
       
        </>
    )
}

export default  Library
