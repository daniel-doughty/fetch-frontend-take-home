import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import sunglassDog from '../assets/dog-with-sunglasses.avif'

export default function AddFavoritesMessage (): JSX.Element {
  return (
    <>
      <DialogTitle variant="h5" textAlign={'center'}>
        Add some favorites to match with your new best friend!
      </DialogTitle>
      <DialogContent style={{ height: '400px', margin: 'auto' }}>
        <img src={sunglassDog} height="100%" />
        <DialogContentText
          variant="h4"
          gutterBottom
          textAlign={'center'}
        ></DialogContentText>

        <DialogContentText textAlign={'center'}></DialogContentText>
      </DialogContent>
    </>
  )
}
