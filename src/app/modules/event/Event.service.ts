import { Event, PrismaClient, UserEvent, causes } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (filters: {
  category?: string;
  location?: string;
}): Promise<Event[]> => {
  const { category, location } = filters;

  const result = await prisma.event.findMany({
    where: {
      AND: [
        {
          endDateTime: {
            gte: new Date(), // ✅ Ensures we only fetch upcoming events
          },
        },
        category ? { category: category as causes } : {},
        location
          ? { location: { contains: location, mode: 'insensitive' } }
          : {},
      ],
    },
    orderBy: {
      endDateTime: 'asc', // ✅ Sort events by soonest end date
    },
    include: {
      createdBy: true, // ✅ Include creator details
      participants: true, // ✅ Include participants
    },
  });

  return result;
};

const getAllRegisteredEventByUser = async (
  userId: string,
): Promise<Event[]> => {
  const result = await prisma.userEvent.findMany({
    where: {
      userId: userId, // Find where user is a participant
    },
    include: {
      event: true, // Include event details
    },
  });

  return result.map(userEvent => userEvent.event); // Extract the event details
};

const getAllEventCreateByUser  = async (
  userId: string,
): Promise<Event[]> => {
  const result = await prisma.event.findMany({
    where: {
      createdById: userId, // Find where user is a participant
    },
    
  });

  console.log(result)

  return result; // Extract the event details
};


const getById = async (id: string): Promise<Event | null> => {
  const result = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      participants: {
        include: {
          user: true
        }
      }
    }
  });
  return result;
};

const createEvent = async (payload: Event): Promise<Event> => {

  

  const result = await prisma.event.create({
    data: payload,
  });
  return result;
};

const registerEvent = async (payload: UserEvent): Promise<UserEvent> => {
  const result = await prisma.userEvent.create({
    data: payload,
  });
  console.log(result, 'this is register event');
  return result;
};

const updateEvent = async (
  id: string,
  payload: Partial<Event>,
): Promise<Event> => {
  const result = await prisma.event.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUsesr = async (id: string): Promise<Event> => {
  const result = await prisma.event.delete({
    where: {
      id,
    },
  });
  return result;
};

export const eventService = {
  getAllFromDb,
  getAllRegisteredEventByUser,
  getAllEventCreateByUser,
  getById,
  createEvent,
  registerEvent,
  updateEvent,
  deleteUsesr,
};
