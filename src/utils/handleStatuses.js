export class ServerError extends Error {
  constructor({ message, status, localeMessage, code }) {
    super(message)

    this.localeMessage = localeMessage
    this.code = code
    this.status = status
  }
}

const handleStatuses = () => response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  return response.json().then(data => {
    throw new ServerError({
      message: 'Error',
      ...data,
      status: response.status,
    })
  })
}

export default handleStatuses
