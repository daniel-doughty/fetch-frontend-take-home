import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import DogGallery from './components/DogGallery'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './components/ErrorPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e'
    },
    secondary: {
      main: '#a3b1ff'
    }
  }
})

function App (): JSX.Element {
  const [user, setUser] = useState<User>({ name: '', email: '' })

  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        setUser({ name: '', email: '' })
      }}
    >
      <ThemeProvider theme={theme}>
        {user.name === ''
          ? (
          <Login setUser={setUser} />
            )
          : (
          <DogGallery user={user} setUser={setUser} />
            )}
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
