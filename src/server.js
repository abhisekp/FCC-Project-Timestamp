import path from 'path';
import express from 'express';
import appRoot from 'app-root-path';
import responseTime from 'response-time';
import helmet from 'helmet';
import Routers from './routers';
import poweredBy from './powered-by';

const app = express();
app.enable('trust proxy');

// PORT config
app.set('PORT', process.env.PORT);
const PORT = app.get('PORT');

// view config
const viewPath = path.join(`${appRoot}/views`);
app.set('views', viewPath);
app.set('view engine', 'ejs');

// static resources
const publicPath = path.join(`${appRoot}/public`);
app.use(express.static(publicPath));

app.use(responseTime());
app.use(helmet());
app.use(poweredBy('@abhisekp'));
app.use(Routers);

const server = app.listen(PORT, () => {
  const {port} = server.address();
  console.log(`The app is running on port ${port}`);
});
