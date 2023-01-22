
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import { logInReducer } from './logInReducer';
import { urlReducer } from './urlReducer';
import { addressReducer } from './addressReducer';
import { imagesReducer } from './imagesReducer';
import { bookbankReducer } from './bookbankReducer';
import { imageProfileReducer } from './imageProfileReducer';
import { addressUserReducer } from './addressUserReducer';
import { technicianReducer } from './technicianReducer';
import { idTechnicianReducer } from './idTechnicianReducer';
import { startAppReducer } from './startAppReducer';
import { notificationsReducer } from './notificationsReducer';
import { imgesShopReducer } from './imgesShopReducer';
import { shopReducer } from './shopReducer';
import { shopAllReducer } from './shopAllReducer';
import { idShopReducer } from './idShopReducer';
import { jobDescriptionReducer } from './jobDescriptionReducer';
import { NotificationsRepairWorkResucer, NotificationsRepairWorkResucerTec, statusUpdate, dataJob } from './NotificationsRepairWorkResucer';

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};



const rootReducer = combineReducers({
  login: logInReducer,
  urlImage: urlReducer,
  address: addressReducer,
  image: imagesReducer,
  imageProfile: imageProfileReducer,
  bookbank: bookbankReducer,
  addressUser: addressUserReducer,
  technician: technicianReducer,
  id: idTechnicianReducer,
  startApp: startAppReducer,
  notifications: notificationsReducer,
  imgesShop: imgesShopReducer,
  shop: shopReducer,
  shopAll: shopAllReducer,
  idShop: idShopReducer,
  jobDescription: jobDescriptionReducer,
  notificationsRepairWork: NotificationsRepairWorkResucer,
  notificationsRepairWorkTec: NotificationsRepairWorkResucerTec,
  statusUpdate: statusUpdate,
  dataJob: dataJob,

});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor }
}
