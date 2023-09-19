import { Link, Typography } from '@mui/material'

export default function Copyright (): JSX.Element {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/danieljamesdoughty/"
      >
        Dan Doughty
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
