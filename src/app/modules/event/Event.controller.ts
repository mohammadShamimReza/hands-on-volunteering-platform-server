import { Event } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { eventService } from './Event.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await eventService.getAllFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'events fetched successfully',
    data: result,
  });
});

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
    message: 'Staff deleted successfully',
    data: result,
  });
});

export const StaffController = {

  getAllFromDB,
  getById,
  updateEvent,
  deleteEvent,
};
