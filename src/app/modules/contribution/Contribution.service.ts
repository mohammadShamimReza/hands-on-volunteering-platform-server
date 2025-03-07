import { Contribution, PrismaClient } from '@prisma/client';
import { differenceInHours } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const getLogHours = async ({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) => {
  console.log(userId, eventId, 'this is get log hours');
  const result = await prisma.userEvent.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
    select: {
      joinedAt: true,

      user: {
        select: {
          id: true,
          fullName: true,
          profileImage: true,
        },
      },
      event: {
        select: {
          endDateTime: true,
        },
      },
    },
  });

  if (!result) {
    return new ApiError(StatusCodes.NOT_FOUND, 'User event not found');
  }

  const { joinedAt, event } = result;
  const now = new Date();

  // ✅ Determine the correct end time for calculation
  const calculationEndTime =
    event?.endDateTime && event.endDateTime < now ? event.endDateTime : now;

  // ✅ Calculate hours volunteered
  const hoursVolunteered = differenceInHours(
    calculationEndTime,
    new Date(joinedAt),
  );

  return {
    joinedAt,
    endDateTime: event?.endDateTime,
    hoursVolunteered,
    user: result.user,
  };
};

const getLearderboard = async () => {
  const userEvents = await prisma.userEvent.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          profileImage: true,
        },
      },
      event: {
        select: {
          endDateTime: true,
        },
      },
    },
  });

  if (!userEvents.length) {
    return [];
  }

  // ✅ Calculate total hours and points per user
  const leaderboardMap = new Map();

  userEvents.forEach(({ user, joinedAt, event }) => {
    const now = new Date();

    // ✅ Determine the end time for calculation
    const calculationEndTime =
      event?.endDateTime && event.endDateTime < now ? event.endDateTime : now;

    // ✅ Calculate hours volunteered
    const hoursVolunteered = differenceInHours(
      calculationEndTime,
      new Date(joinedAt),
    );
    const pointsEarned = hoursVolunteered * 5; // ✅ 5 points per hour

    if (!leaderboardMap.has(user.id)) {
      leaderboardMap.set(user.id, {
        user,
        totalHours: 0,
        totalPoints: 0,
      });
    }

    const userStats = leaderboardMap.get(user.id);
    userStats.totalHours += hoursVolunteered;
    userStats.totalPoints += pointsEarned;
  });

  // ✅ Convert Map to Array and sort by total points (descending)
  const leaderboard = Array.from(leaderboardMap.values()).sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );

  console.log(leaderboard, 'this is leaderboard');
  return leaderboard;
};


const createContribution = async (
  payload: Contribution,
): Promise<Contribution> => {
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
  getLogHours,
  getLearderboard,
  createContribution,
  // registerContribution,
  updateContribution,
  deleteUsesr,
};
