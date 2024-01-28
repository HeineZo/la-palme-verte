import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export interface ApiResponse<PrismaObject> {
  data?: PrismaObject | PrismaObject[] | null;
  code: number;
  message: string;
  error?: PrismaClientKnownRequestError;
};