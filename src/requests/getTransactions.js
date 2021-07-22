export async function getTransactions() {
  const request = 'https://api.stage.capusta.space/v1/cabinet/protected/transactions/page/1';
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer 5d370094-57a7-4476-ace4-4f29bfa43d44' }, 
  };
  const fetchData = await fetch(request, requestOptions)
    .then(response => response.json())
    .catch(() => {})
  return fetchData;
}