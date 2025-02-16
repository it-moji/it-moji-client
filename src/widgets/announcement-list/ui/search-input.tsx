'use client'

import { ActionIcon, Select, TextInput } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { SearchPostType } from '@/entities/announcement'
import {
  SEARCH_TYPE_LABEL,
  SearchPostParamsSchema,
  SearchPostTypeSchema,
} from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { createSearchParamsToURL, useRouter } from '@/shared/lib'
import { Icon } from '@/shared/ui'

export interface SearchInputProps {
  defaultQuery?: string
  defaultType?: SearchPostType
}

export const SearchInput: React.FC<SearchInputProps> = ({
  defaultQuery = '',
  defaultType = SearchPostTypeSchema.Enum.TITLE,
}) => {
  const [query, setQuery] = useInputState(defaultQuery)
  const [type, setType] = useState<SearchPostType>(defaultType)

  const { push, back } = useRouter()
  const pathname = usePathname()

  const handleSubmit = () => {
    push(
      createSearchParamsToURL(ROUTES.ADMIN.ANNOUNCEMENT.SEARCH())(
        [SearchPostParamsSchema.Enum.query, query],
        [SearchPostParamsSchema.Enum.type, type],
      ),
    )
  }

  useEffect(() => {
    if (!query && pathname === ROUTES.ADMIN.ANNOUNCEMENT.SEARCH()) {
      back()
    }
  }, [query, pathname, back])

  return (
    <div className="w-full max-w-md items-center space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
      <Select
        className="w-32 min-w-32"
        data={SearchPostTypeSchema.options.map((type) => ({
          value: type,
          label: SEARCH_TYPE_LABEL[type],
        }))}
        defaultValue={defaultType}
        onChange={(value) => setType(value as SearchPostType)}
        value={type}
        allowDeselect={false}
        checkIconPosition="right"
      />
      <TextInput
        type="search"
        className="w-full"
        value={query}
        onChange={setQuery}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit()
        }}
        placeholder="검색어를 입력해주세요"
        rightSection={
          <ActionIcon variant="subtle" color="gray" onClick={handleSubmit}>
            <Icon query="fluent:search-32-regular" />
          </ActionIcon>
        }
      />
    </div>
  )
}
