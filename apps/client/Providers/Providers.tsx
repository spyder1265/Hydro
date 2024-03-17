import { ThemeProvider } from '@/app/contexts/ThemeContext'
import Page from '@/components/Animations/Page'
import { Toaster } from 'react-hot-toast'

interface IProviders {
  children: React.ReactNode
}

const Providers: React.FC<IProviders> = ({ children }) => {
  return (
    <>
      <Page>
        <ThemeProvider>
          <Toaster
            toastOptions={{
              style: {
                padding: '16px',
                borderRadius: '8px',
                color: '#fff',
                background: '#333'
              }
            }}
          />
          {children}
        </ThemeProvider>
      </Page>
    </>
  )
}
export default Providers
