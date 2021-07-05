// const express = require('express');
// const app = express();
// const expressLayouts = require('express-ejs-layouts');
// const { body, validationResult, check } = require('express-validator');
// const session = require('express-session');
// const cookieParser = require("cookie-parser");
// const flash = require('connect-flash');
// const port = 3000;


// // Gunakan ejs
// app.set('view engine', 'ejs');

// // Third-Party Midleware
// app.use(expressLayouts);

// // Built-in Midleware

// app.use(express.static('public'));
// app.use(express.urlencoded({extended: true}));

// // Konfigurasi flash

// app.use(cookieParser('secret'));
// app.use(
//     session({
//         cookie: {maxAge: 6000},
//         secret: 'secret',
//         resave: true,
//         saveUninitialized: true,
//     })
// );

// app.use(flash());

// app.get('/about', (req, res)=>{
//     // res.sendFile('./about.html', {root:__dirname});
//     res.render('about', {
//         layout: 'layouts/main-layouts',
//         title: 'view about'
//     });
// });
// app.get('/contact', (req, res)=>{
//     res.render('contact', {
//         layout: 'layouts/main-layouts',
//         title: 'halaman contact',
//         msg: req.flash('msg'),
//     });
// }); 

// app.get('/', (req, res)=>{
//     const kariyawan = 
//     [
//         {
//         nama: 'akhmad',
//         nik: '234'
//         },
//         {
//         nama: 'wildan',
//         nik: '234'
//         },
//         {
//         nama: 'arthur',
//         nik: '234'
//         }
//     ]
//     res.render('index', {
//         layout: 'layouts/main-layouts',
//         title: 'Halaman index',
//         kariyawan,
//     });
// });


// app.listen(port, ()=>{
//     console.log(`Example app listening on http://localhost:${port}`);
// });

const e = require('connect-flash');
const {Contact} = require('./models');

// insert psql
// Contact.create({
//     nama: 'akhmad',
//     nohp: '089867897987',
//     email: 'wildan@email.com'
// }).then((article)=>{
//     console.log(article);
// });

// updete psql
// const query = {
//     where: {nama: 'akhmad'}
// };
// Contact.update({
//     nama: 'wildan'
// }, query)
// .then(()=>{
//     console.log('Contact berhasil diupdate');
//     process.exit();
// })
// .catch(err => {
//     console.error('Gagal megupdate contact');
// });

// query find at psql
Contact.findAll().then((contact)=> console.log(contact));
// Contact.findOne({
//     where: {id: 1}
// })
// .then(contact => console.log(contact));

// delete at psql

// Contact.destroy({
//     where: {id: 1}
// })
// .then(() => console.log(`contact sudah dihapus`));