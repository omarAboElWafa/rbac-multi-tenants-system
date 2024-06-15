import { Request, Response } from "express";
import RoleService from "./role.service";
import { IRoleInputDTO } from "../../contracts/role";

class RoleController {
  roleService: RoleService;
  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  createRole = async (req: Request, res: Response) => {
    try {
      const roleInput: IRoleInputDTO = req.body;
      const role = await this.roleService.createRole(roleInput);
      return res.status(201).json({
        message: "Role created successfully",
        data: role,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  getRoles = async (req: Request, res: Response) => {
    try {
      const roles = await this.roleService.getRoles();
      return res.status(200).json({
        message: "List of roles",
        data: roles,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  getRole = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await this.roleService.getRole(parseInt(id));
      return res.status(200).json({
        message: "Role found",
        data: role,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  updateRole = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const roleInput: IRoleInputDTO = req.body;
      const role = await this.roleService.updateRole(parseInt(id), roleInput);
      return res.status(200).json({
        message: "Role updated",
        data: role,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  deleteRole = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.roleService.deleteRole(parseInt(id));
      return res.status(204).json({
        message: "Role deleted",
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export default RoleController;
