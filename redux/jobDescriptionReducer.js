export const jobDescriptionReducer = (state = null, action) => {
    switch (action.type) {
        case 'ADD_JOB':
            return action.payload
        case 'DELETE_JOB':
            return action.payload
        default:
            return state;
    }

}

