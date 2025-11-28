import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from './schema.js';

const resolvers = {
     Query: {
       posts: () => [
         {
           id: '1',
           title: 'Post 1',
           content: 'Content for post 1',
           thumbnail: 'http://example.com/thumbnail1.jpg',
           author: {
             id: '1',
             name: 'Author 1',
             photo: 'http://example.com/photo1.jpg',
           },
           createdAt: new Date().toISOString(),
         },
       ],
     },
   };
   async function startServer() {
     const app = express();
     const server = new ApolloServer({ typeDefs, resolvers });
     await server.start();
     server.applyMiddleware({ app });
     app.listen({ port: 4000 }, () =>
       console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
     );
   }
   startServer();