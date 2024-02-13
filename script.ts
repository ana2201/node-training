import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      lastname: 'Carroll',
      email: 'alice@prisma.io',
      password: 'pw'
    },
  });
  console.log(user);
}

async function updateUserLastname(data: {id: number, lastname: string}) {
  const user = await prisma.user.update({
    where: { id: data.id },
    data: { password: data.lastname }
  });
  console.log(user);
}

async function main() {
  // await createUser();

  await updateUserLastname({ id:1, lastname: 'lastname'});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
