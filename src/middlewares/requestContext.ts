import { HeadersKeys } from "@/constants/httpHeaders";
import { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export const extractRequestContext = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  // note: express is turning headers' keys to lowercase
  // extract the authorization header
  const authHeader = req.headers[HeadersKeys.Auth];

  const tenantId = req.headers[HeadersKeys.TenantId] as string | undefined;

  const correlationId =
    (req.headers[HeadersKeys.CorrelationId] as string | undefined) ||
    randomUUID();

  req.context = {
    ...(authHeader && { authorization: authHeader }),
    ...(tenantId && { tenantId }),
    correlationId,
  };

  next();
};
