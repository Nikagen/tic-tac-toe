import md5 from 'md5';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { client } from './../config/redis';
import { User } from './../models/user';
import usersService from './../services/users.service';
import tokensService from './../services/tokens.service';

class UserController {
  public async signup(request: Request, response: Response) {
    const {login, password, gameSession} = request.body;
    if (!login || !password) {
      return response
        .status(400)
        .json('Login or password was not received.');
    }

    const id = md5(login);
    if (await usersService.userExists(id)) {
      return response
        .status(400)
        .json('Login already taken.');
    }
    
    const user: User = {
      login: login,
      password: usersService.getHashPassword(password),
      gameSession: gameSession,
      refreshToken: tokensService.generateRefresh({id: id})
    };

    await usersService.createUser(id, user);

    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 1000*60*60*24*30, // 30 days
      httpOnly: false,
      secure: true
    });

    return response
      .status(200)
      .json({
        'accessToken': tokensService.generateAccess({id: id})
      });
  }

  public async signin(request: Request, response: Response) {
    const {login, password} = request.body;
    if (!login || !password) {
      return response
        .status(404)
        .json('Login or password was not founded.');
    }

    const id = md5(login);
    if (await client.exists(id) !== 1) {
      return response
        .status(404)
        .json('User not found!');
    }

    if (!await usersService.validateUser(id, login, password)) {
      return response
        .status(400)
        .json('Login or password entered incorrectly.');
    }

    return response
      .status(200)
      .json({
        'accessToken': tokensService.generateAccess({id: id})
      });
  }

  public async getUser(request: Request, response: Response) {
    const {payload} : {payload: JwtPayload} = request.body;
    return response
      .status(200)
      .json(await usersService.getUser(payload.id));
  }
}

export default new UserController();