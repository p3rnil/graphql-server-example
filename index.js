const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  interface Book {
    title: String
    author: String
  }

  type Textbook implements Book {
    title: String
    author: String
    courses: [Course]
  }

  type ColoringBook implements Book {
    title: String
    author: String
    colors: [Color]
  }

  type Color {
    name: String
  }

  type Course {
    name: String
  }

  type Query {
    schoolBooks: [Book]
  }
`

const resolvers = {
  Query: {
    schoolBooks: () => {
      return [
        {
          title: 'Primero',
          author: 'Paco',
          courses: [{ name: 'PRO56' }, { name: 'ADA' }],
        },
        {
          title: 'Segundo',
          author: 'Maria',
          colors: [{ name: 'rojo' }, { name: 'verde' }],
        },
      ]
    },
  },
  Book: {
    __resolveType(book, ctx) {
      if (book.courses) {
        return 'Textbook'
      }
      if (book.colors) {
        return 'ColoringBook'
      }
      return null // throw error
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // Context
    return { token: true, model: [] }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
