import ACTIONS from '../actions/'

const rapports =[]

const rapportsReducer = (state = rapports, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_RAPPORTS:
            return action.payload
        default:
            return state
    }
}

export default rapportsReducer