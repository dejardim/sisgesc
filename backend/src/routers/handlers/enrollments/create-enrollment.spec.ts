import express from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';

import { createExpressApp } from '../../../app';
import { HttpStatusCode } from '../../../constants/http-status-code';
import { ErrorsMessages } from '../../../constants/error-messages';

describe('POST /enrollments', () => {
  let app: express.Express;

  beforeAll(async () => {
    app = await createExpressApp();
  });

  const generateValidEnrollmentData = () => ({
    grade: 1,
    shift: 1,
    isDaycare: false,
    student: {
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ mode: 'year', min: 2000, max: 2015 }).toISOString().split('T')[0],
      gender: faker.helpers.arrayElement(['M', 'F']),
    },
    guardian: {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      contacts: [
        { phone: faker.phone.number({ style: 'international'}) },
        { phone: faker.phone.number({ style: 'international'}) },
        { phone: faker.phone.number({ style: 'international'}) },
      ],
    },
    billing: {
      fees: {
        initial: faker.finance.amount({ min: 50, max: 200 }),
        recurring: faker.finance.amount({ min: 50, max: 200 }),
      },
      dueDay: faker.number.int({ min: 1, max: 28 }),
    }
  });

  it('should create a new enrollment with valid data', async () => {
    const enrollmentData = generateValidEnrollmentData();

    const response = await request(app)
      .post('/api/enrollments/')
      .send(enrollmentData);

    expect(response.status).toBe(HttpStatusCode.CREATED);
    expect(response.body).toHaveProperty('uuid');
    expect(response.body).toHaveProperty('grade');
    expect(response.body).toHaveProperty('shift');
    expect(response.body).toHaveProperty('isDaycare');

    expect(response.body.student).toHaveProperty('uuid');
    expect(response.body.student).toHaveProperty('name');
    expect(response.body.student).toHaveProperty('birthday');

    expect(response.body.guardian).toHaveProperty('uuid');
    expect(response.body.guardian).toHaveProperty('name');
    expect(response.body.guardian).toHaveProperty('contacts');

    expect(response.body.tuitions).toBeInstanceOf(Array);
    expect(response.body.tuitions).toHaveLength(12);
    for (const tuition of response.body.tuitions) {
      expect(tuition).toHaveProperty('code');
      expect(tuition).toHaveProperty('amount');
      expect(tuition).toHaveProperty('dueDate');
      expect(tuition).toHaveProperty('isPaid');
    }

    expect(response.body.student.name).toBe(enrollmentData.student.name);
    expect(response.body.guardian.name).toBe(enrollmentData.guardian.name);
    expect(response.body.guardian.contacts).toHaveLength(enrollmentData.guardian.contacts.length);

    expect(response.body.tuitions[0].amount).toBe(enrollmentData.billing.fees.initial);
    expect(response.body.tuitions[0].isPaid).toBe(false);
    expect(response.body.tuitions[0].dueDate).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(response.body.tuitions[1].amount).toBe(enrollmentData.billing.fees.recurring);
    expect(response.body.tuitions[1].isPaid).toBe(false);
    expect(response.body.tuitions[1].dueDate).toMatch(/^\d{4}-\d{2}-\d{2}/);
  });

  it('should return 404 if grade does not exist', async () => {
    const data = generateValidEnrollmentData();
    const response = await request(app)
      .post('/api/enrollments/')
      .send({ ...data, grade: 99999 });

    expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(response.body).toEqual({
      error: ErrorsMessages.NOT_FOUND,
      details: 'Grade not found'
    });
  });

  it('should return 404 if shift does not exist', async () => {
    const data = generateValidEnrollmentData();
    const response = await request(app)
      .post('/api/enrollments/')
      .send({ ...data, shift: 99999 });

    expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(response.body).toEqual({
      error: ErrorsMessages.NOT_FOUND,
      details: 'Shift not found'
    });
  });

  it('should return 409 if student is already enrolled in current year', async () => {
    const enrollmentData = generateValidEnrollmentData();

    await request(app)
      .post('/api/enrollments/')
      .send(enrollmentData);

    const response = await request(app)
      .post('/api/enrollments/')
      .send(enrollmentData);

    expect(response.status).toBe(HttpStatusCode.CONFLICT);
    expect(response.body).toEqual({
      error: ErrorsMessages.CONFLICT,
      details: 'Student is already enrolled this year'
    });
  });

  it('should validate request payload structure', async () => {
    const response = await request(app)
      .post('/api/enrollments/')
      .send({
        extraField: 'invalid',
        student: { invalidField: 'test' }
      });

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.body.errors.some((e: { type: string }) => e.type === 'unknown_fields')).toBe(true);
  });
});
