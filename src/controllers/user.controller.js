const Listing = require("../models/listing.model");
const User = require("../models/user.model");

const UpdateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    if (user) {
      const { password, ...rest } = user._doc;
      return res.status(200).json({
        success: true,
        data: rest,
      });
    }
  } catch (error) {
    next(error);
  }
};

const DeleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.user._id);
    if (deleteUser) {
      res.clearCookie("access_token");
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.user._id });
    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { UpdateUser, DeleteUser, getUserListings, getUser };
