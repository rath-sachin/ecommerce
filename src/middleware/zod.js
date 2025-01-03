import { ZodError } from "zod";

/**
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function zod(err, req, res, next) {
  if (err instanceof ZodError) {
    res.status(400).json(err.flatten());
    return;
  }
  next(err);
}
