const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');



app.use(cors());
app.use(express.json());

/* ส่วนของการเพิ่มภาพ */
const multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());




const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "app_tradesman",
});





app.get('/getUsers', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.send(err);

        } else {
            res.send(result);
        }
    });
});


app.post('/createUser', (req, res) => {


    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const statusUser = req.body.statusUser;
    const statusCkeck = req.body.statusCkeck;

    db.query(`INSERT INTO users (id,name,email,phone,password,status_user,status_check) VALUES (null ,'${name}','${email}','${phone}','${password}','${statusUser}','${statusCkeck}')`,
        (err, result) => {
            if (err) {
                res.send(err);

            } else {
                res.send(result);
            }
        });
});

app.post('/createBookBank', (req, res) => {

    const name = req.body.name;
    const number_bank = req.body.number_bank;
    const bank = req.body.bank;


    db.query(`INSERT INTO book_bank (id,name,number_bank,bank) VALUES (null ,'${name}','${number_bank}','${bank}')`,
        (err, result) => {
            if (err) {
                res.send(err);

            } else {
                res.send(result);
            }
        });
});

app.post('/createAddress', (req, res) => {

    const name = req.body.name;
    const addressUser = req.body.addressUser;
    const subdistrict = req.body.subdistrict;
    const district = req.body.district;
    const province = req.body.province;
    const zipcode = req.body.zipcode;
    const location = req.body.location;


    db.query(`INSERT INTO address (id,name,address,subdistrict,district,province,zipcode,location) VALUES (null ,'${name}','${addressUser}','${subdistrict}','${district}','${province}','${zipcode}','${JSON.stringify(location)}')`,
        (err, result) => {
            if (err) {
                res.send(err);

            } else {
                res.send(result);
            }
        });
});



const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'public/');
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
  });
  const isImage = (req, file, callBack) => {
    if (file.mimetype.startsWith('image')) {
        callBack(null, true);
    } else {
        callBack(new Error('only Image is Allwoed..'))
    }
}
  const upload = multer({ storage,isImage });

  app.post('/uplodeImages', upload.single("image"), (req, res) => {

    if (!req.file) {

    } else {
        var imgsrc = 'http://192.168.1.5:3003/service/public/' + req.file.filename
        var insertData = "INSERT INTO image_users(file_src,id_user)VALUES(?,?)"
        db.query(insertData, [imgsrc,req.body.id_user], (err, result) => {
            if (err) {
                res.send(err);

            } else {
                res.send(result);
            }
        })
    }  

  });

/* ้เเก้ไขภาพ */
/*   app.post('/getLogin', (req, res) => {

    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password

    db.query(`SELECT  email FROM users WHERE email='${username}'  `,
        (err, result) => {
            if (err) {
                res.send(err);

            } else {
                res.send(result);
            }
        });
});
 */

app.get('/getLogin', (req, res) => {

    db.query(`SELECT  email ,password FROM users WHERE email='thanet@planforfit.com' AND password='e10adc3949ba59abbe56e057f20f883e'`, (err, result) => {
        if (err) {
           
            res.send(err);

        } else {
          
            res.send(result);
        }
    });
});

  

app.listen('3003', () => {
    console.log('server is ren 3003');
})

