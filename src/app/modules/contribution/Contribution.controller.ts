import { Contribution } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { contributionService } from './Contribution.service';

const getLogHours = catchAsync(async (req: Request, res: Response) => {

  const { userId, eventId } = req.body;

  const result = await contributionService.getLogHours({ userId, eventId });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'contributions fetched successfully',
    data: result,
  });
});

const getUserStats = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await contributionService.getUserStats({ userId: id });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Star fetched successfully',
    data: result,
  });
});

const getLearderboard = catchAsync(async (req: Request, res: Response) => {
  const result = await contributionService.getLearderboard();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Leaderboard fetched successfully',
    data: result,
  });
});

const createContribution = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await contributionService.createContribution(payload); // createContribution is not defined
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Contribution created successfully',
    data: result,
  });
});

// const registerContribution = catchAsync(async (req: Request, res: Response) => {
//   const payload = req.body;
//   const result = await contributionService.registerContribution(payload); // createContribution is not defined
//   sendResponse(res, {
//     statusCode: StatusCodes.CREATED,
//     success: true,
//     message: 'Registration created successfully',
//     data: result,
//   });
// });

const updateContribution = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await contributionService.updateContribution(id, payload);

  sendResponse<Contribution>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Contribution updated successfully',
    data: result,
  });
});

const deleteContribution = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await contributionService.deleteUsesr(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Contribution deleted successfully',
    data: result,
  });
});

export const ContributionController = {
  getLogHours,
  getLearderboard,
  getUserStats,
  createContribution,
  // registerContribution,
  updateContribution,
  deleteContribution,
};
