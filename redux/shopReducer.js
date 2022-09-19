export const shopReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_SHOP':
            return action.payload
         case 'DELETE_SHOP':
            return action.payload
         default: 
            return state;
     }
  
 }
 