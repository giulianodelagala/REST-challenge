import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UsersCreateInput[] = [
  {
    username: 'Alice',
    name: 'Alice Smith',
    password: 'alice1234',
    email: 'alice@prisma.io',
    isNamePublic: false,
    isEmailPublic: true,
    role: 'USER',
    emailVerifiedAt: new Date(Date.now()),
    createdAt: new Date(Date.now()),
    posts: {
      create: [
        {
          title: 'Post of Alice',
          content: 'Content of Post of Alice',
          isPublished: true,
          likeCounter: 0,
          dislikeCounter: 0,
        },
        {
          title: 'Second Post of Alice',
          content: 'Content 1 like n 1 dislike',
          isPublished: true,
          likeCounter: 0,
          dislikeCounter: 0,
        },
      ],
    },
  },
  {
    username: 'Bob',
    name: 'Bob Parker',
    password: 'bob1234',
    email: 'bob@prisma.io',
    isNamePublic: true,
    isEmailPublic: true,
    role: 'USER',
    emailVerifiedAt: new Date(Date.now()),
    createdAt: new Date(Date.now()),
    posts: {
      create: [
        {
          title: 'First Post of Bob',
          content: 'Content Post of Bob ',
          isPublished: true,
          likeCounter: 0,
          dislikeCounter: 0,
          comments: {
            create: {
              content: 'This is a comment from Alice to Bob',
              isPublished: true,
              likeCounter: 0,
              dislikeCounter: 0,
              user: {
                connect: {id: 1}
              }
            }
          }
        },
        {
          title: 'Second Post de Bob',
          content: 'Content not published',
          isPublished: true,
          likeCounter: 0,
          dislikeCounter: 0,
        },
      ],
    },
  },
  {
    username: 'Charlie',
    name: 'Charlie Smith',
    password: 'charlie1234',
    email: 'charlie@prisma.io',
    isNamePublic: false,
    isEmailPublic: false,
    role: 'MODERATOR',
    emailVerifiedAt: new Date(Date.now()),
    createdAt: new Date(Date.now()),
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.users.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
