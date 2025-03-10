import { Router } from 'express';
import { body, checkExact } from 'express-validator';
import { isValidDate } from '../utils/date-validation';
// import { requireJwt } from '../middlewares/require-jwt';
import { createEnrollment } from './handlers/enrollments/create-enrollment';

const router = Router();

router.post(
  '/',
  // requireJwt,

  // Enrollment validations
  body('grade').isInt({ min: 1 }).withMessage('Grade ID must be a positive integer'),
  body('shift').isInt({ min: 1 }).withMessage('Shift ID must be a positive integer'),
  body('isDaycare').isBoolean().withMessage('isDaycare must be a boolean'),
  // Guardian validations
  body('guardian.name').isString().withMessage('Guardian name must be a string').notEmpty().withMessage('Guardian name is required'),
  body('guardian.cpf').isString().withMessage('CPF must be a string').isLength({ min: 11, max: 11 }).withMessage('CPF must have 11 digits'),
  body('guardian.email').optional().isEmail().withMessage('Email must be a valid email address'),
  body('guardian.address').optional().isString().withMessage('Address must be a string'),
  body('guardian.contacts').isArray({ min: 1 }).withMessage('At least one contact is required'),
  body('guardian.contacts.*.phone').isString().withMessage('Contact phone must be a string').notEmpty().withMessage('Contact phone is required'),
  // Student validations
  body('student.name').isString().withMessage('Student name must be a string').notEmpty().withMessage('Student name is required'),
  body('student.gender').isString().withMessage('Student gender must be a string').isIn(['M', 'F']).withMessage('Student gender must be "M" or "F"'),
  body('student.birthday').custom(isValidDate).withMessage('Student birthday must be a valid date'),
  // Billing validations
  body('billing.fees.initial').isCurrency().withMessage('Initial fee must be a valid currency amount'),
  body('billing.fees.recurring').isCurrency().withMessage('Recurring fee must be a valid currency amount'),
  body('billing.dueDay').isInt({min: 1, max: 28}).withMessage('Due date must be between 1 and 28'),

  checkExact([], { message: 'Only the specified fields are allowed' }),
  createEnrollment
);


export default router;
