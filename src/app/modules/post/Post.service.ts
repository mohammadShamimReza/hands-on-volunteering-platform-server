import { Post, PrismaClient,  causes } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<Post[]> => {

  const result = await prisma.post.findMany({
    
  });
  return result;
};

const getById = async (id: string): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const createPost = async (payload: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};

// const registerPost = async (payload: UserPost): Promise<UserPost> => {
//   const result = await prisma.userPost.create({
//     data: payload,
//   });
//   console.log(result, 'this is register post');
//   return result;
// };

const updatePost = async (
  id: string,
  payload: Partial<Post>,
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUsesr = async (id: string): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

export const postService = {
  getAllFromDb,
  getById,
  createPost,
  // registerPost,
  updatePost,
  deleteUsesr,
};
