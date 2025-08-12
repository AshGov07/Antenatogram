// import { AuthenticationError } from "../../utils/Errors.js";
// import { userExists } from "../../../database/services/userExists.js";
// import { addUser } from "../../../database/services/addUser.js";
// import bcrypt from "bcrypt";
// import {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyToken,
// } from "../../utils/jwtUtils.js";
// import {
//   addNewRefreshToken,
//   findAndDelete,
//   getNewRefreshToken,
// } from "../../../database/refreshtoken/refreshTokenMethods.js";
// import { getCurrentPregnancy } from "../../../database/pregnancy/pregnancyMethods.js";



// async function signup(req, res, next) {
//   try {
//     const role = req.body.auth.role;
//     const userexists = await userExists(role, req.body.email);
//     if (userexists instanceof Error) return next(userexists);
//     else if (userexists)
//       return next(new AuthenticationError("user already exists"));

//     const salt = await bcrypt.genSalt(10);
//     const passwordhash = await bcrypt.hash(req.body.password, salt);

//     const addingUser = await addUser(role, req.body.email, passwordhash);
//     if (addingUser instanceof Error) return next(addingUser);

//     // Fetch the user again to get the id after insertion
//     const newUser = await userExists(role, req.body.email);
//     if (newUser instanceof Error) return next(newUser);

//     const id = `${role}_id`;
//     const refreshtoken = await generateRefreshToken(role, newUser[id]);
//     if (refreshtoken instanceof Error) return next(refreshtoken);

//     const addingtoken = await addNewRefreshToken(
//       refreshtoken,
//       role,
//       newUser[id]
//     );
//     if (addingtoken instanceof Error) return next(addingtoken);

//     res.cookie("refreshtoken", refreshtoken, {
//       httpOnly: true,
//       // secure: true,
//       sameSite: "Strict",
//       maxAge: 10 * 24 * 60 * 60 * 1000,
//     });

//     return res.send({ message: "user successfully registered", refreshtoken });
//   } catch (error) {
//     console.error("Error in signup:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function signin(req, res, next) {
//   try {
//     const role = req.body.auth.role;
//     console.log(role);

//     const userexists = await userExists(role, req.body.email);
//     if (userexists instanceof Error) return next(userexists);
//     else if (!userexists)
//       return next(new AuthenticationError("no such user exists"));

//     const password = req.body.password;
//     const compare = await bcrypt.compare(password, userexists.passwordhash);

//     let msg = {};

//     if (compare) {
//       const id = `${role}_id`;
//       const accesstoken = await generateAccessToken(role, userexists[id]);
//       const refreshtoken = await generateRefreshToken(role, userexists[id]);
//       if (accesstoken instanceof Error) return next(accesstoken);
//       if (refreshtoken instanceof Error) return next(refreshtoken);
//       const addingtoken = await addNewRefreshToken(
//         refreshtoken,
//         role,
//         userexists[id]
//       );
//       const pregnancy_id = await getCurrentPregnancy(userexists.patient_id);
//       if(pregnancy_id) msg = {...msg, pregnancy_id};
//       if (addingtoken instanceof Error) return next(addingtoken);
//       if (addingtoken == true) {
//         res.cookie("refreshtoken", refreshtoken, {
//           httpOnly: true,
//           // secure: true,
//           sameSite: "Strict",
//           maxAge: 10 * 24 * 60 * 60 * 1000,
//         });
//         msg = {...msg,
//           message: "succesfully logged in",
//           accesstoken,
//           refreshtoken
//         }
//         return res.send(msg);
//       }
//     }
//     return next(new AuthenticationError("invalid password"));
//   } catch (error) {
//     console.error("Error in signin:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function logout(req, res, next) {
//   try {
//     const refreshtoken = req.cookies.refreshtoken;
//     if (!refreshtoken)
//       return next(new AuthenticationError("No refreshtoken found"));
//     const verify = await verifyToken(refreshtoken);
//     if (verify instanceof Error) return next(verify);
//     const role = verify.role;
//     const id = verify.sub;
//     const deleting = await findAndDelete(role, refreshtoken, id, 1);
//     if (deleting instanceof Error) return next(deleting);
//     if (deleting) {
//       res.clearCookie("refreshtoken", refreshtoken, {
//         httpOnly: true,
//         // secure: true,
//         sameSite: "Strict",
//       });
//       return res.send({ message: "succesfully logged out" });
//     }
//     return res.status(500).send({ message: "could not logout" });
//   } catch (error) {
//     console.error("Error in logout:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function refresh(req, res, next) {
//   try {
//     let msg = {};
//     const refreshtoken = req.cookies.refreshtoken;
//     if (!refreshtoken)
//       return next(new AuthenticationError("No refreshtoken found"));
//     const verify = await verifyToken(refreshtoken);
//     if (verify instanceof Error) return next(verify);
//     const role = verify.role;
//     const id = verify.sub;

//     const find = await findAndDelete(role, refreshtoken, id, 0);
//     if (find instanceof Error) return next(find);
//     if (find == "expired") {
//       const newToken = await getNewRefreshToken(role, refreshtoken, id);
//       // msg = {...msg, "refreshtoken": newToken};
//       const pregnancy_id = await getCurrentPregnancy(id) || "jello";
//       if(pregnancy_id) msg = {...msg, "pregnancyid": pregnancy_id};
//       res.cookie("refreshtoken", newToken, {
//         httpOnly: true,
//         // secure: true,
//         sameSite: "Strict",
//         maxAge: 10 * 24 * 60 * 60 * 1000,
//       });
//     }
//     const accesstoken = await generateAccessToken(role, id);
//     if (accesstoken instanceof Error) return next(accesstoken);
//     msg = {...msg, accesstoken, "message":"success"};
//     return res.send(msg);
//   } catch (error) {
//     console.error("Error in refresh:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// export const AuthServices = { signup, signin, logout, refresh };


// import { AuthenticationError } from "../../utils/Errors.js";
// import { userExists } from "../../../database/services/userExists.js";
// import { addUser } from "../../../database/services/addUser.js";
// import bcrypt from "bcrypt";
// import {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyToken,
// } from "../../utils/jwtUtils.js";
// import {
//   addNewRefreshToken,
//   findAndDelete,
//   getNewRefreshToken,
// } from "../../../database/refreshtoken/refreshTokenMethods.js";
// import { getCurrentPregnancy } from "../../../database/pregnancy/pregnancyMethods.js";

// async function signup(req, res, next) {
//   try {
//     const role = req.body.auth.role;
//     const userexists = await userExists(role, req.body.email);
//     if (userexists instanceof Error) return next(userexists);
//     else if (userexists)
//       return next(new AuthenticationError("User already exists"));

//     const salt = await bcrypt.genSalt(10);
//     const passwordhash = await bcrypt.hash(req.body.password, salt);

//     const addingUser = await addUser(role, req.body.email, passwordhash);
//     if (addingUser instanceof Error) return next(addingUser);

//     const newUser = await userExists(role, req.body.email);
//     if (newUser instanceof Error) return next(newUser);

//     const id = `${role}_id`;
//     const refreshtoken = await generateRefreshToken(role, newUser[id]);
//     if (refreshtoken instanceof Error) return next(refreshtoken);

//     const addingtoken = await addNewRefreshToken(refreshtoken, role, newUser[id]);
//     if (addingtoken instanceof Error) return next(addingtoken);

//     res.cookie("refreshtoken", refreshtoken, {
//       httpOnly: true,
//       sameSite: "Strict",
//       maxAge: 10 * 24 * 60 * 60 * 1000,
//     });

//     return res.send({ message: "User successfully registered", refreshtoken });
//   } catch (error) {
//     console.error("Error in signup:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function signin(req, res, next) {
//   try {
//     const role = req.body.auth.role;
//     const user = await userExists(role, req.body.email);
//     if (user instanceof Error) return next(user);
//     if (!user) return next(new AuthenticationError("No such user exists"));

//     const validPassword = await bcrypt.compare(req.body.password, user.passwordhash);
//     if (!validPassword) return next(new AuthenticationError("Invalid password"));

//     const id = `${role}_id`;
//     const userId = user[id];

//     const accesstoken = await generateAccessToken(role, userId);
//     const refreshtoken = await generateRefreshToken(role, userId);
//     if (accesstoken instanceof Error || refreshtoken instanceof Error)
//       return next(new AuthenticationError("Token generation failed"));

//     const added = await addNewRefreshToken(refreshtoken, role, userId);
//     if (added instanceof Error) return next(added);

//     const pregnancy_id = await getCurrentPregnancy(userId);

//     res.cookie("refreshtoken", refreshtoken, {
//       httpOnly: true,
//       sameSite: "Strict",
//       maxAge: 10 * 24 * 60 * 60 * 1000,
//     });

//     return res.send({
//       message: "Successfully logged in",
//       accesstoken,
//       refreshtoken,
//       pregnancyid: pregnancy_id || null
//     });

//   } catch (error) {
//     console.error("Error in signin:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function logout(req, res, next) {
//   try {
//     const refreshtoken = req.cookies.refreshtoken;
//     if (!refreshtoken)
//       return next(new AuthenticationError("No refreshtoken found"));

//     const verify = await verifyToken(refreshtoken);
//     if (verify instanceof Error) return next(verify);

//     const { role, sub: id } = verify;

//     const deleted = await findAndDelete(role, refreshtoken, id, 1);
//     if (deleted instanceof Error) return next(deleted);

//     if (deleted) {
//       res.clearCookie("refreshtoken", {
//         httpOnly: true,
//         sameSite: "Strict",
//       });
//       return res.send({ message: "Successfully logged out" });
//     }

//     return res.status(500).send({ message: "Could not logout" });
//   } catch (error) {
//     console.error("Error in logout:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function refresh(req, res, next) {
//   try {
//     const refreshtoken = req.cookies.refreshtoken;
//     if (!refreshtoken)
//       return next(new AuthenticationError("No refreshtoken found"));

//     const verify = await verifyToken(refreshtoken);
//     if (verify instanceof Error) return next(verify);

//     const { role, sub: id } = verify;

//     const result = await findAndDelete(role, refreshtoken, id, 0);
//     if (result instanceof Error) return next(result);

//     let newRefreshToken = refreshtoken;
//     if (result === "expired") {
//       newRefreshToken = await getNewRefreshToken(role, refreshtoken, id);
//       res.cookie("refreshtoken", newRefreshToken, {
//         httpOnly: true,
//         sameSite: "Strict",
//         maxAge: 10 * 24 * 60 * 60 * 1000,
//       });
//     }

//     const accesstoken = await generateAccessToken(role, id);
//     if (accesstoken instanceof Error) return next(accesstoken);

//     const pregnancy_id = await getCurrentPregnancy(id);

//     return res.send({
//       accesstoken,
//       pregnancyid: pregnancy_id || null,
//       message: "success",
//     });
//   } catch (error) {
//     console.error("Error in refresh:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// export const AuthServices = { signup, signin, logout, refresh };



// import { AuthenticationError } from "../../utils/Errors.js";
// import { userExists } from "../../../database/services/userExists.js";
// import { addUser } from "../../../database/services/addUser.js";
// import bcrypt from "bcrypt";
// import { bufferToUuid } from "../../../utils/uuidHelpers.js";
// import { verifyToken } from "../../../utils/verifyToken.js";
// import {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyToken,
// } from "../../utils/jwtUtils.js";
// import {
//   addNewRefreshToken,
//   findAndDelete,
//   getNewRefreshToken,
// } from "../../../database/refreshtoken/refreshTokenMethods.js";
// import { getCurrentPregnancy } from "../../../database/pregnancy/pregnancyMethods.js";

// async function signup(req, res, next) {
//   try {
//     const role = req.body.auth.role;
//     const userexists = await userExists(role, req.body.email);
//     if (userexists instanceof Error) return next(userexists);
//     else if (userexists)
//       return next(new AuthenticationError("User already exists"));

//     const salt = await bcrypt.genSalt(10);
//     const passwordhash = await bcrypt.hash(req.body.password, salt);

//     const addingUser = await addUser(role, req.body.email, passwordhash);
//     if (addingUser instanceof Error) return next(addingUser);

//     const newUser = await userExists(role, req.body.email);
//     if (newUser instanceof Error) return next(newUser);

//     const id = `${role}_id`;
//     const refreshtoken = await generateRefreshToken(role, newUser[id]);
//     if (refreshtoken instanceof Error) return next(refreshtoken);

//     const addingtoken = await addNewRefreshToken(refreshtoken, role, newUser[id]);
//     if (addingtoken instanceof Error) return next(addingtoken);

//     res.cookie("refreshtoken", refreshtoken, {
//       httpOnly: true,
//       sameSite: "Strict",
//       maxAge: 10 * 24 * 60 * 60 * 1000,
//     });

//     return res.send({ message: "User successfully registered", refreshtoken });
//   } catch (error) {
//     console.error("Error in signup:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function signin(req, res, next) {
//   try {
//     const role = req.body.auth.role;
//     const user = await userExists(role, req.body.email);
//     if (user instanceof Error) return next(user);
//     if (!user) return next(new AuthenticationError("No such user exists"));

//     const validPassword = await bcrypt.compare(req.body.password, user.passwordhash);
//     if (!validPassword) return next(new AuthenticationError("Invalid password"));

//     const idKey = `${role}_id`;
//     const patientId = user[idKey];

//     const accesstoken = await generateAccessToken(role, patientId);
//     const refreshtoken = await generateRefreshToken(role, patientId);
//     if (accesstoken instanceof Error || refreshtoken instanceof Error)
//       return next(new AuthenticationError("Token generation failed"));

//     const added = await addNewRefreshToken(refreshtoken, role, patientId);
//     if (added instanceof Error) return next(added);

//     const pregnancyObj = await getCurrentPregnancy(patientId);
//     const pregnancyid = pregnancyObj?.pregnancyID ?? null;

//     res.cookie("refreshtoken", refreshtoken, {
//       httpOnly: true,
//       sameSite: "Strict",
//       maxAge: 10 * 24 * 60 * 60 * 1000,
//     });

//     return res.send({
//       message: "Successfully logged in",
//       accesstoken,
//       refreshtoken,
//       pregnancyid, // Final consistent casing
//     });

//   } catch (error) {
//     console.error("❌ Error in signin:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }


// async function logout(req, res, next) {
//   try {
//     const refreshtoken = req.cookies.refreshtoken;
//     if (!refreshtoken)
//       return next(new AuthenticationError("No refreshtoken found"));

//     const verify = await verifyToken(refreshtoken);
//     if (verify instanceof Error) return next(verify);

//     const { role, sub: id } = verify;

//     const deleted = await findAndDelete(role, refreshtoken, id, 1);
//     if (deleted instanceof Error) return next(deleted);

//     if (deleted) {
//       res.clearCookie("refreshtoken", {
//         httpOnly: true,
//         sameSite: "Strict",
//       });
//       return res.send({ message: "Successfully logged out" });
//     }

//     return res.status(500).send({ message: "Could not logout" });
//   } catch (error) {
//     console.error("Error in logout:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function refresh(req, res, next) {
//   try {
//     const refreshtoken = req.cookies.refreshtoken;
//     if (!refreshtoken)
//       return next(new AuthenticationError("No refreshtoken found"));

//     const verify = await verifyToken(refreshtoken);
//     if (verify instanceof Error) return next(verify);

//     const { role, sub: id } = verify;

//     const result = await findAndDelete(role, refreshtoken, id, 0);
//     if (result instanceof Error) return next(result);

//     let newRefreshToken = refreshtoken;
//     if (result === "expired") {
//       newRefreshToken = await getNewRefreshToken(role, refreshtoken, id);
//       res.cookie("refreshtoken", newRefreshToken, {
//         httpOnly: true,
//         sameSite: "Strict",
//         maxAge: 10 * 24 * 60 * 60 * 1000,
//       });
//     }

//     const accesstoken = await generateAccessToken(role, id);
//     if (accesstoken instanceof Error) return next(accesstoken);

//     const pregnancyObj = await getCurrentPregnancy(id);
//     const pregnancyid = pregnancyObj?.pregnancyID ?? null;

//     return res.send({
//       accesstoken,
//       pregnancyid:pregnancyObj?.pregnancyID ?? null,
//       message: "success",
//     });
//   } catch (error) {
//     console.error("Error in refresh:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// export const AuthServices = { signup, signin, logout, refresh };



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
import { bufferToUuid } from "../../utils/bufferToUuid.js"; // ✅ make sure this exists

async function signup(req, res, next) {
  try {
    const role = req.body.auth.role;
    const userexists = await userExists(role, req.body.email);
    if (userexists instanceof Error) return next(userexists);
    else if (userexists)
      return next(new AuthenticationError("User already exists"));

    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(req.body.password, salt);

    const addingUser = await addUser(role, req.body.email, passwordhash);
    if (addingUser instanceof Error) return next(addingUser);

    const newUser = await userExists(role, req.body.email);
    if (newUser instanceof Error) return next(newUser);

    const idKey = `${role}_id`;
    const idBuffer = newUser[idKey]; // ✅ Use newUser here!
    const userId = bufferToUuid(idBuffer); // ✅ Convert to UUID

    const refreshtoken = await generateRefreshToken(role, userId);
    if (refreshtoken instanceof Error) return next(refreshtoken);

    const addingtoken = await addNewRefreshToken(refreshtoken, role, userId);
    if (addingtoken instanceof Error) return next(addingtoken);

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res.send({ message: "User successfully registered", refreshtoken });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


async function signin(req, res, next) {
  try {
    const role = req.body.auth.role;
    const user = await userExists(role, req.body.email);
    if (user instanceof Error) return next(user);
    if (!user) return next(new AuthenticationError("No such user exists"));

    const validPassword = await bcrypt.compare(req.body.password, user.passwordhash);
    if (!validPassword) return next(new AuthenticationError("Invalid password"));

    const idKey = `${role}_id`;
    const idBuffer = user[idKey];
    console.log("🐛 Raw ID buffer from DB:", user[idKey]);
    const userId = bufferToUuid(idBuffer); // ✅ Properly decode buffer to UUID string
    
    console.log("📥 Converted to UUID:", userId);

    console.log("✅ Checking for patientID:", userId); // ✅ Should print valid UUID

    const accesstoken = await generateAccessToken(role, userId);
    const refreshtoken = await generateRefreshToken(role, userId);
    if (accesstoken instanceof Error || refreshtoken instanceof Error)
      return next(new AuthenticationError("Token generation failed"));

    const added = await addNewRefreshToken(refreshtoken, role, userId);
    if (added instanceof Error) return next(added);

    const pregnancyObj = await getCurrentPregnancy(userId); // ✅ Pass UUID string
    console.log("🧬 Pregnancy object from getCurrentPregnancy:", pregnancyObj);

    const pregnancyid = pregnancyObj?.pregnancy_id ?? null; // ✅ snake_case

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res.send({
      message: "Successfully logged in",
      accesstoken,
      refreshtoken,
      pregnancyid
    });

  } catch (error) {
    console.error("Error in signin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function logout(req, res, next) {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken)
      return next(new AuthenticationError("No refreshtoken found"));

    const verify = await verifyToken(refreshtoken);
    if (verify instanceof Error) return next(verify);

    const { role, sub } = verify;

    const deleted = await findAndDelete(role, refreshtoken, sub, 1);
    if (deleted instanceof Error) return next(deleted);

    if (deleted) {
      res.clearCookie("refreshtoken", {
        httpOnly: true,
        sameSite: "Strict",
      });
      return res.send({ message: "Successfully logged out" });
    }

    return res.status(500).send({ message: "Could not logout" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function refresh(req, res, next) {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken)
      return next(new AuthenticationError("No refreshtoken found"));

    const verify = await verifyToken(refreshtoken);
    if (verify instanceof Error) return next(verify);

    const { role, sub: id } = verify;

    const result = await findAndDelete(role, refreshtoken, id, 0);
    if (result instanceof Error) return next(result);

    let newRefreshToken = refreshtoken;
    if (result === "expired") {
      newRefreshToken = await getNewRefreshToken(role, refreshtoken, id);
      res.cookie("refreshtoken", newRefreshToken, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });
    }

    const accesstoken = await generateAccessToken(role, id);
    if (accesstoken instanceof Error) return next(accesstoken);

    const userId = typeof id === "string" ? id : bufferToUuid(id); // Handle both Buffer or UUID string
    const pregnancyObj = await getCurrentPregnancy(id);
    const pregnancyid = pregnancyObj?.pregnancy_id ?? null;

    return res.send({
      accesstoken,
      pregnancyid,
      message: "success",
    });
  } catch (error) {
    console.error("Error in refresh:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const AuthServices = { signup, signin, logout, refresh };
