import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import * as cache from "../libs/cache";

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader: string = req.headers.authorization
    ? req.headers.authorization
    : "";
  if (!authHeader) {
    return res.status(401).send({ message: "No Access Token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Invalid Access Token" });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { id } = decodedToken as { id: number };
    if (!id) {
      return res.status(401).send({ message: "Invalid Access Token" });
    }
    // check if the access token is in redis
    const cacheTokenClient = cache.tokenClientPool;
    const cacheAccessValue = await cache.getFromCache(
      cacheTokenClient,
      `access-${id}`,
    );
    if (!cacheAccessValue || cacheAccessValue !== token) {
      return res.status(401).send({ message: "Invalid Access Token" });
    }
    req.body.userId = id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid Access Token" });
  }
};

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader: string = req.headers.authorization
    ? req.headers.authorization
    : "";
  if (!authHeader) {
    return res.status(401).send({ message: "No Access Token provided" });
  }
  const refreshToken = authHeader.split(" ")[1];
  if (!refreshToken) {
    return res.status(401).send({ message: "Invalid Access Token" });
  }
  try {
    const decodedToken = jwt.verify(refreshToken, JWT_SECRET);
    const { id } = decodedToken as { id: number };
    if (!id) {
      return res.status(401).send({ message: "Invalid Refresh Token" });
    }
    req.body.userId = id;
    req.body.clientRefreshToken = refreshToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid Refresh Token" });
  }
};

// this middleware is used to check if the user is authorized to access a resource rbac (based on roles) and on tenants based.
// export const authorize = async (action: string, resource: string) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, tenantId } = req.body;
//     const userRoles = await UserRole.find({ userId });

//     for (const userRole of userRoles) {
//       const role = await Role.findOne({ id: userRole.roleId, tenantId });
//       if (role) {
//         const permissions = await Permission.find({ roleId: role.id });
//         for (const permission of permissions) {
//           if (
//             permission.action === action &&
//             permission.resource === resource
//           ) {
//             return next();
//           }
//         }
//       }
//     }

//     return res.status(403).send("Access denied");
//   };
// };
