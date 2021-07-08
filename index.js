const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Library {
    name: String!
    books: [Book]!
  }

  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
  }

  type Query {
    libraries: [Library]
  }
`

const resolvers = {
  Query: {
    libraries: () => {
      return [{ name: 'Libreria nacional' }]
    },
  },
  Library: {
    books: () => {
      return [{ title: 'Harry Potter' }]
    },
  },
  Book: {
    author: () => {
      return { name: 'J. K. Rowling' }
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
