import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Runo",
  //     email: "runo@gmail.com",
  //   },
  // });

  // const allUsers = await prisma.user.findMany()

  // const newUser = await prisma.user.create({
  //   data: {
  //     name: 'Ejiro',
  //     email: 'flex@gmail.com',
  //     posts: {
  //       create: {
  //         title: 'The critic',
  //         published: false,
  //         content: 'balllll'
  //       }
  //     }
  //   }
  // })

  // console.log(newUser);

  const posts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.dir(posts, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
