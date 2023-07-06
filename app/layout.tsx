import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
   <ClerkProvider>
     <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true} >
        <ToasterProvider/>
        <ModalProvider/>
        {children}
        </body>
    </html>
   </ClerkProvider>
  )
}
