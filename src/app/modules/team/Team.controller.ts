import { Team } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { teamService } from './Team.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
      const { category, location, visibility } = req.query;

  const result = await teamService.getAllFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'teams fetched successfully',
    data: result,
  });
});

const getAllJoinedTeamByUser = catchAsync(
  async (req: Request, res: Response) => {
  const { id } = req.params;

    const result = await teamService.getAllJoinedTeamByUser(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'teams fetched successfully',
      data: result,
    });
  },
);

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teamService.getById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team fetched successfully',
    data: result,
  });
});

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await teamService.createTeam(payload); // createTeam is not defined
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Team created successfully',
    data: result,
  });
});

const registerTeam = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await teamService.registerTeam(payload); // createTeam is not defined
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Registration created successfully',
    data: result,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await teamService.updateTeam(id, payload);

  sendResponse<Team>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team updated successfully',
    data: result,
  });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await teamService.deleteUsesr(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team deleted successfully',
    data: result,
  });
});

export const TeamController = {

  getAllFromDB,
  getAllJoinedTeamByUser,
  getById,
  createTeam,
  registerTeam,
  updateTeam,
  deleteTeam,
};
