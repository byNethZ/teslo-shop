import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  checkStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException('User already exists');
    }

    console.log(error);
    throw new InternalServerErrorException('Internal Server Error');
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
