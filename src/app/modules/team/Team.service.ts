import { Team, PrismaClient,  causes, TeamMember } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<Team[]> => {

  const result = await prisma.team.findMany({
    
  });
  return result;
};

const getById = async (id: string): Promise<Team | null> => {
  const result = await prisma.team.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const createTeam = async (payload: Team): Promise<Team> => {
  const result = await prisma.team.create({
    data: payload,
  });
  return result;
};

const registerTeam = async (payload: TeamMember): Promise<TeamMember> => {
  const result = await prisma.teamMember.create({
    data: payload,
  });
  console.log(result, 'this is register team');
  return result;
};

const updateTeam = async (
  id: string,
  payload: Partial<Team>,
): Promise<Team> => {
  const result = await prisma.team.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUsesr = async (id: string): Promise<Team> => {
  const result = await prisma.team.delete({
    where: {
      id,
    },
  });
  return result;
};

export const teamService = {
  getAllFromDb,
  getById,
  createTeam,
  registerTeam,
  updateTeam,
  deleteUsesr,
};
