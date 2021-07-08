const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require('graphql')

class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        return result.toUpperCase()
      }
      return result
    }
  }
}

const typeDefs = gql`
  directive @upper on FIELD_DEFINITION

  type Library {
    name: String! @upper
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
  schemaDirectives: {
    upper: UpperCaseDirective,
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
