# Fetch Frontend Take-Home Exercise: DogMatcher

This is a simple single page React app that helps dog-lovers search through a database of shelter dogs, with the hope of finding a lucky dog a new home!

It allows the user to search by breed and age range. They can 'favorite' the dogs they like. Then they can be automatically matched with a dog from their favorites list.

The project was scaffolded with [Vite](https://vitejs.dev/). [Material UI](https://mui.com/) was used for styling. It was deployed using [Vercel](https://vitejs.dev/) and can be previewed via [this link](https://fetch-frontend-take-home.vercel.app/).

## Local Development: Installing / Getting started

### To run the app in development mode:

you'll need `Node` and `npm` or `yarn` installed. Use `git` to clone the project into a local directory. In the project directory, you can run one of the following commands in the terminal:

```
npm run dev
```

or

```
yarn dev
```

which starts the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### To build the app for production run:

```
npm run build
```

or

```
yarn build
```

The build will be saved to the `dist` folder.

### To preview the production build you can then run

```
npm run preview
```

or

```
yarn preview
```

Preview mode can be viewed in local browser at [http://localhost:4173](http://localhost:4173)

## Backlog:

This is version 0.0.1 of the DogFinder app. Here are some of the known bugs and some 'nice-to-have' features that should be released in future versions, in no particular order:

- Add routing (e.g. React Router)
  - to improve the user experience. Allow for bookmarking, using the browser forward/back buttons, putting filters in the URL etc.
- Use the Location API to display more data to the user than the zip code. e.g. state, distance away, etc.
- Filters for location
  - facets would be a nice-to-have also
- Add empty message when there are no results
- Validations on age filters
  - e.g. shouldn't be able to select 'Older than 8' and 'Younger than 7' at the same time
- Better test coverage
  - setup issues with Vite and Jest need to be worked out
- Fallback image in the case of a missing/broken image
- Display total number of favorites selected
- Add a filter to view only favorites
