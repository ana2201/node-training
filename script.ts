import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });
  console.log(user);
}

async function updateUserLastname(data: {id: number, lastname: string}) {
  const user = await prisma.user.update({
    where: { id: data.id },
    data: { lastname: data.lastname }
  });
  console.log(user);
}

async function main() {
  // first version
  // await createUser();

  // second version: update 
  await updateUserLastname({ id:1, lastname: 'Carroll'});
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