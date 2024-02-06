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

async function updateUser(data: {id: number, password: string}) {
  const user = await prisma.user.update({
    where: { id: data.id },
    data: { password: data.password }
  });
  console.log(user);
}

async function getUser(data: {id: number}) {
  const u = await prisma.user.findFirst({
    where: {id: data.id}
  });
  console.log(u);
}

async function main() {
  // await createUser();

  // await updateUser({ id:1, password: 'pw123'});
  
  await getUser({ id:1});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // eslint-disable-next-line no-undef
    process.exit(1);
  });