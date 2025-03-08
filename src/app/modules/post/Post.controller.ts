import { Post } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { postService } from './Post.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
      const { category, location, visibility } = req.query;

  const result = await postService.getAllFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'posts fetched successfully',
    data: result,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await postService.getById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post fetched successfully',
    data: result,
  });
});

const createPost = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await postService.createPost(payload); // createPost is not defined
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

// const registerPost = catchAsync(async (req: Request, res: Response) => {
//   const payload = req.body;
//   const result = await postService.registerPost(payload); // createPost is not defined
//   sendResponse(res, {
//     statusCode: StatusCodes.CREATED,
//     success: true,
//     message: 'Registration created successfully',
//     data: result,
//   });
// });

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await postService.updatePost(id, payload);

  sendResponse<Post>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await postService.deleteUsesr(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  });
});

export const PostController = {

  getAllFromDB,
  getById,
  createPost,
  // registerPost,
  updatePost,
  deletePost,
};
