export const imageProfileReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_IMAGE_PROFILE':
            return action.payload
         case 'DELETE_IMAGE_PROFILE':
            return action.payload
         default: 
            return state;
     }
  
 }
 
