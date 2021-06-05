import ACTIONS from './index'
import axios from 'axios'

export const fetchAllRapports = async (token) => {
    const res = await axios.get('/rapport/allRapports', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllRapports  = (res) => {
    return {
        type: ACTIONS.GET_ALL_RAPPORTS,
        payload: res.data
    }
}