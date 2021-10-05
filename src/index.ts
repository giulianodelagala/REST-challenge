import {PrismaClient} from '@prisma/client'
import {
  createComment,
  updatecomment,
  deleteComment,
  showComment,
  showAllComments,
} from './comment_crud'
const prisma = new PrismaClient()

async function main() {
  
  // ... you will write your Prisma Client queries here
  createComment(5,'muy buen post te escribiste crack',1,1)
  updatecomment(5,'cambio de opinion, no me gusto')
  deleteComment(5)
  showComment(5)

  //showAllComments()  no funciona aun :C
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
