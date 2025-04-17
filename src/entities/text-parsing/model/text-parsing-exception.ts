import { Exception } from '@/shared/api'

export class TextParsingException extends Exception {
  private _rawText: string
  private _errorLineIndexArray?: number[]
  private _errorLineNumberArray?: number[]

  public constructor(cause: string, rawText: string, errorLineIndexArray?: number[]) {
    super(cause)

    this.name = this.constructor.name

    this._rawText = rawText
    this._errorLineIndexArray = errorLineIndexArray
    this._errorLineNumberArray = errorLineIndexArray?.map((lineIndex) => lineIndex + 1)
  }

  public get rawText() {
    return this._rawText
  }

  public set rawText(rawText: string) {
    this._rawText = rawText
  }

  public get errorLineIndexArray() {
    return this._errorLineIndexArray
  }

  public set errorLineIndexArray(errorLineIndexArray: number[] | undefined) {
    this._errorLineIndexArray = errorLineIndexArray
    this._errorLineNumberArray = errorLineIndexArray?.map((lineIndex) => lineIndex + 1)
  }

  public get errorLineNumberArray() {
    return this._errorLineNumberArray
  }

  public set errorLineNumberArray(errorLineNumberArray: number[] | undefined) {
    this._errorLineNumberArray = errorLineNumberArray
  }
}
