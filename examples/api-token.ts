
import { AccountApi, Configuration } from "../src"
// ensure your api token has the ACCOUNT_READ scope

async function clientUsage() {
    const { API_TOKEN } = process.env

    if(!API_TOKEN) {
        throw new Error('API_TOKEN not specified')
    }

    const config = new Configuration({
       accessToken: API_TOKEN
    })

    const accountsApi = new AccountApi(config)

    const accounts = await accountsApi.accountsGet()

    console.log(accounts)
}

async function rawApiUsage() {
    const { API_TOKEN } = process.env

    if(!API_TOKEN) {
        throw new Error('API_TOKEN not specified')
    }

    const response = await fetch('https://api.chatdaddy.tech/im/accounts', {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        }
    })

    const data = await response.json()

    console.log(data)
}

if(require.main === module) {
    // clientUsage()
    rawApiUsage()
}
