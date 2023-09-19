import { LinearProgress, CircularProgress } from '@mui/material'

interface LoadingProps {
  isLoading: boolean
  loadingType?: 'linear' | 'circular'
  children: React.ReactNode
}

function Progress ({
  loadingType
}: {
  loadingType?: LoadingProps['loadingType']
}): JSX.Element {
  switch (loadingType) {
    case 'circular':
      return <CircularProgress />
    default:
      return <LinearProgress />
  }
}

export default function Loading ({
  isLoading,
  loadingType,
  children
}: LoadingProps): JSX.Element {
  return isLoading ? <Progress loadingType={loadingType} /> : <>{children}</>
}
