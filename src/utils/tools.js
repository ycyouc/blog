export function formatDate(timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const min = date.getMinutes().toString().padStart(2, '0')
  const sec = date.getSeconds().toString().padStart(2, '0')
  const weekday = date.getDay()
  const weeks = ['日', '一', '二', '三', '四', '五', '六']
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + ' 星期' + weeks[weekday]
}
