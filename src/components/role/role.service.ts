import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { IRoleInputDTO } from "../../contracts/role";

class RoleService {
  private roleRepository: Repository<Role>;

  constructor(roleRepository: Repository<Role>) {
    this.roleRepository = roleRepository;
  }

  async createRole(role: IRoleInputDTO): Promise<Role> {
    const newRole = new Role();
    newRole.name = role.name;
    return await this.roleRepository.save(newRole);
  }

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async getRole(id: number): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { id: id } });
  }

  async updateRole(id: number, role: IRoleInputDTO): Promise<Role | null> {
    await this.roleRepository.update(id, role);
    return await this.roleRepository.findOne({ where: { id: id } });
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}

export default RoleService;
