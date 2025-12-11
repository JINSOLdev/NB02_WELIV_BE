import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import {
  SignupUserRequestDto,
  SignupUserResponseDto,
} from './dto/signup-user.dto';
import {
  SignupAdminRequestDto,
  SignupAdminResponseDto,
} from './dto/signup-admin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly repo: AuthRepository) {}

  async signupUser(dto: SignupUserRequestDto): Promise<SignupUserResponseDto> {
    const {
      username,
      password,
      contact,
      name,
      email,
      apartmentName,
      apartmentDong,
      apartmentHo,
    } = dto;

    // 1. 아파트 존재 확인
    const apt = await this.repo.findApartmentByName(apartmentName);
    if (!apt) throw new BadRequestException('유효하지 않은 아파트명입니다.');

    // 2. 중복 확인 : username, email, contact
    if (await this.repo.findUserByUsername(username))
      throw new ConflictException('이미 사용중인 아이디 입니다.');

    if (await this.repo.findUserByEmail(email))
      throw new ConflictException('이미 사용중인 이메일 입니다.');

    if (await this.repo.findUserByContact(contact))
      throw new ConflictException('이미 사용중인 연락처입니다.');

    // 3. 비밀번호 해싱
    const passwordHash = await bcrypt.hash(password, 12);

    // 4. 사용자 생성
    const { user, resident } = await this.repo.createUserAndResident({
      username,
      passwordHash,
      contact,
      name,
      email,
      apartmentId: apt.id,
      dong: apartmentDong,
      ho: apartmentHo,
    });

    // 5. 스웨거 응답 스펙에 맞춰 반환
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      joinStatus: resident.joinStatus,
      isActive: user.isActive,
      role: 'USER',
    };
  }

  async signupAdmin(
    dto: SignupAdminRequestDto,
  ): Promise<SignupAdminResponseDto> {
    const {
      username,
      password,
      contact,
      name,
      email,
      description,
      startComplexNumber,
      endComplexNumber,
      startDongNumber,
      endDongNumber,
      startFloorNumber,
      endFloorNumber,
      startHoNumber,
      endHoNumber,
      apartmentName,
      apartmentAddress,
      apartmentManagementNumber,
    } = dto;

    // 1. 아파트 존재 확인
    const apt = await this.repo.findApartmentByName(apartmentName);
    if (apt) throw new BadRequestException('이미 존재하는 아파트 입니다.');

    // 2. 중복 확인 : username, email, contact
    if (await this.repo.findUserByUsername(username))
      throw new ConflictException('이미 사용중인 아이디 입니다.');

    if (await this.repo.findUserByEmail(email))
      throw new ConflictException('이미 사용중인 이메일 입니다.');

    if (await this.repo.findUserByContact(contact))
      throw new ConflictException('이미 사용중인 연락처입니다.');

    // 3. 비밀번호 해싱
    const passwordHash = await bcrypt.hash(password, 12);

    // 4. 아파트 및 관리자 생성
    const { user, apartment } = await this.repo.createUserAndAdmin({
      username,
      passwordHash,
      contact,
      name,
      email,
      description,
      startComplexNumber,
      endComplexNumber,
      startDongNumber,
      endDongNumber,
      startFloorNumber,
      endFloorNumber,
      startHoNumber,
      endHoNumber,
      apartmentName,
      apartmentAddress,
      apartmentManagementNumber,
    });

    // 5. 스웨거 응답 스펙에 맞춰 반환
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      joinStatus: apartment.apartmentStatus,
      isActive: user.isActive,
      role: 'ADMIN',
    };
  }
}
