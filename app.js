const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const {Contact} = require('./models');
const { ResultWithContext } = require('express-validator/src/chain');
const port = 3000;


// Gunakan ejs
app.set('view engine', 'ejs');

// Third-Party Midleware
app.use(expressLayouts);

// Built-in Midleware

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Konfigurasi flash

app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(flash());

app.get('/about', (req, res)=>{
    // res.sendFile('./about.html', {root:__dirname});
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'view about'
    });
});

app.get('/contact', async (req, res)=>{
    const contacts = await Contact.findAll();
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: 'halaman contact',
        msg: req.flash('msg'),
        contacts
    });
});

// Halaman Tambah Data Contact
app.get('/contact/add', (req, res)=>{
    res.render('contact-add',{
        layout: 'layouts/main-layouts',
        title: 'Halaman tambah contact'
    });
});

// Proses Tambah data contact
app.post('/contact', [
    body('nama').custom(async (value)=>{
        const duplikat = await Contact.findOne({
            where: {nama: value}
        });
        if(duplikat){
            throw new Error('Nama contact sudah digunakan!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(), 
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
    ], 
    (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({ errors: errors.array() });
        res.render('contact-add',{
            layout: 'layouts/main-layouts',
            title: 'Halaman tambah contact',
            errors: errors.array()
        });
    } else {
        Contact.create({
            nama: req.body.nama,
            nohp: req.body.nohp,
            email: req.body.email
        }).then((contact)=>{
            req.flash('msg', 'Data contact bersail ditambahkan!');
            res.redirect('/contact');
        }).catch(err => {
            res.status(422).json("Can't add contact")
        })
    }
}
);

// Proses delete Contact
app.get('/contact/delete/:nama', (req, res)=>{
    const contact = Contact.findOne({
        where: {nama: req.params.nama}
    });
    if(!contact){
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        Contact.destroy({
            where: {nama: req.params.nama}
        }).then((result)=>{
            req.flash('msg', 'Data contact bersail dihapus!');
            res.redirect('/contact');
        }).catch(err=>{
            res.status(422).json("Can't delete contact")
        });
    }
});

// halaman detail
app.get('/contact/:nama', async (req, res)=>{
    const contact = await Contact.findOne({
        where: {nama: req.params.nama}
    });
    res.render('detail', {
        layout: 'layouts/main-layouts',
        title: 'halaman detail contact',
        contact,
    });
});



app.get('/', (req, res)=>{
    const kariyawan = 
    [
        {
        nama: 'akhmad',
        nik: '234'
        },
        {
        nama: 'wildan',
        nik: '234'
        },
        {
        nama: 'arthur',
        nik: '234'
        }
    ]
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Halaman index',
        kariyawan,
    });
});


app.listen(port, ()=>{
    console.log(`Example app listening on http://localhost:${port}`);
});




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
// Contact.findAll().then((contact)=> console.log(contact));
// Contact.findOne({
//     where: {id: 1}
// })
// .then(contact => console.log(contact));

// delete at psql

// Contact.destroy({
//     where: {id: 1}
// })
// .then(() => console.log(`contact sudah dihapus`));