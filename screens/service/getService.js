import axios from "axios";
/* import { getToken } from '../hooks/useToken'; */
/*  const  url = 'https://reqres.in';  */
/*  const url = 'http://192.168.1.12/project/api-database';  */  //หน่วย
const url = 'https://th-projet.com/api-database';    // ยอน 
/* const getUser = async () => {

  const rse = await axios.get(`${url}/getUsers`).then((result) => {
    // handle success

    return result.data;
  })
    .catch((error) => {
      // handle error
      return error;
    })
  return rse;

};


const createBookBank = async (e) => {

  const bookBank = await axios.post(`${url}/createBookBank`, {
    name: e[0],
    number_bank: e[1],
    bank: e[2],
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return bookBank;
};

const createAddress = async (e) => {

  const address = await axios.post(`${url}/createAddress`, {

  }).then((result) => {
    return "success";

  })
    .catch((error) => {

      return "error";
    });
  return address;
};


const uplodeImages = async (e) => {

  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id_user', 'id_user-123456')


  ! การเขียน แปบ fetch data
   fetch(`${url}/uplodeImages`, {
    method: 'POST',
    body: formdata
  })
    .then((response) => response.json())
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      console.log('error', error);
    });
 
  
const image  =  await axios.post(`${url}/uplodeImages`,formdata, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8',
        }
      }) 
      .then((result) => {
        return "success";
     })
     .catch((error) =>  {
      return error;
  
     });
  return image;
};
 */

/**
 * ! ส่วนของ get 
*/






// ดึง user  WHERE phone  ว่ามีเบอร์ อยู่ใหม
const searchUser = async (e) => {
  const seaUser = await axios.get(`${url}/searchUser.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      phone: e[0],
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};
// ดึง user 
const getUser = async (e) => {
  const seaUser = await axios.get(`${url}/getUser.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};
const getAnnonceText = async () => {
  const seaUser = await axios.get(`${url}/getAnnonceText.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};
// ดึง getShop 
const getShop = async (e) => {
  const seaUser = await axios.get(`${url}/getShop.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};
const getImageShop = async (e) => {
  const seaUser = await axios.get(`${url}/getImageShop.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};

// ดึงงานช่างทั้งหมด
const technician_type = async () => {
  const seaUser = await axios.get(`${url}/getTechnician_job_type.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
}
// ดึงสินค้าทั้งหมด
const getShopImagesAll = async () => {
  const getShopImg = await axios.get(`${url}/getShopImagesAll.php`, {

    headers: {
      'Content-Type': 'text/javascript;charset=utf-8'
    },

    params: {
      isAdd: true,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return error;
    });
  return getShopImg;
}
const getHomeImages = async () => {
  const getShopImg = await axios.get(`${url}/getImageHome.php`, {

    headers: {
      'Content-Type': 'text/javascript;charset=utf-8'
    },

    params: {
      isAdd: true,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return error;
    });
  return getShopImg;
}

const getShopImagesAll_Admin = async () => {
  const getShopImg = await axios.get(`${url}/getShopImagesAll_Admin.php`, {

    headers: {
      'Content-Type': 'text/javascript;charset=utf-8'
    },

    params: {
      isAdd: true,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return error;
    });
  return getShopImg;
}

// ดึงข้อมูล ช่าง ตามประเภทงาน
const gettechnician = async (e) => {
  const seaUser = await axios.get(`${url}/getTechnician.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      name: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return error;
    });
  return seaUser;
};

// ดึงข้อมูล ช่าง เเต่ละคน
const gettechnicianAddressid = async (e) => {
  const seaUser = await axios.get(`${url}/getTechnicianAddress.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data[0];
  })
    .catch((error) => {

      return error;
    });
  return seaUser;
};
/* ดึงข้อมูลลูกค้า เเต่ละคน */
const getUserAddressid = async (e) => {

  const getUserID = await axios.get(`${url}/getUserAddress.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return error;
    });

  return getUserID;
};


// เช็ค user/pass login
const getLogin = async (e) => {
  const seaUser = await axios.get(`${url}/login.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      phone: e[0],
      password: e[1],
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return error;
    });
  return seaUser;
};
// เช็ค  Reset password
const getRestPassword = async (e) => {
  const seaUser = await axios.get(`${url}/restPassword.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      phone: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return error;
    });
  return seaUser;
};

const getAddress = async (e) => {
  const seaUser = await axios.get(`${url}/getAddress.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};

const getAddress_user = async (e) => {
  const seaUser = await axios.get(`${url}/getAddress_user.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};

const getMessage_user = async (e) => {
  const seaUser = await axios.get(`${url}/getMessage_user.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,

    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};
const getMessage_user_id = async (id_user, id_tech) => {
  const seaUser = await axios.get(`${url}/getMessage_user_id.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id_user: id_user,
      id_tech: id_tech,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};

const getMessage_user_groupBy = async (e) => {
  const seaUser = await axios.get(`${url}/getMessage_user_groupBy.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};


const getMessage_technician = async (e) => {
  const seaUser = await axios.get(`${url}/getMessage_technician.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};

const getMessage_technician_id = async (id_user, id_tech) => {
  const seaUser = await axios.get(`${url}/getMessage_technician_id.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id_user: id_user,
      id_tech: id_tech
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};
const getMessage_technician_groupBy = async (e) => {
  const seaUser = await axios.get(`${url}/getMessage_technician_groupBy.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};


const getImage = async (e) => {
  const seaUser = await axios.get(`${url}/getImages.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};
const getImageProfile = async (e) => {

  const seaUser = await axios.get(`${url}/getImagesProfile.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};

const getBookBank = async (e) => {
  const bookbank = await axios.get(`${url}/getBank.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return bookbank;
};

// ดึง 'งานของ repairWork User' 
const getRepairWork = async (e) => {
  const seaUser = await axios.get(`${url}/getRepairWork.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};

// ดึง 'งานของ repairWork User ที่ผ่านการอนุมัติ' 
const getRepairWorkUser = async (e) => {
  const seaUser = await axios.get(`${url}/getRepairWorkUser.php`, {
    headers: {
      'Content-Type': 'text/javascript;charset=utf-8',
    },
    params: {
      isAdd: true,
      id: e,
    }
  }).then((result) => {

    return result.data;
  })
    .catch((error) => {

      return null;
    });
  return seaUser;
};



/**
 * ! ส่วนของ post 
*/

// สมัครสมาชิก
const createUser = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('phone', e[0]);
  formdata.append('password', e[1]);
  formdata.append('status_user', e[2]);
  formdata.append('status_check', e[3]);
  formdata.append('notificationsId', e[4]);
  const cerUser = await axios.post(`${url}/addUser.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cerUser;
};
const createAnnonceText = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('announce', e);
  const cerUser = await axios.post(`${url}/addAnnonceText.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cerUser;
};
const createShop = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id_shop', e[0]);
  formdata.append('heading', e[1]);
  formdata.append('detail', e[2]);
  const cerUser = await axios.post(`${url}/addShop.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cerUser;
};

const createAddress = async (e) => {

  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('idPhone', e[0]);
  formdata.append('name', e[1]);
  formdata.append('phone_number', e[2]);
  formdata.append('email', e[3]);
  formdata.append('addressUser', e[4]);
  formdata.append('subdistrict', e[5]);
  formdata.append('district', e[6]);
  formdata.append('province', e[7]);
  formdata.append('zipcode', e[8]);
  formdata.append('location', JSON.stringify(e[9]));
  formdata.append('technician_1', e[10]);
  formdata.append('technician_2', e[11]);
  const cerAdd = await axios.post(`${url}/addAddress.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cerAdd;
}
const createAddress_user = async (e) => {

  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('idPhone', e[0]);
  formdata.append('name', e[1]);
  formdata.append('phone_number', e[2]);
  formdata.append('email', e[3]);
  formdata.append('addressUser', e[4]);
  formdata.append('subdistrict', e[5]);
  formdata.append('district', e[6]);
  formdata.append('province', e[7]);
  formdata.append('zipcode', e[8]);
  formdata.append('location', JSON.stringify(e[9]));
  const adduser = await axios.post(`${url}/addAddress_user.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });

  return adduser;
}

const addMessage = async (e) => {

  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id_user', e[0]);
  formdata.append('id', e[1]);
  formdata.append('message', e[2]);
  formdata.append('status_read', e[3]);
  formdata.append('status_user', e[4]);
  const message = await axios.post(`${url}/addMessage.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return message;
};

const createBookBank = async (e) => {

  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id_user', e[0]);
  formdata.append('name', e[1]);
  formdata.append('number_bank', e[2]);
  formdata.append('bank', e[3]);
  const bookBank = await axios.post(`${url}/addBank.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return bookBank;
};
const createRepairWork = async (id, name, phone, nameRepairWork, repair_work, address) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id_user', id);
  formdata.append('name', name);
  formdata.append('phone', phone);
  formdata.append('nameRepairWork', nameRepairWork);
  formdata.append('repair_work', repair_work);
  formdata.append('address', address);
  const bookBank = await axios.post(`${url}/addRepairWork.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return bookBank;
};


const uplodeImages = async (e, id_user) => {
  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id_user', id_user)

  const cerimg = await axios.post(`${url}/saveFile.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cerimg;
};

const uplodeImagesShop = async (e, userId) => {

  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id_user', userId[0])
  formdata.append('nameImage', userId[1])

  const cershop = await axios.post(`${url}/saveFileShop.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cershop;
};

const uplodeImagesHome = async (e, userId) => {

  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('nameImage', userId)

  const cershop = await axios.post(`${url}/saveFileHome.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cershop;
};

const imageProfile = async (e, id_user) => {
  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id_user', id_user)

  const cerimg = await axios.post(`${url}/saveFile_Profile.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cerimg;
};




/* update */
const updateAddress = async (e) => {

  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', e[0]);
  formdata.append('name', e[1]);
  formdata.append('phone_number', e[2]);
  formdata.append('email', e[3]);
  formdata.append('addressUser', e[4]);
  formdata.append('subdistrict', e[5]);
  formdata.append('district', e[6]);
  formdata.append('province', e[7]);
  formdata.append('zipcode', e[8]);
  formdata.append('location', JSON.stringify(e[9]));
  formdata.append('technician_1', e[10]);
  formdata.append('technician_2', e[11]);
  const cerAdd = await axios.post(`${url}/updateAddress.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return cerAdd;

}

const updateAddress_user = async (e) => {

  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', e[0]);
  formdata.append('name', e[1]);
  formdata.append('phone_number', e[2]);
  formdata.append('email', e[3]);
  formdata.append('addressUser', e[4]);
  formdata.append('subdistrict', e[5]);
  formdata.append('district', e[6]);
  formdata.append('province', e[7]);
  formdata.append('zipcode', e[8]);
  formdata.append('location', JSON.stringify(e[9]));
  const upuser = await axios.post(`${url}/updateAddress_user.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return upuser;

}

const updateShop = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', e[0]);
  formdata.append('heading', e[1]);
  formdata.append('detail', e[2]);

  const upuser = await axios.post(`${url}/updateShop.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return upuser;
}


const updatePasswors = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', e[0]);
  formdata.append('password', e[1]);

  const upPass = await axios.post(`${url}/updatePassword.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return error;
    });
  return upPass;

}

const uplodeUpdateImages = async (e, id, name) => {

  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id', id)
  formdata.append('name', name)
  const upimg = await axios.post(`${url}/saveUpdateFile.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return null;
    });
  return upimg;
};

const uplodeUpdateImagesShop = async (e, id, name) => {

  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id', id)
  formdata.append('name', name)
  const upimgshop = await axios.post(`${url}/saveUpdateFileShop.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return null;
    });
  return upimgshop;
};

const uplodeUpdateImagesHome = async (e, id, name) => {
  /* console.log("uplodeUpdateImagesHome",e,id,name); */
  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id', id)
  formdata.append('name', name)
  const upimgshop = await axios.post(`${url}/saveUpdateFileHome.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return null;
    });
  return upimgshop;
};


const uplodeUpdateImagesProfile = async (e, id, name) => {

  const formdata = new FormData();
  formdata.append('image', {
    uri: e.uri,
    type: 'image/jpg',
    name: e.uri.split('/').pop(),
  })
  formdata.append('id', id)
  formdata.append('name', name)
  const upimg_pro = await axios.post(`${url}/saveUpdateFile_Profile.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {

    return "success";
  })
    .catch((error) => {

      return null;
    });
  return upimg_pro;
};

const updateBookBank = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', e[0]);
  formdata.append('name', e[1]);
  formdata.append('number_bank', e[2]);
  formdata.append('bank', e[3]);
  const upBookBank = await axios.post(`${url}/updateBank.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return upBookBank;
};

const updataAnnonceText = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', e[0]);
  formdata.append('annonce', e[1]);
  const upAnnonceText = await axios.post(`${url}/updataAnnonceText.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return upAnnonceText;
};
const UpDateStatusShop = async (e) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', e[0]);
  formdata.append('status', e[1]);
  formdata.append('comment', e[2]);
  const upBookBank = await axios.post(`${url}/upDateStatusShop.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return result;
  })
    .catch((error) => {
      return error;
    });
  return upBookBank;
};

const updateMessage = async (id, value) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', id);
  formdata.append('status_read', value);
  const upBookBank = await axios.post(`${url}/updateMessage.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return upBookBank;
};
const updateRepairWork = async (id, name, phone, nameRepairWork, repair_work, address) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', id);
  formdata.append('name', name);
  formdata.append('phone', phone);
  formdata.append('nameRepairWork', nameRepairWork);
  formdata.append('repair_work', repair_work);
  formdata.append('address', address);
  const bookBank = await axios.post(`${url}/updateRepairWork.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return bookBank;
};
const updateRepairWorkUser = async (id, statusAdmin, statusUser) => {
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', id);
  formdata.append('statusAdmin', statusAdmin);
  formdata.append('statusUser', statusUser);
  const bookBank = await axios.post(`${url}/updateRepairWorkStarus.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return "success";
  })
    .catch((error) => {
      return error;
    });
  return bookBank;
};


// delete
const deleteImagsShop = async (id, name) => {
  /*    const seaUser = await axios.get(`${url}/deleteImagsShop.php`, {
      headers: {
        'Content-Type': 'text/javascript;charset=utf-8',
      },
      params: {
        isAdd: true,
        id: id,
        name:name
      }
    }).then((result) => {
      return "success";
    })
      .catch((error) => {
        return error;
      }); */
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', id);
  formdata.append('name', name);
  const deleteImg = await axios.post(`${url}/deleteImagsShop.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  }).then((result) => {
    return result;
  })
    .catch((error) => {
      return error;
    });
  return deleteImg;
};
const delete_Announced = async (id) => {

  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', id);
  const deleteImg = await axios.post(`${url}/delete_Announced.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  })
    .then((result) => {
      return "success";
    })
    .catch((error) => {
      return error;
    });
  return deleteImg;
};
const delete_user = async (id) => {
  console.log("id", id);
  const formdata = new FormData();
  formdata.append('isAdd', true);
  formdata.append('id', id);
  const deleteImg = await axios.post(`${url}/delete_user.php`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    }
  })
    .then((result) => {
      return "success";
    })
    .catch((error) => {
      return error;
    });
  return deleteImg;
};


export default {
  addMessage,
  createUser,
  createAnnonceText,
  createShop,
  createAddress,
  createBookBank,
  searchUser,
  createAddress_user,
  createRepairWork,
  getLogin,
  technician_type,
  getAddress,
  getImage,
  getBookBank,
  imageProfile,
  getImageProfile,
  getAddress_user,
  gettechnician,
  gettechnicianAddressid,
  getMessage_user,
  getMessage_user_id,
  getMessage_technician,
  getMessage_technician_id,
  getShopImagesAll,
  getHomeImages,
  getShopImagesAll_Admin,
  getRestPassword,
  getMessage_user_groupBy,
  getMessage_technician_groupBy,
  getUserAddressid,
  getUser,
  getImageShop,
  uplodeImagesHome,
  getShop,
  getAnnonceText,
  getRepairWork,
  getRepairWorkUser,
  updateShop,
  updateBookBank,
  uplodeUpdateImagesShop,
  uplodeUpdateImagesHome,
  uplodeImagesShop,
  updateMessage,
  updatePasswors,
  UpDateStatusShop,
  updateAddress,
  uplodeImages,
  uplodeUpdateImagesProfile,
  uplodeUpdateImages,
  updateAddress_user,
  updataAnnonceText,
  updateRepairWork,
  updateRepairWorkUser,
  deleteImagsShop,
  delete_Announced,
  delete_user
};
