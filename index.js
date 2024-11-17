const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/employees', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  } catch (error) {
    console.error('Error starting server', error);
  }
};

startServer();