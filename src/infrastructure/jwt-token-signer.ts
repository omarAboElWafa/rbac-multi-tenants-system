import jwt from "jsonwebtoken";
import { IAuthTokenSigner } from "@/domain/auth-token-signer";
import { JWT_SECRET } from "@/config/env";

export class JwtTokenSigner implements IAuthTokenSigner {
  constructor(
    private readonly expiresIn: string,
    private readonly secret: string = JWT_SECRET,
  ) {}

  signToken(userPayload: { id: number }): string {
    return jwt.sign({ id: userPayload.id }, this.secret, {
      expiresIn: this.expiresIn,
    });
  }
}
