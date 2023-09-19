import { Box, Button, Typography } from '@mui/material'

interface ErrorPageProps {
  resetErrorBoundary: () => void
}

export default function ErrorPage ({
  resetErrorBoundary
}: ErrorPageProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'primary'
      }}
    >
      <Typography variant="h4" style={{ color: 'black' }}>
        Oh fetch! Something went wrong.
      </Typography>
      <Button variant="contained" sx={{ mt: 4 }} onClick={resetErrorBoundary}>
        Reset
      </Button>
    </Box>
  )
}
