import axios from 'axios'

export default axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000'
})

/**
 * TODO: axios インスタンスを返すのでなく、get/post などを抽象化→後回し
 *   camelcase-keys を噛ませて、snake_case な API レスポンスを camelCase で .vue に返す
 */
