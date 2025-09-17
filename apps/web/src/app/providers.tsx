import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from '@/components/common/toaster'
import { ThemeProvider } from '@/components/theme-provider'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </NuqsAdapter>
  )
}
