export const urlReducer = (state = null,action ) => {
    switch (action.type) {
        case 'ADD_URL':
           return  action.payload;

        case 'DELETE_URL':
           return action.payload;

        default: 
           return state;
    }
}