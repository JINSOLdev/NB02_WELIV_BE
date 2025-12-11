import { IsEmail, IsIn, IsString, MinLength } from '@nestjs/class-validator';
export class SignupAdminRequestDto {
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
  description: string;

  @IsString()
  startComplexNumber: string;

  @IsString()
  endComplexNumber: string;

  @IsString()
  startDongNumber: string;

  @IsString()
  endDongNumber: string;

  @IsString()
  startFloorNumber: string;

  @IsString()
  endFloorNumber: string;

  @IsString()
  startHoNumber: string;

  @IsString()
  endHoNumber: string;

  @IsString()
  @IsIn(['ADMIN'])
  role: 'ADMIN';

  @IsString()
  apartmentName: string;

  @IsString()
  apartmentAddress: string;

  @IsString()
  apartmentManagementNumber: string;
}

export class SignupAdminResponseDto {
  id: string;
  name: string;
  email: string;
  joinStatus: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  isActive: boolean;
  role: 'ADMIN';
}
