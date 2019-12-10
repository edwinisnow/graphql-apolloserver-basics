const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello(name:String):String!
        user:User
    }

    type User {
        id:ID!
        username:String!
        firstLetterOfUsername: String

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
        register(userInfo:UserInfo): RegisterResponse
        login(userInfo:UserInfo): String!
    }
`

const resolvers = {
    User: {
        firstLetterOfUsername: (parent) => {
            return parent.username[0]
        },
        username: (parent) => {
            console.log("Log: -----> : parent", parent)
            return parent.username;
        }
    },
    Query: {
        hello: (parent, { name }) => {
            return `hi ${name}`
        },
        user: () => ({
            id: 1,
            username: 'bob'
        })
    },
    Mutation: {
        login: async (parent, { userInfo: { username } }, context, info) => {
            console.log('context', context);
            console.log('info', info);
            // await checkPassword(password)
            return username
        },
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

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) })
server.listen().then(({ url }) => console.log(`Server started at ${url}`))
