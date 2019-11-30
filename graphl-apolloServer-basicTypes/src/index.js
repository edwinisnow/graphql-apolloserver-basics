const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello:String!
        user:User
    }

    type User {
        id:ID!
        username:String!

    }
    type Error {
        fields: String!
        message: String!
    }

    type RegisterResponse {
        errors:[Error]
        user:User
    }

    input UserInfo {
        username:String! 
        password:String! 
        age:Int
    }

    type Mutation {
        register(input:UserInfo): RegisterResponse
        login(input:UserInfo): Boolean
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        user: () => ({
            id: 1,
            username: 'bob'
        })
    },
    Mutation: {
        login: () => true,
        register: () => ({
            errors: [{
                fields: 'username',
                message: 'bad'
            }],
            user: {
                id: 1,
                username: 'bob'
            }

        })
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`Server started at ${url}`))
