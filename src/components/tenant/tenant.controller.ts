import { Request, Response } from "express";
import TenantService from "./tenant.service";
import { ITenantInputDTO } from "../../contracts/tenant";

class TenantController {
  tenantService: TenantService;
  constructor(tenantService: TenantService) {
    this.tenantService = tenantService;
  }

  createTenant = async (req: Request, res: Response) => {
    try {
      const tenantData: ITenantInputDTO = req.body;
      const tenant = await this.tenantService.createTenant(tenantData);
      return res.status(201).json({ data: tenant });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  getAllTenants = async (req: Request, res: Response) => {
    try {
      const tenants = await this.tenantService.getAllTenants();
      if (!tenants || tenants.length === 0) {
        return res.status(404).json({ error: "No tenants found" });
      }
      return res.status(200).json({ data: tenants });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  getTenant = async (req: Request, res: Response) => {
    try {
      const tenantId = req.params.id;
      const tenant = await this.tenantService.getTenant(parseInt(tenantId));
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      return res.status(200).json({ data: tenant });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  updateTenant = async (req: Request, res: Response) => {
    try {
      const tenantId = req.params.id;
      const tenantData: ITenantInputDTO = req.body;
      const tenant = await this.tenantService.updateTenant(
        parseInt(tenantId),
        tenantData,
      );
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      return res.status(200).json({ data: tenant });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  deleteTenant = async (req: Request, res: Response) => {
    try {
      const tenantId = req.params.id;
      const tenant = await this.tenantService.getTenant(parseInt(tenantId));
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      await this.tenantService.deleteTenant(parseInt(tenantId));
      return res.status(200).json({ message: "Tenant deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };
}

export default TenantController;
