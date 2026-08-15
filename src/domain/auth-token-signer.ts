export interface IAuthTokenSigner {
  signToken(userPayload: { id: number }): string;
}
