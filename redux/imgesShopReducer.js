export const imgesShopReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_IMAGESHOP':
            return action.payload
         case 'DELETE_IMAGESHOP':
            return action.payload
         default: 
            return state;
     }
  
 }
 