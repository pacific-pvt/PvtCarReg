export const url = 'https://script.google.com/macros/s/AKfycbwNjy1PNYwd1RofSU_uLOqNXB5xtTmdu_0jMoBx1lG_8f0tRLuDQPZNNK6GaG8kYVRm_A/exec';


export async function fetchData(formData) {
  const response = await fetch(url, {
    redirect: 'follow',
    method: 'POST', // 設定 HTTP 方法為 POST
    body: JSON.stringify(formData), // 將資料轉換為 JSON 格式並放入 body
    headers: {
      'Content-Type': 'application/json;charset=utf-8' // 設定 Content-Type
    }
  });

  const data = await response.json(); // 解析 JSON
  return data; // 直接返回資料，不做任何處理
}


