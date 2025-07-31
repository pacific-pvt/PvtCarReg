export const url = 'https://script.google.com/macros/s/AKfycbzs-fs-1ngOvhQu2bsOeNuaxuT7kUxKm8PSFlCSg_gcb5BuN_Ak1iNOO4maQ3UTRbd1kw/exec';

export async function fetchData(formData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 用 JSON 傳送
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // 回傳 JSON
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
