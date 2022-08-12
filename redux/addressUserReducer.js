 export const addressUserReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_ADDRESS_USER':
            return action.payload
         case 'DELETE_ADDRESS_USER':
            return action.payload
         default: 
            return state;
     }
  
 } 
 