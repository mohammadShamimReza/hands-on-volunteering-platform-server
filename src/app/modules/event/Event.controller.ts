import { Event } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { eventService } from './Event.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const { category, location } = req.query;
  console.log(category, location)

  const result = await eventService.getAllFromDb({
    category: category as string,
    location: location as string,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'events fetched successfully',
    data: result,
  });
});

const getAllRegisteredEventByUser = catchAsync(
  async (req: Request, res: Response) => {
  const { id } = req.params;

    const result = await eventService.getAllRegisteredEventByUser(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'events fetched successfully',
      data: result,
    });
  },
);

const getAllEventCreateByUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await eventService.getAllEventCreateByUser(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'events fetched successfully',
      data: result,
    });
  },
);


const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await eventService.getById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Event fetched successfully',
    data: result,
  });
});

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await eventService.createEvent(payload); // createEvent is not defined
  console.log(result)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});
const registerEvent = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await eventService.registerEvent(payload); // createEvent is not defined
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Registration created successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await eventService.updateEvent(id, payload);

  sendResponse<Event>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await eventService.deleteUsesr(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

export const EventController = {

  getAllFromDB,
  getAllRegisteredEventByUser,
  getAllEventCreateByUser,
  getById,
  createEvent,
  registerEvent,
  updateEvent,
  deleteEvent,
};
