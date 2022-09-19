export const idShopReducer = (state = null,  action) => {
    switch (action.type) {
         case 'ADD_IDSHOP':
            return action.payload
         case 'DELETE_IDSHOP':
            return action.payload
         default: 
            return state;
     }
  
 }
 