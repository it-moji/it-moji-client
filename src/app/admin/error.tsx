'use client'

import { useEffect } from 'react'
import { type CommonErrorProps, FallbackError, AdminContainer } from '@/shared/ui'

const AdminErrorPage: React.FC<CommonErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.warn(error)
  }, [error])

  return (
    <AdminContainer>
      <FallbackError error={error} reset={reset} />
    </AdminContainer>
  )
}

export default AdminErrorPage
