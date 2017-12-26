import Koa2 from 'koa';
import KoaBody from 'koa-body';
import KoaStatic from 'koa-static2';
import {
  System as SystemConfig,
  DBConfig
} from './config';
import path from 'path';
import MainRoutes from './routes/main-routes';
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch';
import ErrorRoutes from './routes/error-routes';
import mongoose from 'mongoose';

// import jwt from 'koa-jwt';
// import fs from 'fs';
// import PluginLoader from './lib/PluginLoader'

const app = new Koa2();
const env = process.env.NODE_ENV || 'development'; // Current mode

mongoose.Promise = global.Promise;
mongoose.connect(DBConfig.url, {useMongoClient: DBConfig.useMongoClient});

let db = mongoose.connection;

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', () => {
  console.log('数据库连接成功');
});

// const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'));

app
  .use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', '*');
    } else {
      ctx.set('Access-Control-Allow-Origin', '*');
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true); // 允许带上 cookie
    ctx.set('Access-Control-Max-Age', 864000); // 允许带上 cookie
    return next();
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  // .use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/user\/login|\/assets/] }))//注释掉这行
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(ErrorRoutes());

if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
      const ms = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
  });
}

app.listen(SystemConfig.API_server_port);

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...');

export default app;
