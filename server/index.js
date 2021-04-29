const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const PORT = process.env.PORT || 8080;

// const indexRouter = require('./routes/index');
// const testAPIRouter = require('./routes/testAPI');
// const animationsRouter = require('./routes/animations');
// const loginRouter = require('./routes/login').router;
// const registerPage = require('./routes/register-page');
// const animationList = require('./routes/animation-list');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '../client/public/favicon.ico')));
app.use(compression());
app.use(helmet());

// app.use('/', indexRouter);
// app.use('/testAPI', testAPIRouter);
// app.use('/animations', animationsRouter);
// app.use('/login', loginRouter);
// app.use('/register', registerPage);
// app.use('/animation-list', animationList);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('../client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
//     });
// }

app.get('/temp', (req, res) => res.json('temporary route'));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});