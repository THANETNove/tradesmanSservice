export const shopAllReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_SHOPALL':
            return action.payload
         case 'DELETE_SHOPALL':
            return action.payload
         default: 
            return state;
     }
  
 }
 