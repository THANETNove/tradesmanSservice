export const bookbankReducer = (state = null , action) => {
    switch (action.type) {
        case 'ADD_BOOKBANK':
            return action.payload
        case 'DELETE_BOOKBANK':
            return action.payload
        default: 
            return state;
    }
 }
 
