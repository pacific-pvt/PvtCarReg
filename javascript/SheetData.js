export const url = 'https://script.google.com/macros/s/AKfycbxt78kqhSqKGmZJSGdU3YcDkk96fX-VnMGB1hG-MafB3NcBPrEkfb8bLZy8_32C9VMSQw/exec';

export async function fetchData(formData) {
  // 将 formData 转换为查询字符串
  const params = new URLSearchParams(formData).toString();

  // 修改为 GET 请求，将参数附加到 URL 后
  const response = await fetch(`${url}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8' // 你仍然可以设置这个头，但它在 GET 请求中并不必要
    }
  });

  if (!response.ok) {
    throw new Error('网络请求失败');
  }

  const data = await response.json(); // 解析 JSON
  return data; // 返回数据
}
