import { User } from "./user.entity";
import { AppDataSource } from "../../config/data-source";
import * as cache from "../../libs/cache";
import { REFRESH_TOKEN_EXPIRY_FOR_CACHE } from "../../config/env";
import { hashPassword } from "../../utils/cryptoHelpers";
import { IUserInputDTO } from "@/contracts/user";

class IdentityService {
  private userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
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

export default IdentityService;
