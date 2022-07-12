import { apiHandler } from '../../helpers/apiHandler.js'
import { web3, contract } from '../../helpers/web3.js'
import { constant } from '../../helpers/constants.js'

export default apiHandler({
  POST: (req, res) => {
    return new Promise(async (resolve, reject) => {
      const to = req.body.to // 送信先アカウントアドレス
      const from = req.body.from // 送信元アカウントアドレス
      const private_key = req.body.private_key // 送信元の秘密鍵
      const value = req.body.value // 送信トークン数

      // トランザクション情報作成
      const txParams = {
        gas: web3.utils.toHex(3000000), // ガス代
        from: from, // 送信元
        to: constant.contract_address, // 送信先
        data: contract.methods.transferToken(to, value).encodeABI(), // コントラクト
      }

      // 送信元の秘密鍵でsignする
      const signedTx = await web3.eth.accounts.signTransaction(txParams, private_key)

      // set系のコントラクトを実行
      web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('transactionHash', result => {
        if (result) {
          // 結果が取得できれば結果を出力
          resolve(result)
        } else {
          // 結果が取得できなければエラー出力
          reject(new Error('transfer failed'))
        }
      })
    })
  },
})


