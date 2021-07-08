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

  type Mutation {
    addAuthor(name: String): Author
  }
`

const resolvers = {
  Query: {
    libraries: () => {
      return [{ name: 'Libreria nacional' }]
    },
  },
  Mutation: {
    addAuthor: (_, { name }, ctx) => {
      return { name: name }
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
