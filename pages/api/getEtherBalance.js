import { apiHandler } from '../../helpers/apiHandler.js'
import { web3 } from '../../helpers/web3.js'

export default apiHandler({
  GET: async (req, res) => {
    const address = req.query.account_address
    // アカウントアドレスが取得できなければエラー
    if (!address) throw new Error('account address is not found')
    // 残高をwei単位で取得
    const wei = await web3.eth.getBalance(address)
    // Ether単位に変換して出力
    return wei / 1000000000000000000
  },
})
