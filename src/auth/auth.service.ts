import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { EXCEPTION_RESPONSE } from 'src/shared/config';
import { handleAsyncOperation, validateHashedString } from 'src/shared/utils';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import {
  loginInputDto,
  loginOutputDto,
  SignupWithCredenetialsInputDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  public async signup(credentials: SignupWithCredenetialsInputDto) {
    return handleAsyncOperation(async () => {
      const { email } = credentials;
      const existingUser = await this.userService.findUserByEmail(email);
      if (existingUser)
        throw new ConflictException(EXCEPTION_RESPONSE.SIGNUP_EMIAL_IN_USE);
      const user = await this.userService.createNewUser(credentials);

      return user;
    }, 'Error during Signup');
  }

  // *********************
  public async login(body: loginInputDto): Promise<loginOutputDto> {
    return handleAsyncOperation(async () => {
      const { email, password } = body;
      const user = await this.userService.findUserByEmail(email);
      if (!user)
        throw new BadRequestException(EXCEPTION_RESPONSE.LOGIN_BAD_CREDENTIAL);
      const validPassword = validateHashedString(password, user.password);
      if (!validPassword)
        throw new BadRequestException(EXCEPTION_RESPONSE.LOGIN_BAD_CREDENTIAL);
      const tokens = await this.tokenService.generateAuthTokens(user);
      return { user, tokens };
    }, 'Error during login');
  }
}
