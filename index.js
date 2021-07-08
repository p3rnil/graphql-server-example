const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  union Result = Book | Author

  type Book {
    title: String
  }

  type Author {
    name: String
  }

  type Query {
    search(contains: String): [Result]
  }
`

const resolvers = {
  Query: {
    search: () => {
      return [{ name: 'Nico' }, { title: 'Juego de tronos' }]
    },
  },
  Result: {
    __resolveType(obj, ctx) {
      if (obj.name) {
        return 'Author'
      }
      if (obj.title) {
        return 'Book'
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
