export class Exception extends Error {
  private static readonly PREFIX = '[exception]'
  private static readonly SEPARATOR = ': '

  public constructor(cause: string) {
    super(cause)

    this.message = Exception.getMessage(cause)
    this.name = this.constructor.name
  }

  public static getMessage(message: string) {
    if (!message) {
      return message
    }

    return [Exception.PREFIX, message].join(Exception.SEPARATOR)
  }

  public static extractMessage(error: Error) {
    if (Exception.isException(error)) {
      return error.message.split(Exception.SEPARATOR)[1]
    }

    return null
  }

  public static isException(error: Error) {
    return error.message.startsWith(Exception.PREFIX)
  }
}
