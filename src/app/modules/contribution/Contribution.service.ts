import { Contribution, PrismaClient,  causes } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<Contribution[]> => {

  const result = await prisma.contribution.findMany({
    
  });
  return result;
};

const getById = async (id: string): Promise<Contribution | null> => {
  const result = await prisma.contribution.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const createContribution = async (payload: Contribution): Promise<Contribution> => {
  const result = await prisma.contribution.create({
    data: payload,
  });
  return result;
};

// const registerContribution = async (payload: UserContribution): Promise<UserContribution> => {
//   const result = await prisma.userContribution.create({
//     data: payload,
//   });
//   console.log(result, 'this is register contribution');
//   return result;
// };

const updateContribution = async (
  id: string,
  payload: Partial<Contribution>,
): Promise<Contribution> => {
  const result = await prisma.contribution.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUsesr = async (id: string): Promise<Contribution> => {
  const result = await prisma.contribution.delete({
    where: {
      id,
    },
  });
  return result;
};

export const contributionService = {
  getAllFromDb,
  getById,
  createContribution,
  // registerContribution,
  updateContribution,
  deleteUsesr,
};
