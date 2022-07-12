import { apiHandler } from '../../helpers/apiHandler.js'
import { contract } from '../../helpers/web3.js'

export default apiHandler({
  POST: async (req, res) => {
    const account_address = req.body.account_address
    // アカウントアドレスが取得できなければエラー
    if (!account_address) throw new Error('account address not found')
    return await contract.methods.getTokenBalanceOf(account_address).call()
  },
})
