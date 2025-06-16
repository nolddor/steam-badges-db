class HTTPException {
  static throwIfFailed (response) {
    if (!response.ok) {
      throw new Error(`HTTP-${response.status} ${response.statusText}`)
    }
  }
}

class HTTPClient {
  static getJSON (url) {
    return fetch(url).then(response => {
      HTTPException.throwIfFailed(response)
      return response.json()
    })
  }
}

module.exports = HTTPClient
