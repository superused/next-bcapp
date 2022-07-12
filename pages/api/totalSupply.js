import { apiHandler } from '../../helpers/apiHandler.js'
import { contract } from '../../helpers/web3.js'

export default apiHandler({
  GET: async (req, res) => {
    return await contract.methods.totalSupply().call()
  },
})
