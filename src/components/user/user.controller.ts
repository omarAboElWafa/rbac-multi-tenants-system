import { Request, Response } from "express";
import UserService from "./user.service";
import TenantService from "../tenant/tenant.service";
import * as helpers from "../../utils/cryptoHelpers";
// import { handleValidationError } from "../../utils/loggers";
import { IUserInputDTO } from "@/contracts/user";
import {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY_FOR_CACHE,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_FOR_CACHE,
} from "../../config/env";

class UserController {
  userService: UserService;
  tenantService: TenantService;
  constructor(userService: UserService, tenantService: TenantService) {
    this.userService = userService;
    this.tenantService = tenantService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const user: IUserInputDTO = {
        name,
        email,
        password,
      };
      const existingUser = await this.userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).send({ message: "User already exists" });
      }
      return res.status(201).send(await this.userService.addUser(user));
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return res
          .status(401)
          .send({ message: "This email is not registered" });
      }
      const isMatch = await helpers.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Wrong password" });
      }

      const accessToken = await helpers.generateAuthToken(
        user,
        JWT_SECRET,
        ACCESS_TOKEN_EXPIRY,
      );
      const refreshToken = await helpers.generateAuthToken(
        user,
        JWT_SECRET,
        REFRESH_TOKEN_EXPIRY,
      );

      // Check if the user's refresh token is blacklisted
      const isBlacklisted = await this.userService.isRefreshTokenBlacklisted(
        user.id,
      );
      const whiteListed = isBlacklisted
        ? await this.userService.whitelistRefreshToken(user.id)
        : true;

      if (!whiteListed) {
        return res.status(500).send({ message: "Something went wrong" });
      }

      // Store the refresh token in redis
      const refreshStored = this.userService.storeToken(
        `refresh-${user.id}`,
        refreshToken,
        REFRESH_TOKEN_EXPIRY_FOR_CACHE,
      );
      const accessStored = this.userService.storeToken(
        `access-${user.id}`,
        accessToken,
        ACCESS_TOKEN_EXPIRY_FOR_CACHE,
      );
      if (!refreshStored || !accessStored) {
        return res.status(500).send({ message: "Something went wrong" });
      }
      return res.status(200).send({ accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      if (!userId || userId === "") {
        return res.status(401).send({ message: "Unauthorized User" });
      }
      // check if the refresh token is blacklisted
      const isBlacklisted =
        await this.userService.isRefreshTokenBlacklisted(userId);
      if (isBlacklisted) {
        return res.status(403).send({ message: "Blacklisted user token" });
      }
      // blacklist the user session and store that on redis
      const blacklisted = await this.userService.blacklistRefreshToken(userId);
      const revocateAccessToken = await this.userService.deleteToken(
        `access-${userId}`,
      );

      if (!blacklisted || !revocateAccessToken) {
        return res.status(500).send({ message: "Something went wrong" });
      }
      return res.status(200).send({ message: "Logout successful" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };

  me = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const user = await this.userService.findUserById(parseInt(userId));
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };

  assignToTenant = async (req: Request, res: Response) => {
    try {
      const { id, tenantId } = req.params;
      const tenant = await this.tenantService.getTenant(parseInt(tenantId));
      if (!tenant) {
        return res.status(404).send({ message: "Invalid tenant" });
      }
      const assigned = await this.userService.assignToTenant(
        parseInt(id),
        parseInt(tenantId),
      );
      if (!assigned) {
        return res
          .status(500)
          .send({ message: "Something went wrong when assigning user" });
      }
      return res
        .status(200)
        .send({ message: "User assigned to tenant successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };

  grantUserPermission = async (req: Request, res: Response) => {
    try {
      const { userId, permissionName } = req.body;
      await this.userService.grantUserPermission(
        parseInt(userId),
        permissionName,
      );
      return res
        .status(200)
        .send({ message: "Permission granted to user successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Something went wrong when granting permission",
        error,
      });
    }
  };

  // updateProfile = async (req: Request, res: Response) => {
  //   try {
  //     const { userID, isAdmin, qualified, verified } = req.body;
  //     if (isAdmin || qualified || verified) {
  //       return res.status(401).send({ message: "Unauthorized user" });
  //     }
  //     const user = await this.userService.findUserById(userID);
  //     if (!user) {
  //       return res.status(404).send({ message: "Invalid user" });
  //     }
  //     const updatedUser = await this.userService.updateUser(userID, req.body);
  //     if (!updatedUser) {
  //       return res.status(500).send({ message: "Something went wrong" });
  //     }
  //     return res.status(200).send(updatedUser);
  //   } catch (error) {
  //     return res.status(400).send(handleValidationError(error));
  //   }
  // };

  // refreshToken = async (req: Request, res: Response) => {
  //   try {
  //     const { clientRefreshToken } = req.body;
  //     if (!clientRefreshToken) {
  //       return res.status(401).send({ message: "Invalid refresh token" });
  //     }

  //     // verify refresh token in redis
  //     const storedToken = await this.userService.findToken(req.body.userID);
  //     if (storedToken !== clientRefreshToken) {
  //       return res.status(401).send({ message: "Invalid refresh token" });
  //     }

  //     // check if the refresh token is blacklisted
  //     const isBlacklisted = await this.userService.isRefreshTokenBlacklisted(
  //       req.body.userID,
  //     );
  //     if (isBlacklisted) {
  //       return res.status(403).send({ message: "Blacklisted refresh token" });
  //     }

  //     // generate new access token
  //     const user = await this.userService.findUserById(req.body.userID, true);
  //     if (!user) {
  //       return res.status(404).send({ message: "User not found" });
  //     }
  //     const newAccessToken = await helpers.generateAuthToken(
  //       user,
  //       JWT_SECRET,
  //       ACCESS_TOKEN_EXPIRY,
  //     );
  //     const accessStored = this.userService.storeToken(
  //       `access-${user.id}`,
  //       newAccessToken,
  //       REFRESH_TOKEN_EXPIRY_FOR_CACHE,
  //     );
  //     if (!accessStored) {
  //       return res.status(500).send({ message: "Something went wrong" });
  //     }
  //     return res.status(200).send({ accessToken: newAccessToken });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).send(handleValidationError(error));
  //   }
  // };

  // forgotPassword = async (req: Request, res: Response) => {
  //   try {
  //     const { email } = req.body;
  //     const user = await this.userService.findUserByEmail(email);
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .send({ message: "No user found with this email" });
  //     }
  //     const otp = helpers.generateOTP();
  //     const otpStored = this.userService.storeToken(
  //       `reset-password-${user.id}`,
  //       otp,
  //       RESET_PASSWORD_TOKEN_EXPIRY_FOR_CACHE,
  //     );
  //     if (!otp || !otpStored) {
  //       return res
  //         .status(500)
  //         .send({ message: "Something went wrong, Internal server error" });
  //     }
  //     const mailText = `
  //           <!DOCTYPE html>
  //           <html lang="ar">
  //           <head>
  //               <meta charset="UTF-8">
  //               <title>Change Password</title>
  //           </head>
  //           <div dir="rtl" style="text-align: center;">
  //               <p>Hello ${user.firstName},</p>
  //               <p>You have requested a password reset for your communication application. To complete the process, enter the following One-Time Password (OTP) on the password reset page:</p>
  //               <p style="text-align: center; font-size: 18px;"><strong>${otp}</strong></p>
  //               <span>The one-time password is valid for 10 minutes. If not used within that time, you will need to request a new one.</span>
  //               <p>If you did not request a password reset, please ignore this email.</p>
  //               <p>Thank you,</p>
  //               <p>Your Communication App Team</p>
  //               <p>If you need assistance, please email us at: <a href="mailto:info@example.com">info@example.com</a></p>
  //           </div>
  //           </html>
  //           `;
  //     const emailSent = await helpers.sendGenericEmail(
  //       user.email,
  //       "Change Password",
  //       mailText,
  //     );
  //     if (!emailSent) {
  //       return res.status(500).send({ message: "Internal server error" });
  //     }
  //     return res.status(200).send({ message: "OTP sent successfully" });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).send(handleValidationError(error));
  //   }
  // };

  // resetPassword = async (req: Request, res: Response) => {
  //   try {
  //     const { otp, email } = req.body;
  //     const user = await this.userService.findUserByEmail(email);
  //     if (!user) {
  //       return res.status(404).send({ message: "Invalid user" });
  //     }
  //     const retrievedOtp = await this.userService.findToken(
  //       `reset-password-${user.id}`,
  //     );
  //     if (!retrievedOtp) {
  //       return res.status(401).send({ message: "OTP expired" });
  //     }
  //     if (retrievedOtp !== otp) {
  //       return res.status(401).send({ message: "Invalid OTP" });
  //     }
  //     const accessToken = await helpers.generateAuthToken(
  //       user,
  //       JWT_SECRET,
  //       ACCESS_TOKEN_EXPIRY,
  //     );
  //     const accessStored = this.userService.storeToken(
  //       `access-${user.id}`,
  //       accessToken,
  //       ACCESS_TOKEN_EXPIRY_FOR_CACHE,
  //     );
  //     if (!accessStored) {
  //       return res.status(500).send({ message: "Something went wrong" });
  //     }
  //     return res.status(200).send({ accessToken: accessToken });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).send(handleValidationError(error));
  //   }
  // };

  // changePassword = async (req: Request, res: Response) => {
  //   try {
  //     const { userID, oldPassword, newPassword } = req.body;
  //     const user = await this.userService.findUserById(userID, true);
  //     if (!user) {
  //       return res.status(404).send({ message: "Invalid user" });
  //     }
  //     const isMatch = await helpers.comparePassword(oldPassword, user.password);
  //     if (!isMatch) {
  //       return res.status(401).send({ message: "Wrong password" });
  //     }
  //     const userInput: Object = { password: newPassword };
  //     const updatedUser = await this.userService.updateUser(userID, userInput);
  //     if (!updatedUser) {
  //       return res.status(500).send({ message: "Something went wrong" });
  //     }
  //     return res.status(200).send({ message: "Password updated successfully" });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).send(handleValidationError(error));
  //   }
  // };
}

export default UserController;
