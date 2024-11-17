const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String },
  subjects: { type: [String] },
  attendance: { type: Number },
});

employeeSchema.index({ name: 1, class: 1 }); // Add index for performance

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
