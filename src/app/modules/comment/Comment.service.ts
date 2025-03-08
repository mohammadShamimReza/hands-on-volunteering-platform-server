import { Comment, PrismaClient,  causes } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<Comment[]> => {

  const result = await prisma.comment.findMany({
    
  });
  return result;
};

const getById = async (id: string): Promise<Comment | null> => {
  const result = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const createComment = async (payload: Comment): Promise<Comment> => {
  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};

// const registerComment = async (payload: UserComment): Promise<UserComment> => {
//   const result = await prisma.userComment.create({
//     data: payload,
//   });
//   console.log(result, 'this is register comment');
//   return result;
// };

const updateComment = async (
  id: string,
  payload: Partial<Comment>,
): Promise<Comment> => {
  const result = await prisma.comment.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUsesr = async (id: string): Promise<Comment> => {
  const result = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const commentService = {
  getAllFromDb,
  getById,
  createComment,
  // registerComment,
  updateComment,
  deleteUsesr,
};
