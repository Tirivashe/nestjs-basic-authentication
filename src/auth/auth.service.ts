import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(authDto: AuthDto): Promise<User> {
    const { name, email, password } = authDto;

    try {
      const user: User = await this.prismaService.user.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 10)
        }
      });

      if (!user)
        throw new InternalServerErrorException(
          "Couldn't sign up. Server error"
        );

      delete user.password;
      delete user.id;
      return user;
    } catch (error) {
      if (PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException(
          "Something went wrong, please try again later"
        );
      }
    }
  }

  async login(authCredentials: AuthDto): Promise<{ access_token: string }> {
    const { name, email, password } = authCredentials;

    try {
      const user: User | null = await this.prismaService.user.findUnique({
        where: {
          email
        }
      });

      if (!user) throw new ForbiddenException("Invalid credentials");

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) throw new ForbiddenException("Invalid credentials");

      const payload = {
        sub: user.id,
        name,
        email
      };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: "15m",
          secret: "some-secret-key"
        })
      };
    } catch (error) {
      if (PrismaClientKnownRequestError)
        throw new BadRequestException(error.message);
      else
        throw new InternalServerErrorException("Couldn't log in. Server error");
    }
  }
}
