export const url = 'https://script.google.com/macros/s/AKfycbxhezYGc7wQQie2ELMm0WTR_xjxIckEm3hMch7LkP5_p2V9lPwP3JUwQ54jgNVv_10EFA/exec';

export async function fetchData(formData) {
  const response = await fetch(url, {
    redirect: 'follow',
    method: 'POST', // 設定 HTTP 方法為 POST
    body: JSON.stringify(formData), // 將資料轉換為 JSON 格式並放入 body
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' // 設定 Content-Type
    }
  });

  const data = await response.json(); // 解析 JSON
  return data; // 直接返回資料，不做任何處理
}


