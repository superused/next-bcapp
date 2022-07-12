const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
// HTTPメソッドを判別する(httpMethodsの配列に入っているかどうか確認)
const isHttpMethod = method => {
  return httpMethods.some(m => m === method)
}
// 想定されていないHTTPメソッドである場合のエラー表示
const methodNotAllowed = (req, res) => {
  return res.status(405).json({
    statusCode: 405,
    result: `Method ${req.method} Not Allowed`,
  })
}
// API出力処理 基本的な出力の共通処理
export const apiHandler = handlers => {
  return async (req, res) => {
    const { method } = req
    // 想定されていないHTTPメソッドであればエラー
    if (!method || !isHttpMethod(method)) return methodNotAllowed(req, res)
    const handler = handlers[method]
    // 想定されるHTTPメソッドの処理が存在しなければエラー
    if (!handler) return methodNotAllowed(req, res)
    // 出力処理
    try {
      const result = await handler(req, res)
      res.status(200).json({
        statusCode: 200,
        result: result,
      })
    } catch (err) {
      // エラー処理
      errorHandler(err, res)
    }
  }
}
// エラー処理
export const errorHandler = (error, res) => {
  // エラー情報が存在すれば400エラーを出力
  if (error) {
    return res.status(400).json({
      statusCode: 400,
      result: error.message || 'unknown error',
    })
  }
  // その他のエラーは500エラーを出力
  return res.status(500).json({
    statusCode: 500,
    result: 'unknown error',
  })
};
