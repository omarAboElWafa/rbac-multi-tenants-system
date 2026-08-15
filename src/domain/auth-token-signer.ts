import { AuthTokenClaims } from "./auth-token";

export interface IAuthTokenSigner {
  signToken(claims: AuthTokenClaims): string;
}
