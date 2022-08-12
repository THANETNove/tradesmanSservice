export const logInReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_LOGIN':
            return action.payload
         case 'DELETE_LOGIN':
            return action.payload
         default: 
            return state;
     }
  
 }
 
