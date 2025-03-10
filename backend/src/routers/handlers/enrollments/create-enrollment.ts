import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';

import { Between } from 'typeorm';
import { AppDataSource } from '../../../database/app-data-source';

import { HttpStatusCode } from '../../../constants/http-status-code';
import { ErrorsMessages } from '../../../constants/error-messages';

import { Grade } from '../../../database/entities/Grade';
import { Shift } from '../../../database/entities/Shift';
import { Guardian } from '../../../database/entities/Guardian';
import { Enrollment } from '../../../database/entities/Enrollment';
import { Student } from '../../../database/entities/Student';
import { Tuition } from '../../../database/entities/Tuition';

export async function createEnrollment(req: Request, res: Response<object | { error: string; details?: string }>) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });

    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" Invalid request data`);
    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "req.body" "${JSON.stringify(req.body)}"`);
    return;
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const { grade, shift, isDaycare, student, guardian, billing } = req.body;

    // Fetch grade entity
    const gradeEntity = await queryRunner.manager.findOne(Grade, { where: { id: grade } });
    if (!gradeEntity) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        error: ErrorsMessages.NOT_FOUND,
        details: 'Grade not found'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "Grade not found" "${grade}"`);
      return;
    }

    // Fetch shift entity
    const shiftEntity = await queryRunner.manager.findOne(Shift, {  where: { id: shift } });
    if (!shiftEntity) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        error: ErrorsMessages.NOT_FOUND,
        details: 'Shift not found'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "Shift not found" "${shift}"`);
      return;
    }

    // Fetch or create guardian
    let guardianEntity = await queryRunner.manager.findOne(Guardian, { where: { cpf: guardian.cpf }, relations: ['contacts'] });
    if (!guardianEntity) {
      guardianEntity = queryRunner.manager.create(Guardian, {
        name: guardian.name,
        cpf: guardian.cpf,
        email: guardian.email,
        address: guardian.address
      });
      await queryRunner.manager.save(guardianEntity);

      const contacts = guardian.contacts.map((contact: { phone: string }) => queryRunner.manager.create('Contact', {
        phone: contact.phone,
        guardian: guardianEntity
      }));
      await queryRunner.manager.save(contacts);

      guardianEntity.contacts = contacts;
    }

    // Check existing enrollments for this guardian in the current year
    const currentYear = new Date().getFullYear();
    const enrollmentsThisYear = await queryRunner.manager.find(Enrollment, {
      where: {
        guardian: { id: guardianEntity.id },
        created_at: Between(new Date(`${currentYear}-01-01`), new Date(`${currentYear + 1}-01-01`))
      },
      relations: ['student']
    });

    // Check if the student is already enrolled this year
    const isStudentAlreadyEnrolled = enrollmentsThisYear.some(enrollment =>
      enrollment.student.name === student.name,
    );

    if (isStudentAlreadyEnrolled) {
      res.status(HttpStatusCode.CONFLICT).json({
        error: ErrorsMessages.CONFLICT,
        details: 'Student is already enrolled this year'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "Student is already enrolled this year" "${student.name}" "Guardian/${guardianEntity.id}"`);
      return;
    }

    // Create student entity
    const studentEntity = queryRunner.manager.create(Student, {
      name: student.name,
      birthday: student.birthday,
      gender: student.gender
    });
    await queryRunner.manager.save(studentEntity);

    // Create enrollment entity
    const enrollmentEntity = queryRunner.manager.create(Enrollment, {
      grade: gradeEntity,
      shift: shiftEntity,
      is_daycare: isDaycare,
      student: studentEntity,
      guardian: guardianEntity
    });
    await queryRunner.manager.save(enrollmentEntity);

    // Create tuition payments (12 installments)
    const tuitions: Tuition[] = [];

    const currentDate = new Date();
    currentDate.setMonth(0); // January
    currentDate.setHours(0, 0, 0, 0);

    // First tuition (initial fee)
    tuitions.push(
      queryRunner.manager.create(Tuition, {
        code: Math.floor(Math.random() * 1e22).toString().padStart(22, '0'),
        is_paid: false,
        is_enrollment: true,
        amount: billing.fees.initial,
        enrollment: enrollmentEntity,
        due_date: currentDate.toISOString(),
      })
    );

    // Remaining 11 monthly payments
    for (let i = 1; i <= 11; i++) {
      const dueDate = new Date();
      dueDate.setMonth(currentDate.getMonth() + i);
      dueDate.setDate(billing.dueDay);
      dueDate.setHours(0, 0, 0, 0);

      tuitions.push(
        queryRunner.manager.create(Tuition, {
          code: Math.floor(Math.random() * 1e22).toString().padStart(22, '0'),
          is_paid: false,
          is_enrollment: true,
          amount: billing.fees.recurring,
          enrollment: enrollmentEntity,
          due_date: dueDate.toISOString(),
        })
      );
    }

    await queryRunner.manager.save(tuitions);
    await queryRunner.commitTransaction();

    res.status(HttpStatusCode.CREATED).json({
        uuid: enrollmentEntity.uuid,
        grade: gradeEntity.name,
        shift: shiftEntity.name,
        isDaycare: isDaycare,
        student: {
          uuid: studentEntity.uuid,
          name: studentEntity.name,
          birthday: studentEntity.birthday,
        },
        guardian: {
          uuid: guardianEntity.uuid,
          name: guardianEntity.name,
          contacts: guardianEntity.contacts.map(contact => contact.phone)
        },
      tuitions: tuitions.map(tuition => ({
        code: tuition.code,
        amount: tuition.amount,
        dueDate: tuition.due_date,
        isPaid: tuition.is_paid,
      }))
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: ErrorsMessages.INTERNAL_SERVER_ERROR,
      details: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "Internal server error" "${error}"`);
  } finally {
    await queryRunner.release();
  }
}
