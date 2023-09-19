import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'
import { type Dog } from '../utils/types'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

interface DogCardProps {
  dog: Dog
  favorites: string[]
  setFavorites: (favorites: string[]) => void
}

export default function DogCard (props: DogCardProps): JSX.Element {
  const { dog, favorites, setFavorites } = props
  const { id, name, age, breed, img, zip_code: zipCode } = dog
  return (
    <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '100%'
          }}
          image={img}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>
            Age: {parseInt(age) < 1 ? 'Less than a year' : `${age} years`}
            <br />
            Breed: {breed}
            <br />
            Zip Code: {zipCode}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          {favorites.includes(id)
            ? (
            <Button
              size="small"
              onClick={() => {
                setFavorites(favorites.filter((favorite) => favorite !== id))
              }}
            >
              <FavoriteIcon />
            </Button>
              )
            : (
            <Button
              size="small"
              onClick={() => {
                setFavorites([...favorites, id])
              }}
            >
              <FavoriteBorderIcon />
            </Button>
              )}
        </CardActions>
      </Card>
    </Grid>
  )
}
