export const startAppReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_STARTAPP':
            return action.payload
         case 'DELETE_STARTAPP':
            return action.payload
         default: 
            return state;
     }
  
 }
 
