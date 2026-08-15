import jwt from "jsonwebtoken";
import { IAuthTokenSigner } from "@/domain/auth-token-signer";
import { JWT_SECRET } from "@/config/env";
import { AuthTokenClaims } from "@/domain/auth-token";

export class JwtTokenSigner implements IAuthTokenSigner {
  constructor(
    private readonly expiresIn: string,
    private readonly secret: string = JWT_SECRET,
  ) {}

  signToken(claims: AuthTokenClaims): string {
    return jwt.sign({ ...claims }, this.secret, {
      expiresIn: this.expiresIn,
      algorithm: "ES256",
    });
  }
}
