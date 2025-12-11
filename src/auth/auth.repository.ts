import { Injectable } from '@nestjs/common';
import { ApartmentStatus, JoinStatus, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 중복 체크
  findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findUserByContact(contact: string) {
    return this.prisma.user.findUnique({ where: { contact } });
  }

  // 아파트 조회
  findApartmentByName(name: string) {
    return this.prisma.apartment.findUnique({ where: { name } });
  }

  // User + Resident 동시에 생성
  async createUserAndResident(params: {
    username: string;
    passwordHash: string;
    contact: string;
    name: string;
    email: string;
    apartmentId: string;
    dong: string;
    ho: string;
  }) {
    const {
      username,
      passwordHash,
      contact,
      name,
      email,
      apartmentId,
      dong,
      ho,
    } = params;

    return this.prisma.$transaction(async (tx) => {
      // User 생성 (계정 정보만)
      const user = await tx.user.create({
        data: {
          username,
          password: passwordHash,
          contact,
          name,
          email,
          role: UserRole.RESIDENT,
        },
      });

      // Resident 생성 (아파트 + 동/호 + 승인 상태)
      const resident = await tx.resident.create({
        data: {
          userId: user.id,
          apartmentId,
          dong,
          ho,
          joinStatus: JoinStatus.PENDING,
        },
      });

      return { user, resident };
    });
  }

  // User + Admin 동시에 생성
  async createUserAndAdmin(params: {
    username: string;
    passwordHash: string;
    contact: string;
    name: string;
    email: string;
    description: string;
    startComplexNumber: string;
    endComplexNumber: string;
    startDongNumber: string;
    endDongNumber: string;
    startFloorNumber: string;
    endFloorNumber: string;
    startHoNumber: string;
    endHoNumber: string;
    apartmentName: string;
    apartmentAddress: string;
    apartmentManagementNumber: string;
  }) {
    const {
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
    } = params;

    return this.prisma.$transaction(async (tx) => {
      // 관리자 user 생성 (계정 정보만)
      const user = await tx.user.create({
        data: {
          username,
          password: passwordHash,
          contact,
          name,
          email,
          role: UserRole.ADMIN,
          isActive: false,
        },
      });

      // 아파트 생성 + 관리자 배정
      const apartment = await tx.apartment.create({
        data: {
          name: apartmentName,
          address: apartmentAddress,
          description,
          officeNumber: apartmentManagementNumber,
          adminId: user.id,
          apartmentStatus: ApartmentStatus.PENDING,

          // 범위 정보
          startComplexNumber,
          endComplexNumber,
          startDongNumber,
          endDongNumber,
          startFloorNumber,
          endFloorNumber,
          startHoNumber,
          endHoNumber,
        },
      });

      return { user, apartment };
    });
  }
}
