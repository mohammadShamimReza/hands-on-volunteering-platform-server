import { Comment } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { commentService } from './Comment.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
      const { category, location, visibility } = req.query;

  const result = await commentService.getAllFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'comments fetched successfully',
    data: result,
  });
});



const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await commentService.getById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Comment fetched successfully',
    data: result,
  });
});

const createComment = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await commentService.createComment(payload); // createComment is not defined
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

// const registerComment = catchAsync(async (req: Request, res: Response) => {
//   const payload = req.body;
//   const result = await commentService.registerComment(payload); // createComment is not defined
//   sendResponse(res, {
//     statusCode: StatusCodes.CREATED,
//     success: true,
//     message: 'Registration created successfully',
//     data: result,
//   });
// });

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await commentService.updateComment(id, payload);

  sendResponse<Comment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Comment updated successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await commentService.deleteUsesr(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});

export const CommentController = {
  getAllFromDB,
  getById,
  createComment,
  // registerComment,
  updateComment,
  deleteComment,
};
