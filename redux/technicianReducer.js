export const technicianReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_TECHNICAN':
            return action.payload
         case 'DELETE_TECHNICAN':
            return action.payload
         default: 
            return state;
     }
  
 }
 
