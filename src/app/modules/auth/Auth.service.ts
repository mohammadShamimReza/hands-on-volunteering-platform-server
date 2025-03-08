/* eslint-disable no-unused-vars */

import { User } from '@prisma/client';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config/index.js';
import ApiError from '../../../errors/ApiError.js';
import { jwtHelpers } from '../../../helpers/jwtHelpers.js';
import prisma from '../../../shared/prisma.js';
import { IChangePassword } from './auth.interface.js';
import { sendEmail } from './sendResetMail.js';
const bcrypt = require('bcrypt');

const signUp = async (data: User) => {
  // hash password before saving
  const { password: newPassword } = data;

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds),
  );

  data.password = newHashedPassword;

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

const logIn = async (LoginData: { email: string; password: string }) => {
  const { email, password } = LoginData;

  let isUserExist;
  isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(500, 'user not found');
  }
  const match = await bcrypt.compare(password, isUserExist.password);
  console.log(match, 'this is match');
  if (!match) {
    throw new ApiError(500, 'Password is incorrect');
  }

  const { role, id } = isUserExist;

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
): Promise<{ message: string }> => {
  if (!user?.userId) {
    throw new ApiError(500, 'User is not authenticated');
  }

  const { oldPassword, newPassword } = payload;

  // ✅ 1. Check if the user exists (Selecting password field explicitly)
  const existingUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      password: true, // Prisma does not return password by default
    },
  });

  if (!existingUser || !existingUser.password) {
    throw new ApiError(400, 'User does not exist');
  }

  // ✅ 2. Check if the old password matches
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    existingUser.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(500, 'Old password is incorrect');
  }

  // ✅ 3. Hash new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds),
  ); // Adjust salt rounds

  // ✅ 4. Update the user's password in the database
  await prisma.user.update({
    where: { id: user.userId },
    data: {
      password: newHashedPassword,
    },
  });

  return {
    message: 'Password changed',
  };
};


const forgotPass = async ({ email }: { email: string }) => {
  console.log(email, 'this is email');
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

  console.log(passResetToken, 'this is passResetToken');

  const resetLink: string = config.resetlink + `?token=${passResetToken}`;

  console.log(isUserExist.email, 'this is user mail');

  const mailAnswer = await sendEmail(
    isUserExist.email,
    `
      <div>
        <p>Hi, ${isUserExist.fullName}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `,
  );

 console.log(mailAnswer, 'this is mailAnswer');

 return {
   message: mailAnswer,
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

  let verifiedToken;
  try {
    verifiedToken = await jwtHelpers.verifyToken(
      token,
      config.jwt.secret as string,
    );
  } catch (error) {
    throw new ApiError(500, 'Token is invalid or expired!');
  }

  if (id !== verifiedToken.id || role !== verifiedToken.role) {
    throw new ApiError(500, 'Token is invalid or expired!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds),
  );

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return updatedUser;
};

export const AuthService = {
  me,
  signUp,
  logIn,
  changePassword,
  forgotPass,
  resetPassword,
};
