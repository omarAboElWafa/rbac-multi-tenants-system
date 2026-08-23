export interface RequestContext {
  authorization?: string;
  tenantId?: string;
  correlationId: string; // to be generated if missing
}

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}
