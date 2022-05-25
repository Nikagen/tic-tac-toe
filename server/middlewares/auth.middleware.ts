import { NextFunction, Request, Response } from 'express';
import tokensService from './../services/tokens.service';

export default function(request: Request, response: Response, next: NextFunction) {
  if (request.method === 'OPTIONS') {
    next();
  }

  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    return response
      .status(401)
      .json('Authorization header not found.');
  }

  const accessToken: string | undefined = authorizationHeader.split(' ')[1]; 
  if (!accessToken) {
    return response
      .status(401)
      .json('Access token not found.');
  }

  try {
    request.body.payload = tokensService.verifyAccess(accessToken);
  } catch (error) {
    return response
      .status(401)
      .json('Token has not been verified.');
  }
  
  next();
}