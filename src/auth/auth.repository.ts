import { Injectable } from '@nestjs/common';
import { JoinStatus, UserRole } from '@prisma/client';
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
}
