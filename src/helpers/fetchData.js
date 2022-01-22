export async function fetchData(url,method,body) {
    const response = await fetch(url, {
        ...(body && {body: JSON.stringify(body)}),
        method: method,
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    return response.json()
}