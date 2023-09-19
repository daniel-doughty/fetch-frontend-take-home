import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Image from '../assets/man-with-dog.avif'
import { type User } from '../utils/types'
import Copyright from './Copyright'
import { useState } from 'react'
import { Alert } from '@mui/material'
import { useErrorBoundary } from 'react-error-boundary'
import { validateEmail } from '../utils/validations'
import instance from '../config/axios'

interface LoginProps {
  setUser: (user: User) => void
}

export default function Login ({ setUser }: LoginProps): JSX.Element {
  const { showBoundary } = useErrorBoundary()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const email = data.get('email')
    if (isEmailInvalid(email)) return

    instance
      .post('auth/login', {
        name,
        email
      })
      .then(() => {
        setUser({ name, email })
      })
      .catch((error) => {
        showBoundary(error)
      })
  }
  const [emailInvalid, setEmailInvalid] = useState(false)

  function isEmailInvalid (email: any): boolean {
    if (validateEmail(email.toString())) {
      setEmailInvalid(false)
      return false
    } else {
      setEmailInvalid(true)
      return true
    }
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to adopt a dog!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailInvalid}
              onFocus={() => {
                setEmailInvalid(false)
              }}
            />
            {emailInvalid && (
              <Alert severity="warning">Enter a valid email address</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              disabled={emailInvalid}
            >
              Sign In
            </Button>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
