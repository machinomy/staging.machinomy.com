import * as express from 'express';
export let router = express.Router();

export const HEADER_NAME = 'authorization'
export const TOKEN_NAME = 'paywall'

const parseToken = (req: express.Request, callback: Function) => {
  let content = req.get(HEADER_NAME)
   console.log(content)
  if (content) {
    let authorization = content.split(' ')
    let type = authorization[0].toLowerCase()
    let token = authorization[1]
    if (type === TOKEN_NAME) {
      callback(null, token)
    } else {
      callback(`Invalid ${HEADER_NAME} token name present. Expected ${TOKEN_NAME}, got ${type}`)
    }
  } else {
    callback(`No ${HEADER_NAME} header present`)
  }
}

const paywallHeaders = (): object => {
  let headers: { [index: string]: string } = {}
  headers['Paywall-Version'] = '0.0.3'
  headers['Paywall-Price'] = '0.1'
  headers['Paywall-Address'] = '0x3e9c7d7fe1e4d335e34b3952b1dfd5fa3df7c3f1'
  headers['Paywall-Gateway'] = 'http://localhost:4000/machinomy'
  return headers
}

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction):any => {
  res.status(402).set(paywallHeaders()).sendFile('./views/paid.html', { root: '.' })
});

router.get('/content', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  parseToken(req, (error:Error, token:string) => {
    if (token == '228') {
      res.send('rich content')
    } else {
      res.send('bitch content')
    }
  })
});
