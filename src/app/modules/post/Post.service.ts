import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<Post[]> => {
  const result = await prisma.post.findMany({
    include: {
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};

const getById = async (id: string): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};

const getPostByUserId = async (id: string) => {
  const result = await prisma.post.findMany({
    where: {
      createdById: id,
    },
  });
  return result;
};

const getPostByTeamId = async (id: string) => {
  const result = await prisma.post.findMany({
    where: {
      createdByTeamId: id,
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

const deletePost = async (id: string): Promise<Post> => {
  console.log(id, 'this is id');
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
  getPostByUserId,
  // registerPost,
  getPostByTeamId,
  updatePost,
  deletePost,
};
