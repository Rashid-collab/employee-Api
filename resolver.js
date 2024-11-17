const Employee = require('./models/employee');

const resolvers = {
  Query: {
    async listEmployees(_, { filter, pagination, sorting }) {
      const query = {};
      if (filter) {
        if (filter.name) query.name = new RegExp(filter.name, 'i');
        if (filter.class) query.class = filter.class;
        if (filter.ageRange) {
          query.age = { $gte: filter.ageRange[0], $lte: filter.ageRange[1] };
        }
      }

      const sortOption = sorting
        ? { [sorting.field]: sorting.order === 'ASC' ? 1 : -1 }
        : {};
      const page = pagination?.page || 1;
      const pageSize = pagination?.pageSize || 10;

      const employees = await Employee.find(query)
        .sort(sortOption)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      const totalCount = await Employee.countDocuments(query);
      return { employees, totalCount };
    },

    async getEmployee(_, { id }) {
      return Employee.findById(id);
    },
  },
  Mutation: {
    async addEmployee(_, { input }) {
      const newEmployee = new Employee(input);
      return newEmployee.save();
    },
    async updateEmployee(_, { id, input }) {
      return Employee.findByIdAndUpdate(id, input, { new: true });
    },
  },
};

module.exports = resolvers;
