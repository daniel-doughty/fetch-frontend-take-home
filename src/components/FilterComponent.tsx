import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { type FilterOptions } from '../utils/types'
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useErrorBoundary } from 'react-error-boundary'
import instance from '../config/axios'

interface FilterComponentProps {
  filterOptions: FilterOptions
  setFilterOptions: (filterOptions: FilterOptions) => void
}

interface BreedsApiResponse {
  data: string[]
}

const ages = [...Array(16).keys()]

export default function FilterComponents ({
  filterOptions,
  setFilterOptions
}: FilterComponentProps): JSX.Element {
  const [breedOptions, setBreedOptions] = useState<any>([])
  const { showBoundary } = useErrorBoundary()
  useEffect(() => {
    instance
      .get<BreedsApiResponse>('dogs/breeds')
      .then((response) => {
        const { data } = response
        setBreedOptions(data)
      })
      .catch((error) => {
        showBoundary(error)
      })
  }, [])

  return (
    <Box
      sx={{
        px: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
      }}
    >
      <SearchIcon sx={{ mx: 2, color: '#1a237e' }} />
      <Autocomplete
        multiple
        id="tags-standard"
        sx={{ minWidth: 300 }}
        options={breedOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Search by breed"
          />
        )}
        onChange={(event, value) => {
          setFilterOptions({ ...filterOptions, breeds: value })
        }}
      />
      <FormControl sx={{ minWidth: 100, mt: 3, mr: 5 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Sort by breed
        </InputLabel>
        <NativeSelect
          value={filterOptions.sort}
          defaultValue={'breed:asc'}
          inputProps={{
            name: 'breedSort',
            id: 'uncontrolled-native'
          }}
          onChange={(event) => {
            setFilterOptions({
              ...filterOptions,
              sort: event.target.value
            })
          }}
        >
          <option value={'breed:asc'}>A-Z</option>
          <option value={'breed:desc'}>Z-A</option>
        </NativeSelect>
      </FormControl>
      <Box sx={{ mt: 3 }}>
        <FormControl sx={{ minWidth: 80 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Older than
          </InputLabel>
          <NativeSelect
            value={filterOptions.ageMin}
            defaultValue={0}
            inputProps={{
              name: 'minAge',
              id: 'uncontrolled-native'
            }}
            onChange={(event) => {
              setFilterOptions({
                ...filterOptions,
                ageMin: parseInt(event.target.value)
              })
            }}
          >
            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl sx={{ minWidth: 80 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Younger than
          </InputLabel>
          <NativeSelect
            value={filterOptions.ageMax}
            defaultValue={16}
            inputProps={{
              name: 'maxAge',
              id: 'uncontrolled-native'
            }}
            onChange={(event) => {
              setFilterOptions({
                ...filterOptions,
                ageMax: parseInt(event.target.value)
              })
            }}
          >
            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
    </Box>
  )
}
