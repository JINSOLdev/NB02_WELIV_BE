import { PrismaClient, UserRole, ApartmentStatus } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // SUPER ADMIN
  const superAdmin = await prisma.user.create({
    data: {
      username: 'superadmin',
      password: 'testpassword',
      contact: '010-0000-0000',
      name: '김관리',
      email: 'super@email.com',
      role: UserRole.SUPER_ADMIN,
    },
  });

  // ADMIN
  const admin = await prisma.user.create({
    data: {
      username: 'adminkim',
      password: 'testpassword',
      contact: '010-1111-1111',
      name: '김철수',
      email: 'admin@email.com',
      role: UserRole.ADMIN,
    },
  });

  // Apartment
  const apartment = await prisma.apartment.create({
    data: {
      name: '공작부영 아파트',
      address: '경기도 안양시 동안구',
      description: '구축 아파트입니다.',
      officeNumber: '031-1111-1111',
      startComplexNumber: '1',
      endComplexNumber: '3',
      startDongNumber: '301',
      endDongNumber: '310',
      startHoNumber: '101',
      endHoNumber: '1510',
      startFloorNumber: '1',
      endFloorNumber: '15',
      apartmentStatus: ApartmentStatus.ACTIVE,
      adminId: admin.id,
    },
  });

  console.log('Seed data inserted successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
