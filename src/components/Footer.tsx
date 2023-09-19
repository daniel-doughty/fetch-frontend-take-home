import { Box, Typography } from '@mui/material'
import Copyright from './Copyright'

export default function Footer (): JSX.Element {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Dogfetcher
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        version 0.0.1
      </Typography>
      <Copyright />
    </Box>
  )
}
