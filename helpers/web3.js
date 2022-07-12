import Web3 from 'web3'
import { constant } from './constants.js'
// web3オブジェクト、コントラクトのオブジェクトを定義
export const web3 = new Web3(new Web3.providers.HttpProvider(constant.http_end_point))
export const contract = new web3.eth.Contract(constant.abi, constant.contract_address)

