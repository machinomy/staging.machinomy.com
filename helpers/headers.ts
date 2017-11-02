require('dotenv').config()

export function paywallHeaders (): object {
  let headers: { [index: string]: string } = {}
  headers['Paywall-Version'] = '0.0.3'
  headers['Paywall-Price'] = '0.1'
  headers["Paywall-Address"] = process.env.PAYWALL_ADDRESS || "0xebeab176c2ca2ae72f11abb1cecad5df6ccb8dfe";
  headers['Paywall-Gateway'] = process.env.PAYWALL_GATEWAY || 'http://localhost:3001/machinomy'
  headers['Paywall-Gateway'] = process.env.PAYWALL_GATEWAY || 'http://localhost:3001/machinomy'
  return headers
}

export function paywallHeadersERC20(): object {
  let headers: { [index: string]: string } = {}
  headers['Paywall-Version'] = '0.0.3'
  headers['Paywall-Price'] = '1'
  headers["Paywall-Address"] = process.env.PAYWALL_ADDRESS || "0xebeab176c2ca2ae72f11abb1cecad5df6ccb8dfe";
  headers['Paywall-Gateway'] = process.env.PAYWALL_GATEWAY || 'http://localhost:3001/machinomy'
  headers['Paywall-Token-Name'] = 'Example ERC20'
  headers['Paywall-Token-Ticker'] = 'EEE'
  headers['Paywall-Token-Address'] = process.env.PAYWALL_TOKEN_ADDRESS || '0x8ad5c3cd38676d630b060a09baa40b0a3cb0b4b5'
  return headers
}

