import { AuthenticationError } from "../../utils/Errors.js";
import { userExists } from "../../../database/services/userExists.js";
import { addUser } from "../../../database/services/addUser.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../utils/jwtUtils.js";
import {
  addNewRefreshToken,
  findAndDelete,
  getNewRefreshToken,
} from "../../../database/refreshtoken/refreshTokenMethods.js";
import { getCurrentPregnancy } from "../../../database/pregnancy/pregnancyMethods.js";



async function signup(req, res, next) {
  try {
    const role = req.body.auth.role;
    const userexists = await userExists(role, req.body.email);
    if (userexists instanceof Error) return next(userexists);
    else if (userexists)
      return next(new AuthenticationError("user already exists"));

    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(req.body.password, salt);

    const addingUser = await addUser(role, req.body.email, passwordhash);
    if (addingUser instanceof Error) return next(addingUser);

    // Fetch the user again to get the id after insertion
    const newUser = await userExists(role, req.body.email);
    if (newUser instanceof Error) return next(newUser);

    const id = `${role}_id`;
    const refreshtoken = await generateRefreshToken(role, newUser[id]);
    if (refreshtoken instanceof Error) return next(refreshtoken);

    const addingtoken = await addNewRefreshToken(
      refreshtoken,
      role,
      newUser[id]
    );
    if (addingtoken instanceof Error) return next(addingtoken);

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      // secure: true,
      sameSite: "Strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res.send({ message: "user successfully registered", refreshtoken });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function signin(req, res, next) {
  try {
    const role = req.body.auth.role;
    console.log(role);

    const userexists = await userExists(role, req.body.email);
    if (userexists instanceof Error) return next(userexists);
    else if (!userexists)
      return next(new AuthenticationError("no such user exists"));

    const password = req.body.password;
    const compare = await bcrypt.compare(password, userexists.passwordhash);

    let msg = {};

    if (compare) {
      const id = `${role}_id`;
      const accesstoken = await generateAccessToken(role, userexists[id]);
      const refreshtoken = await generateRefreshToken(role, userexists[id]);
      if (accesstoken instanceof Error) return next(accesstoken);
      if (refreshtoken instanceof Error) return next(refreshtoken);
      const addingtoken = await addNewRefreshToken(
        refreshtoken,
        role,
        userexists[id]
      );
      let pregnancyID;
      if (role === "patient") {
        pregnancyID = await getCurrentPregnancy(userexists.patient_id);
      } else if (role === "doctor") {
        pregnancyID = null;
      }
      msg = {...msg, pregnancyID};
      if (addingtoken instanceof Error) return next(addingtoken);
      if (addingtoken == true) {
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          sameSite: "Strict",
          maxAge: 10 * 24 * 60 * 60 * 1000,
        });
        msg = {
          ...msg,
          message: "succesfully logged in",
          accesstoken,
          refreshtoken,
          patient_id: role === "patient" ? userexists[id] : undefined,
          doctor_id: role === "doctor" ? userexists[id] : undefined,
          pregnancyID: pregnancyID || null // Include pregnancyID in the response
        }
        return res.send(msg);
      }
    }
    return next(new AuthenticationError("invalid password"));
  } catch (error) {
    console.error("Error in signin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function logout(req, res, next) {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken) {
      return res.status(400).send({ message: "No refreshtoken found" });
    }
    const verify = await verifyToken(refreshtoken);
    if (verify instanceof Error) return next(verify);
    const role = verify.role;
    const id = verify.sub;
    const deleting = await findAndDelete(role, refreshtoken, id, 1);
    if (deleting instanceof Error) return next(deleting);
    if (deleting) {
      res.clearCookie("refreshtoken", {
        httpOnly: true,
        // secure: true,
        sameSite: "Strict",
      });
      return res.send({ message: "succesfully logged out" });
    }
    return res.status(500).send({ message: "could not logout" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function refresh(req, res, next) {
  try {
    let msg = {};
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken)
      return next(new AuthenticationError("No refreshtoken found"));
    const verify = await verifyToken(refreshtoken);
    if (verify instanceof Error) return next(verify);
    const role = verify.role;
    const id = verify.sub;

    const find = await findAndDelete(role, refreshtoken, id, 0);
    if (find instanceof Error) return next(find);
    if (find == "expired") {
      const newToken = await getNewRefreshToken(role, refreshtoken, id);
      let pregnancyID = null;
      try {
        console.log("Attempting to fetch pregnancy ID for user ID:", id); // Add logging
        pregnancyID = await getCurrentPregnancy(id);
        console.log("Pregnancy ID fetched during refresh:", pregnancyID); // Add logging
      } catch (error) {
        console.error("Error fetching pregnancy ID during refresh:", error); // Add error logging
      }
      msg = {...msg, pregnancyID};
      res.cookie("refreshtoken", newToken, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });
    }
    const accesstoken = await generateAccessToken(role, id);
    if (accesstoken instanceof Error) return next(accesstoken);
    msg = {...msg, accesstoken, "message":"success", pregnancyID: msg.pregnancyID || null}; // Include pregnancyID in the response, even if null
    return res.send(msg);
  } catch (error) {
    console.error("Error in refresh:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Only one export at the end!
export const AuthServices = { signup, signin, logout, refresh };
