import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string | number, // <-- Ensure it's explicitly string | number
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime as SignOptions['expiresIn'], // <-- Ensure the correct type
  });
};

const createResetToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string | number,
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: expireTime as SignOptions['expiresIn'],
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  createResetToken,
};
