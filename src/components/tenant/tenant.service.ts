import { Tenant } from "./tenant.entity";
import { AppDataSource } from "../../config/data-source";
import { ITenantInputDTO } from "../../contracts/tenant";

class TenantService {
  private tenantRepository;
  constructor() {
    this.tenantRepository = AppDataSource.getRepository(Tenant);
  }

  async createTenant(tenant: ITenantInputDTO): Promise<Tenant> {
    const { name } = tenant;
    const newTenant = new Tenant();
    newTenant.name = name;
    return await this.tenantRepository.save(newTenant);
  }

  async getAllTenants(): Promise<Tenant[]> {
    return await this.tenantRepository.find();
  }

  async getTenant(id: number): Promise<Tenant | null> {
    return await this.tenantRepository.findOne({ where: { id: id } });
  }

  async updateTenant(
    id: number,
    tenant: ITenantInputDTO,
  ): Promise<Tenant | null> {
    const { name } = tenant;
    await this.tenantRepository.update(id, { name });
    return await this.tenantRepository.findOne({ where: { id: id } });
  }

  async deleteTenant(id: number): Promise<void> {
    await this.tenantRepository.delete(id);
  }
}

export default TenantService;
