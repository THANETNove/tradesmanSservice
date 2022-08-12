export const idTechnicianReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_IDTECHNICAN':
            return action.payload
         case 'DELETE_IDTECHNICAN':
            return action.payload
         default: 
            return state;
     }
  
 }
 
