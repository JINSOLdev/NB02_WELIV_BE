import { IsEmail, IsIn, IsString, MinLength } from '@nestjs/class-validator';
export class SignupUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  contact: string;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['USER'])
  role: 'User';

  @IsString()
  apartmentName: string;

  @IsString()
  apartmentDong: string;

  @IsString()
  apartmentHo: string;
}

export class SignupUserResponseDto {
  id: string;
  name: string;
  email: string;
  joinStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  isActive: boolean; // 스키마에 없어도 응답값으로 true 반환
  role: 'USER'; // 스웨거 응답에 맞게 문자열로 고정
}
