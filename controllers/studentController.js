const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {

    const { name, email, age, department } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Student with this email already exists.',
        error: 'Student with this email already exists.'
      });
    }
    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required and must be at least 2 characters.',
        error: 'Name is required and must be at least 2 characters.'
      });
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res.status(400).json({
        success: false,
        message: 'Name must contain only letters and spaces.',
        error: 'Name must contain only letters and spaces.'
      });
    }
    // Email validation
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Email is required.',
        error: 'Email is required.'
      });
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email must be valid.',
        error: 'Email must be valid.'
      });
    }
    // Age validation
    if (typeof age !== 'number' || !Number.isInteger(age)) {
      return res.status(400).json({
        success: false,
        message: 'Age must be an integer.',
        error: 'Age must be an integer.'
      });
    }
    if (age < 18 || age > 100) {
      return res.status(400).json({
        success: false,
        message: 'Age must be between 18 and 100.',
        error: 'Age must be between 18 and 100.'
      });
    }
    // Department validation
    if (!department || typeof department !== 'string' || department.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Department is required and must be at least 2 characters.',
        error: 'Department is required and must be at least 2 characters.'
      });
    }
    const allowedDepartments = ['Science', 'Arts', 'Commerce'];
    if (!allowedDepartments.includes(department)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid department. Department must be one of: Science, Arts, Commerce.',
        error: 'Invalid department.'
      });
    }
    const student = await Student.create({ name, email, age, department });
    res.status(201).json({
      success: true,
      message: 'Student created successfully.',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create student.',
      error: error.message
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully.',
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students.',
      error: error.message
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (student) {
      res.status(200).json({
        success: true,
        message: 'Student fetched successfully.',
        data: student
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Student not found.',
        error: 'Student not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student.',
      error: error.message
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, age, department } = req.body;
    // Name validation 
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Name must be at least 2 characters.',
          error: 'Name must be at least 2 characters.'
        });
      }
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        return res.status(400).json({
          success: false,
          message: 'Name must contain only letters and spaces.',
          error: 'Name must contain only letters and spaces.'
        });
      }
    }
    // Email validation 
    if (email !== undefined) {
      if (typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Email must be a string.',
          error: 'Email must be a string.'
        });
      }
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Email must be valid.',
          error: 'Email must be valid.'
        });
      }
      // Check if new email already exists for another student
      const existingStudent = await Student.findOne({ where: { email } });
      if (existingStudent && existingStudent.id !== id) {
        return res.status(409).json({
          success: false,
          message: 'Another student with this email already exists.',
          error: 'Another student with this email already exists.'
        });
      }
    }
    // Age validation 
    if (age !== undefined) {
      if (typeof age !== 'number' || !Number.isInteger(age)) {
        return res.status(400).json({
          success: false,
          message: 'Age must be an integer.',
          error: 'Age must be an integer.'
        });
      }
      if (age < 18 || age > 100) {
        return res.status(400).json({
          success: false,
          message: 'Age must be between 18 and 100.',
          error: 'Age must be between 18 and 100.'
        });
      }
    }
    // Department validation 
    if (department !== undefined) {
      if (typeof department !== 'string' || department.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Department must be at least 2 characters.',
          error: 'Department must be at least 2 characters.'
        });
      }
      const allowedDepartments = ['Science', 'Arts', 'Commerce'];
      if (!allowedDepartments.includes(department)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid department. Department must be one of: Science, Arts, Commerce.',
          error: 'Invalid department.'
        });
      }
    }
    const student = await Student.findByPk(id);
    if (student) {
      await student.update({ name, email, age, department });
      res.status(200).json({
        success: true,
        message: 'Student updated successfully.',
        data: student
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Student not found.',
        error: 'Student not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update student.',
      error: error.message
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (student) {
      await student.destroy();
      res.status(200).json({
        success: true,
        message: 'Student deleted successfully.'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Student not found.',
        error: 'Student not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete student.',
      error: error.message
    });
  }
};