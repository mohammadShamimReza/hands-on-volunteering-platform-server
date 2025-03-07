import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});
  return result;
};

const getById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>,
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUsesr = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userService = {
  getAllFromDb,
  getById,
  updateUser,
  deleteUsesr,
};
