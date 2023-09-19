import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { type Dog } from '../utils/types'

interface MatchedMessageProps {
  matchData: Dog
}

export default function MatchedMessage ({
  matchData
}: MatchedMessageProps): JSX.Element {
  const { name, age, breed, img } = matchData

  return (
    <>
      <DialogTitle variant="h4" textAlign={'center'}>
        Meet your new best friend!
      </DialogTitle>
      <DialogContent>
        <img src={img} width="100%" />
        <DialogContentText variant="h4" gutterBottom textAlign={'center'}>
          You are matched with {name}
        </DialogContentText>

        <DialogContentText textAlign={'center'}>
          Age: {age}
          <br />
          Breed: {breed}
          <br />
        </DialogContentText>
      </DialogContent>
    </>
  )
}
