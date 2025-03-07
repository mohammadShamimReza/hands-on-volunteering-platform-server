/* eslint-disable no-unused-vars */

import { User } from '@prisma/client';

import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config/index.js';
import ApiError from '../../../errors/ApiError.js';
import { jwtHelpers } from '../../../helpers/jwtHelpers.js';
import prisma from '../../../shared/prisma.js';
import { IChangePassword } from './auth.interface.js';
import { sendEmail } from './sendResetMail.js';

const signUp = async (data: User) => {
  const res = await prisma.user.create({ data });

  console.log(res, 'this is res');

  const { email, role, id } = res;
  const accessToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logIn = async (LoginData: { email: string; password: string }) => {
  const { email, password } = LoginData;

  const user = await prisma.user.findMany();

  console.log(user, 'this is user');
  let isUserExist;
  isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(500, 'user not found');
  }
  const { role, id } = isUserExist;

  let isUserExistWithPassword;
  isUserExistWithPassword = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!isUserExistWithPassword) {
    throw new ApiError(500, 'password not matched');
  }

  const accessToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { email, password, id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<User> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(500, 'User does not exist');
  }
  // // checking old password
  if (isUserExist.password !== oldPassword) {
    throw new ApiError(500, 'Old Password is incorrect');
  }

  const result = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      password: newPassword,
    },
  });

  return result;
};

const forgotPass = async ({ email, role }: { email: string; role: string }) => {
  console.log(email, role);
  let isUserExist;

  isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  console.log(isUserExist, 'this is user');

  if (!isUserExist) {
    throw new ApiError(500, 'User does not exist!');
  }

  const passResetToken = await jwtHelpers.createResetToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as string,
    '50m',
  );

  const resetLink: string = config.resetlink + `?token=${passResetToken}`;
  console.log(resetLink);
  await sendEmail(
    isUserExist.email,
    `
      <div>
        <p>Hi, ${isUserExist.fullName}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `,
  );

  return {
    message: 'Check your email!',
  };
};

const me = async (userData: JwtPayload) => {
  const { email, role, id } = userData;

  let isUserExistWithPassword;
  isUserExistWithPassword = await prisma.user.findFirst({
    where: {
      email,
      role,
      id,
    },
  });

  if (!isUserExistWithPassword) {
    throw new ApiError(500, 'You are not authorized to access this resource!');
  }

  return isUserExistWithPassword;
};

const resetPassword = async (payload: {
  id: string;
  newPassword: string;
  role: string;
  token: string;
}) => {
  const { id, newPassword, token, role } = payload;

  let user;

  user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(500, 'User not found!');
  }

  const isVarified = await jwtHelpers.verifyToken(
    token,
    config.jwt.secret as string,
  );

  if (id !== isVarified.id || role !== isVarified.role) {
    throw new ApiError(401, 'Token is invalid or expired!');
  }

  // const password = await bcrypt.hash(newPassword, Number(config.bycrypt_salt_rounds));
  let result;

  result = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      password: newPassword,
    },
  });

  console.log(result, 'this is result');

  return result;
};

export const AuthService = {
  me,
  signUp,
  logIn,
  changePassword,
  forgotPass,
  resetPassword,
};
