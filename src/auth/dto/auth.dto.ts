import {IsEmail,IsOptional,IsString,MinLength} from 'class-validator'

export class AuthDto{
   @IsOptional()
   @IsString()
   name:string
   
   @IsString({
    message:'Email is required'
   })
   @IsEmail()
   email:string

   @MinLength(6,{
    message:'Min length 6 symbols'
   })
   @IsString({
    message:'Password is required'
   })
   password:string
   
}