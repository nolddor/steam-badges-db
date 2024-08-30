const { getJSON } = require('../HTTPClient')
const fetchSpy = jest.spyOn(global, 'fetch')

const mockFechSuccess = Promise.resolve({
  json: () => Promise.resolve({ foo: 'bar' }), // response content that was provided by the server as json format
  ok: true, // whether the response was successful (status in the range 200-299) or not
  status: 200, // HTTP status code from the server response
  statusText: 'OK' // HTTP status message from the server response
})

const mockFechFailure = Promise.resolve({
  json: async () => {}, // response content that was provided by the server as json format
  ok: false, // whether the response was successful (status in the range 200-299) or not
  status: 404, // HTTP status code from the server response
  statusText: 'Not Found' // HTTP status message from the server response
})

describe('HTTPClient#getJSON()', () => {
  test('Throws "HTTP" error', async () => {
    fetchSpy.mockImplementationOnce(() => mockFechFailure)
    await expect(getJSON()).rejects.toThrow('HTTP-404 Not Found')
  })

  test('Fetch JSON successfully', async () => {
    fetchSpy.mockImplementationOnce(() => mockFechSuccess)
    await expect(getJSON()).resolves.toStrictEqual({ foo: 'bar' })
  })
})

// Runs after all the tests in this file have completed.
afterAll(() => {
  fetchSpy.mockRestore()
})
