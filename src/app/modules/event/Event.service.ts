import { PrismaClient, Event } from '@prisma/client';

const prisma = new PrismaClient();

const getAllFromDb = async (): Promise<Event[]> => {
  const result = await prisma.event.findMany({});
  return result;
};

const getById = async (id: string): Promise<Event | null> => {
  const result = await prisma.event.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const createEvent = async (payload: Event): Promise<Event> => {
  const result = await prisma.event.create({
    data: payload,
  });
  console.log(result, 'this is event creation')
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
  getById,
  createEvent,
  updateEvent,
  deleteUsesr,
};
