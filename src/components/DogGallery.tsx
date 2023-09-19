import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import MatchModal from './MatchModal'
import Loading from './Loading'
import FilterComponent from './FilterComponent'
import { useErrorBoundary } from 'react-error-boundary'
import Footer from './Footer'
import DogCard from './DogCard'
import { type User, type Dog, type FilterOptions } from '../utils/types'
import instance from '../config/axios'

const PER_PAGE = 24

const initialFilters: FilterOptions = {
  sort: 'breed:asc',
  from: 0,
  size: PER_PAGE,
  ageMin: 0,
  ageMax: 15
}

interface DogGalleryProps {
  user: User
  setUser: (user: User) => void
}

export default function DogGallery (props: DogGalleryProps): JSX.Element {
  const { user, setUser } = props
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const [dogsData, setDogsData] = useState<Dog[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilters)

  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    setIsLoading(true)
    instance
      .get('dogs/search', {
        params: filterOptions
      })
      .then((response) => {
        const { data: search } = response
        setPageCount(Math.ceil(search.total / PER_PAGE))
        instance
          .post('dogs', search.resultIds)
          .then((response) => {
            const { data: dogs } = response
            setDogsData(dogs)
          })
          .catch((error) => {
            showBoundary(error)
          })
      })
      .catch((error) => {
        showBoundary(error)
      })
      .finally(() => {
        if (filterOptions.from === 0 && currentPage !== 1) {
          setCurrentPage(1)
        }
        setIsLoading(false)
      })
  }, [filterOptions])

  function handlePageChange (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void {
    event.preventDefault()
    setCurrentPage(page)
    const from = page * PER_PAGE
    setFilterOptions({ ...filterOptions, from })
  }

  function handleLogout (): void {
    instance
      .post('auth/logout', {
        name: user.name,
        email: user.email
      })
      .catch((error) => {
        showBoundary(error)
      })
      .finally(() => {
        setUser({ name: '', email: '' })
      })
  }

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: 'background.paper', pt: 2, pb: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}
        >
          <FilterComponent
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleLogout()
            }}
            sx={{ mt: 3, mr: 3, marginLeft: 'auto' }}
          >
            Logout
          </Button>
        </Box>
        <MatchModal favorites={favorites} />
      </AppBar>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Save your favorite dogs and then click to be matched with your furry
            soulmate.
          </Typography>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(event, page) => {
              handlePageChange(event, page)
            }}
            color="primary"
            shape="rounded"
            variant="outlined"
            sx={{ px: 12, pt: 5 }}
          />
        </Container>
      </Box>
      <Loading isLoading={isLoading}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {dogsData.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
          </Grid>
        </Container>
        <Footer />
      </Loading>
    </>
  )
}
