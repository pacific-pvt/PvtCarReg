export const url = 'https://script.google.com/macros/s/AKfycbxpA9sRX1KVjhYAe0W_0CBM4K09fR5EPa4DTXhvJ3d0FuvwqZqK1Lm2UrCxKEjsNN4B0w';


export async function fetchData(formData) {
  const response = await fetch(url, {
    redirect: 'follow',
    method: 'POST', // 設定 HTTP 方法為 POST
    body: JSON.stringify(formData), // 將資料轉換為 JSON 格式並放入 body
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' // 設定 Content-Type
    }
    //body: `data=${encodeURIComponent(JSON.stringify(formData))}`
  });

  const data = await response.json(); // 解析 JSON
  return data; // 直接返回資料，不做任何處理
}
