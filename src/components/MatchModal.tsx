import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import { type Dog } from '../utils/types'
import Loading from './Loading'
import { useErrorBoundary } from 'react-error-boundary'
import AddFavoritesMessage from './AddFavoritesMessage'
import MatchedMessage from './MatchedMessage'
import instance from '../config/axios'

interface MatchModalProps {
  favorites: string[]
}

const initialMatchData = {
  id: '',
  name: '',
  age: '',
  breed: '',
  img: '',
  zip_code: ''
}

export default function MatchModal ({
  favorites
}: MatchModalProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [matchData, setMatchData] = useState<Dog>(initialMatchData)

  const { showBoundary } = useErrorBoundary()

  const handleOpen = (): void => {
    setOpen(true)
    fetchMatch()
  }

  const handleClose = (): void => {
    setOpen(false)
    setMatchData(initialMatchData)
  }

  function fetchMatch (): void {
    setIsLoading(true)
    instance
      .post('dogs/match', favorites)
      .then((response) => {
        const {
          data: { match }
        } = response
        instance
          .post('dogs', [match])
          .then((response) => {
            const {
              data: [dog]
            } = response
            setMatchData(dog)
          })
          .catch((error) => {
            if (favorites.length === 0) {
              return
            }
            showBoundary(error)
          })
      })
      .catch((error) => {
        if (favorites.length === 0) {
          return
        }
        showBoundary(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        color="primary"
        sx={{ minWidth: 300, alignSelf: 'center', mt: 5 }}
      >
        Find my match!
      </Button>

      <Dialog fullWidth maxWidth={'sm'} open={open} onClose={handleClose}>
        {isLoading
          ? (
          <Loading isLoading={isLoading} />
            )
          : (
          <>
            {favorites.length === 0
              ? (
              <AddFavoritesMessage />
                )
              : (
              <MatchedMessage matchData={matchData} />
                )}
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
            )}
      </Dialog>
    </>
  )
}
