import { apiHandler } from '../../helpers/apiHandler.js'
import { web3 } from '../../helpers/web3.js'

export default apiHandler({
  GET: async (req, res) => {
    return await web3.eth.getAccounts()
  },
})
