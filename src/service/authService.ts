import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { User } from "../model/User";
import { RegisterBody, LoginParams } from "../interface";
import { BadRequestError } from "../errorHandler/BadRequestError";
import { validateRegisterData } from "../utils/validateRegisterData";
import { hashPassword } from "../utils/hashPassword";
import { isValidPassword } from "../utils/isValidPassword";

export const authService = {
  register: async (body: RegisterBody): Promise<void> => {
    const { email, login, password } = body;

    if (!email || !login || !password) {
      throw new BadRequestError("Invalid data passed");
    }

    const { valid, message: invalidMessage } = validateRegisterData(body);

    if (!valid) {
      throw new BadRequestError(invalidMessage);
    }

    const existedUser = await User.findOne({ $or: [{ email }, { login }] });

    if (existedUser) {
      throw new BadRequestError("Not unique data passed");
    }

    const user = new User({
      email,
      login,
      password: hashPassword(password),
    });

    user.save();
  },
  login: async (params: Partial<LoginParams>): Promise<{ token: string }> => {
    const { loginOrEmail, password } = params;

    if (!loginOrEmail || !password) {
      console.log("we are here");
      throw new BadRequestError("Some params were not passed");
    }

    const user = await User.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) {
      throw new BadRequestError("User does not exist");
    }

    const validPassword = isValidPassword(password, user.password);

    if (!validPassword) {
      throw new BadRequestError("Invalid data passed");
    }

    const payload: { id: Types.ObjectId } = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET as string);

    return { token };
  },
};
