/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString, IsAlphanumeric } from 'class-validator'
export class AuthDto {

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}