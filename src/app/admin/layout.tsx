import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | IT-MOJI 관리자 페이지',
    absolute: 'IT-MOJI 관리자 페이지',
  },
}

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>

export default AdminLayout
