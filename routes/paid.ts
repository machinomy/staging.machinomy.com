import * as express from 'express'
export let router = express.Router()

export const HEADER_NAME = 'authorization'
export const TOKEN_NAME = 'paywall'
import { paywallHeaders, paywallHeadersERC20 } from '../helpers/headers'
import Promise = require('bluebird')
import { RequestResponse, RequiredUriUrl, CoreOptions } from 'request'
const request: (opts: RequiredUriUrl & CoreOptions) => Promise<RequestResponse> = Promise.promisify(require('request'))

const PAYWALL_GATEWAY = process.env.GATEWAY_URL + '/v1/verify'
if (!PAYWALL_GATEWAY) { throw new Error('Please, set GATEWAY_URL env variable') }

const parseToken = (req: express.Request, callback: Function) => {
  let content = req.get(HEADER_NAME)
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

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  res.render('paid')
})

router.get('/erc20', (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  res.status(402).set(paywallHeadersERC20()).sendFile('./views/paid.html', { root: '.' })
})

router.get('/content', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  let reqUrl = PAYWALL_GATEWAY
  parseToken(req, (error: Error, token: string) => {
    if (error) {
      res.set(paywallHeaders()).render('bitch', {layout: false})
      return
    }
    let price = paywallHeaders()['Paywall-Price']
    let meta = paywallHeaders()['Paywall-Meta']
    request({
      method: 'GET',
      uri: reqUrl + '?' + `token=${token}&price=${price}&meta=${meta}`
    }).then((response: RequestResponse) => {
      let status = JSON.parse(response.body).status
      if (status === 'ok') {
        res.render('rich', {layout: false})
      } else {
        res.set(paywallHeaders()).render('bitch', {layout: false})
      }
    })
  })
})
