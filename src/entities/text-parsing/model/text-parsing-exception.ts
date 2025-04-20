import { Exception } from '@/shared/api'

export class TextParsingException extends Exception {
  public rawText: string
  public errorLineIndexArray?: number[]

  public constructor(cause: string, rawText: string, errorLineIndexArray?: number[]) {
    super(cause)

    this.name = this.constructor.name

    this.rawText = rawText
    this.errorLineIndexArray = errorLineIndexArray
  }
}
