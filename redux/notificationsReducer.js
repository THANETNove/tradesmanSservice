export const notificationsReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_NOTIFICATIONS':
            return action.payload
         case 'DELETE_NOTIFICATIONS':
            return action.payload
         default: 
            return state;
     }
  
 }
 
