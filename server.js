const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }
  type Query {
    getTodos: [Todo]
  }
  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;

const server = new ApolloServer({
  typeDefs
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
