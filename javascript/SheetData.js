export const url = 'https://script.google.com/macros/s/AKfycbzkEt5pOxunu2BWbW8gX_3JJOhjrqqjw98gt4T8dSiIdCzKYH76SK84xo6s_My969o6Ww/exec';


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


