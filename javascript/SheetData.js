export const url = 'https://script.google.com/macros/s/AKfycbxt78kqhSqKGmZJSGdU3YcDkk96fX-VnMGB1hG-MafB3NcBPrEkfb8bLZy8_32C9VMSQw/exec';

export async function fetchData(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${query}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}
