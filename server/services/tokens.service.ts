import jwt, { JwtPayload } from 'jsonwebtoken';

class TokensService {
  private secretAccess = <string>process.env.SECRET_JWT_ACCESS_TOKEN;
  private secretRefresh = <string>process.env.SECRET_JWT_REFRESH_TOKEN;

  public generateAccess(payload: JwtPayload) {
    return jwt.sign(payload, this.secretAccess);
  }

  public verifyAccess(token: string) {
    return jwt.verify(token, this.secretAccess);
  }

  public generateRefresh(payload: JwtPayload) {
    return jwt.sign(payload, this.secretRefresh);
  }

  public verifyRefresh(token: string) {
    return jwt.verify(token, this.secretRefresh);
  }
}

export default new TokensService();