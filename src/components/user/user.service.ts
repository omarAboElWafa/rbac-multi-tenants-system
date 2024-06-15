import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Tenant } from "../tenant/tenant.entity";
import { Permission } from "../permission/permission.entity";
import { Role } from "../role/role.entity";
import * as cache from "../../libs/cache";
import { REFRESH_TOKEN_EXPIRY_FOR_CACHE } from "../../config/env";
import { hashPassword } from "../../utils/cryptoHelpers";
import { IUserInputDTO } from "@/contracts/user";

class UserService {
  private userRepository;
  private tenantRepository;
  private roleRepository;
  private permissionRepository;

  constructor(
    userRepository: Repository<User>,
    tenantRepository: Repository<Tenant>,
    roleRepository: Repository<Role>,
    permissionRepository: Repository<Permission>,
  ) {
    this.userRepository = userRepository;
    this.tenantRepository = tenantRepository;
    this.roleRepository = roleRepository;
    this.permissionRepository = permissionRepository;
  }

  async addUser(user: IUserInputDTO): Promise<User> {
    const { name, email, password } = user;
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = await hashPassword(password);
    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ where: { email: email } });
  };

  findUserById = async (id: number): Promise<User | null> => {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ["permissions", "role", "tenant", "products"],
    });
  };

  async updateUser(
    id: number,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<void> {
    await this.userRepository.update(id, { name, email, password });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  assignToTenant = async (userId: number, tenantId: number) => {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId },
    });
    if (!tenant) throw new Error("Tenant not found");

    user.tenant = tenant;
    await this.userRepository.save(user);

    return true;
  };

  async grantUserPermission(
    userId: number,
    permissionName: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });
    if (!user) throw new Error("User not found");

    const role = user.role;
    if (!role) throw new Error("Role not found");

    let permission = await this.permissionRepository.findOne({
      where: { name: permissionName, role: role },
    });
    if (!permission) {
      permission = this.permissionRepository.create({
        name: permissionName,
        role: role,
        user: user,
      });
    }

    await this.permissionRepository.save(permission);
  }

  //token related methods
  storeToken = async (id: string, token: string, expiresIn: number) => {
    const tokensCacheClient = cache.tokenClientPool;
    const stored = await cache.setToCache(
      tokensCacheClient,
      id,
      token,
      expiresIn,
    );

    return stored;
  };

  findToken = async (id: string) => {
    const tokensCacheClient = cache.tokenClientPool;
    const token = await cache.getFromCache(tokensCacheClient, id);

    return token;
  };

  isRefreshTokenBlacklisted = async (id: number) => {
    const tokensCacheClient = cache.tokenClientPool;
    const blacklistedUser = await cache.getFromCache(
      tokensCacheClient,
      `${id}-blacklisted`,
    );

    return !!blacklistedUser;
  };

  whitelistRefreshToken = async (id: number) => {
    const tokensCacheClient = cache.tokenClientPool;
    const whiteListed = await cache.deleteFromCache(
      tokensCacheClient,
      `${id}-blacklisted`,
    );

    return whiteListed;
  };

  blacklistRefreshToken = async (id: number) => {
    const tokensCacheClient = cache.tokenClientPool;
    const blacklisted = await cache.setToCache(
      tokensCacheClient,
      `${id}-blacklisted`,
      "true",
      REFRESH_TOKEN_EXPIRY_FOR_CACHE,
    );

    return blacklisted;
  };

  deleteToken = async (id: string) => {
    const tokensCacheClient = cache.tokenClientPool;
    const deleted = await cache.deleteFromCache(
      tokensCacheClient,
      id.toString(),
    );

    return deleted;
  };
}

export default UserService;
