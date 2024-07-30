import { z } from "zod";
import { LessonSchema } from "./LessonSchema";

const TeacherResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LessonSchema),
});

export type TTeacherResponse = z.infer<typeof TeacherResponseSchema>;