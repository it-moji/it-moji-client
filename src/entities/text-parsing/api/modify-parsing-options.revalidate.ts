'use server'

import { revalidateTag } from 'next/cache'
import { TEXT_PARSING_TAG } from './endpoint'

export const modifyTextParsingOptionsWithRevalidate = async () =>
  [TEXT_PARSING_TAG.PARSING_OPTIONS].forEach(revalidateTag)
