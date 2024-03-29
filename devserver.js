import path from 'path';
import url from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import proxy from 'express-http-proxy';

function root(fn) {
  return path.resolve(__dirname, fn);
}

function main() {
  const app = express();

  app.use('/public', express.static(root('dist'), {
    dotfiles: 'ignore',
  }));

  /*
  app.use('/api', (req, res) => {
    console.log('API called.');
    res.json({
      ok: true,
    });
    next();
  });
  */
  app.use('/api', proxy('http://localhost:8080', {
    proxyReqPathResolver: function(req, res) {
      let ret = url.parse(req.url).path;
      ret = '/distribution/api' + ret;
      console.log(ret);
      return ret;
    },
  }));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  app.use('/', (req, res) => {
    res.sendFile(root('dist/index.html'));
  });

  app.listen(3000);
  console.log('App listening on port 3000...');
}

main();
