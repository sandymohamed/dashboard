import { z } from "zod";
import { SubjectStatsSchema } from "./StudentSchema";
import { LessonSchema } from "./LessonSchema";

const StudentSubjectsSchema = z.record(z.string(), SubjectStatsSchema);

const StudentInfoSchema = z.object({
  student_name: z.string(),
  student_id: z.number(),
  subjects: StudentSubjectsSchema,
  completion_percentage: z.number(),
});

const FamilyResponseSchema = z.object({
  count: z.number(),
  students: z.array(StudentInfoSchema),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LessonSchema),
});

export type TFamilyResponse = z.infer<typeof FamilyResponseSchema>;