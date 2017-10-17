import * as express from 'express'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'

import { router as routes } from './routes/index'
import { router as paid } from './routes/paid'
import { router as admin } from './routes/admin'

export let app = express();
var exphbs = require('express-handlebars')
var compression = require('compression');

// app.set('views', path.join(__dirname, 'views'))
var viewsPath = __dirname + "/views"
var hbsConfig = {
  defaultLayout: "main",
  layoutsDir: viewsPath + "/layouts/",
}
app.engine("handlebars", exphbs(hbsConfig))
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: false });
app.set("view engine", "handlebars")
// app.set('view engine', 'pug');
// app.set('view engine', 'pug');

app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/paid', paid)
app.use('/admin', admin)

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let err = new Error('Not Found');
  (err as any).status = 404;
  next(err);
})

if (app.get('env') === 'development') {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err.message)
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
