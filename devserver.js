import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

function root(fn) {
  return path.resolve(__dirname, fn);
}

function main() {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  app.use('/public', express.static(root('dist'), {
    dotfiles: 'ignore',
  }));

  app.use('/api', (req, res) => {
    console.log('API called.');
    res.json({
      ok: true,
    });
    next();
  });

  app.use('/', (req, res) => {
    res.sendFile(root('dist/index.html'));
  });

  app.listen(3000);
  console.log('App listening on port 3000...');
}

main();
