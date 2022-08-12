export const imagesReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_IMAGE':
            return action.payload
         case 'DELETE_IMAGE':
            return action.payload
         default: 
            return state;
     }
  
 }
 
