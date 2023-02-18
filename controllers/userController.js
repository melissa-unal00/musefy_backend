const userService = require("../services/userService");
const Joi = require("joi").extend(require("@joi/date"));

function validateRegister(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    birthday: Joi.date().format("YYYY-MM-DD").min("1900-01-01").required(),
  });
  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}
function validateForgotPassword(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
  });
  return schema.validate(user);
}

function validateResetPassword(user) {
  const schema = Joi.object({
    newPassword: Joi.string().min(5).max(255).required(),
    repeatNewPassword: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

function validateUpdateUserData(user) {
  const schema = Joi.object({
    lastName: Joi.string().min(2).max(50).required(),
    firstName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
  });
  return schema.validate(user);
}

exports.registerController = async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { firstName, lastName, email, username, password, gender, birthday } =
    req.body;
  try {
    const isSuccessful = await userService.registerService(
      firstName,
      lastName,
      email,
      username,
      password,
      gender,
      birthday
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    } else {
      return res.status(400).json({ message: "Can't create account" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error! Something went wrong!" });
  }
};

exports.loginController = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { username, password } = req.body;
  try {
    const isSuccessful = await userService.loginService(username, password);
    if (isSuccessful) {
      return res.status(200).json({ token: isSuccessful });
    } else {
      return res.status(400).json({ message: "Can't login" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error! Something went wrong!" });
  }
};

exports.profileController = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const isSuccessful = await userService.profileService(id);
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    } else {
      return res
        .status(400)
        .json({ message: "Can't display this information" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error! Something went wrong!" });
  }
};

exports.deleteRecordsController = async (req, res) => {
  try {
    const isSuccessful = await userService.deleteRecordsService();
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    } else {
      return res.status(400).json({ message: "Couldn't delete records" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error! Something went wrong!" });
  }
};

exports.forgotPasswordController = async (req, res) => {
  const { error } = validateForgotPassword(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { email } = req.body;
  try {
    const isSuccessful = await userService.forgotPasswordService(email);
    if (isSuccessful) {
      return res.status(200).json({ token: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't send email!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.resetPasswordController = async (req, res) => {
  const { error } = validateResetPassword(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { newPassword, repeatNewPassword } = req.body;
  const { resetToken } = req.params;
  try {
    const isSuccessful = await userService.resetPasswordService(
      resetToken,
      newPassword,
      repeatNewPassword
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't reset password!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.updateUserDataController = async (req, res) => {
  const { error } = validateUpdateUserData(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { firstName, lastName, email } = req.body;
  try {
    const isSuccessful = await userService.updateUserDataService(
      lastName,
      firstName,
      email
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't update data!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.uploadUserProfilePhotoController = async (req, res) => {
  const { username } = req.body;
  try {
    const isSuccessful = await userService.uploadUserProfilePhotoService(
      username
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't update data!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.userIssueController = async (req, res) => {
  const { email, issueType, input } = req.body;
  try {
    const isSuccessful = await userService.userIssueService(
      email,
      issueType,
      input
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't send email!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.getUsersController = async (req, res) => {
  try {
    const isSuccessful = await userService.getUsersService();
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't get users!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.userLocationController = async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  try {
    const isSuccessful = await userService.userLocationService(
      userId,
      latitude,
      longitude
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't save data!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.updateCurrentSongController = async (req, res) => {
  const { userId, currentSongId } = req.body;
  try {
    const isSuccessful = await userService.updateCurrentSongService(
      userId,
      currentSongId
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't update data!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};

exports.getSelectedUserController = async (req, res) => {
  const { userId } = req.body;
  try {
    const isSuccessful = await userService.getSelectedUserService(userId);
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't get data!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};
