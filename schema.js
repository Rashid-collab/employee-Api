const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String!]
    attendance: Float
  }

  input EmployeeFilterInput {
    name: String
    class: String
    ageRange: [Int]
  }

  input PaginationInput {
    page: Int!
    pageSize: Int!
  }

  input SortingInput {
    field: String!
    order: String!
  }

  input EmployeeAddInput {
    name: String!
    age: Int!
    class: String
    subjects: [String!]
    attendance: Float
  }

  input EmployeeUpdateInput {
    name: String
    age: Int
    class: String
    subjects: [String!]
    attendance: Float
  }

  type PaginatedEmployees {
    employees: [Employee!]!
    totalCount: Int!
  }

  type Query {
    listEmployees(
      filter: EmployeeFilterInput
      pagination: PaginationInput
      sorting: SortingInput
    ): PaginatedEmployees!
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: EmployeeAddInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee!
  }
`;

module.exports = typeDefs;
