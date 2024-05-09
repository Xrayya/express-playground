import { z } from "zod";
import { RequestValidation } from "zod-express-middleware";
import { Note } from "../models/notes.model";

export const getReq: RequestValidation<any, any, { content?: string }> = {
  query: z.object({
    content: z.string().optional(),
  }),
};

export const getByIdReq: RequestValidation<{ id: string }, any, any> = {
  params: z.object({
    id: z.string(),
  }),
};

export const postReq: RequestValidation<
  any,
  any,
  Omit<Note, "id" | "createdAt" | "updatedAt">
> = {
  body: z.object({
    title: z.string(),
    body: z.string().optional(),
    archived: z.boolean(),
  }),
};

export const removeReq = getByIdReq;

export const changeReq: RequestValidation<
  { id: string },
  any,
  Omit<Note, "id" | "createdAt" | "updatedAt">
> = {
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string(),
    body: z.string().optional(),
    archived: z.boolean(),
  }),
};
