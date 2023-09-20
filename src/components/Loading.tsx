import { CircularProgress, Backdrop } from '@mui/material'

interface LoadingProps {
  isLoading: boolean
}

export default function Loading ({ isLoading }: LoadingProps): JSX.Element {
  return (
    <Backdrop
      open={isLoading}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress sx={{ color: 'inherit' }} />
    </Backdrop>
  )
}
