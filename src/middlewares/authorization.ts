import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../components/user/user.entity";
import { roles } from "../config/roles";

export const authorizeRole = (requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const userRole = user.role.name;
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).send({ error: "Access denied" });
    }

    next();
  };
};

export const authorizePermission = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const userRole = user.role.name;

    if (!roles.find((role) => role.name === userRole)) {
      return res.status(403).send({ error: "Access denied" });
    }

    next();
  };
};
