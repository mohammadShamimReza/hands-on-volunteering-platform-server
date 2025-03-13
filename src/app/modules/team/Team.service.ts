import { PrismaClient, Team, TeamMember } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<Team[]> => {
  const result = await prisma.team.findMany({
    include: {
      members: {
        include: {
          user: true,
        },
      },
      post: true,
    },
  });
  return result;
};

const getAllJoinedTeamByUser = async (id: string): Promise<Team[]> => {
  const result = await prisma.teamMember.findMany({
    where: {
      userId: id,
    },
    include: {
      team: true,
    },
  });
  return result.map(teamJoined => teamJoined.team);
};

const getById = async (id: string): Promise<Team | null> => {
  const result = await prisma.team.findUnique({
    where: {
      id,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};

const getByUserId = async (id: string): Promise<Team[] | null> => {
  const result = await prisma.team.findMany({
    where: {
      createdById: id,
    },
  });
  return result;
};

const getEventsByTeamId = async (id: string) => {
  const result = await prisma.event.findMany({
    where: {
      createdByTeamId: id,
    },
  });

  console.log(result);
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
  getEventsByTeamId,
  getByUserId,
  getAllJoinedTeamByUser,
  createTeam,
  registerTeam,
  updateTeam,
  deleteUsesr,
};
