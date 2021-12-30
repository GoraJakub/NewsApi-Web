export async function fetchData(url,method,body = {}) {
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    console.log(JSON.stringify(body))
    return response.json()
}