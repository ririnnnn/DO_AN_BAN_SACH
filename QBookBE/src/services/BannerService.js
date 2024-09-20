const Banner = require("../models/BannerModel");

const createBanner = (dataBody) => {
  return new Promise(async (resolve, reject) => {
    const { desc, activeFrom, activeTo, image } = dataBody;
    try {
      console.log(desc, activeFrom, activeTo);
      const createBannerBanner = await Banner.create({
        desc,
        activeFrom,
        activeTo,
        image,
      });
      console.log("controller");
      if (createBannerBanner) {
        resolve({
          status: "OK",
          message: "Create the Banner successfully!",
          data: createBannerBanner,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getBannerDisplay = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      console.log("test_asdasda", today);
      const result = await Banner.find({
        activeFrom: { $lte: today },
        activeTo: { $gte: today },
      }).limit(limit);
      resolve({
        status: "OK",
        message: "Get all display Banner successfully!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getBanner = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Banner.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalBanner = await Banner.count();

      resolve({
        status: "OK",
        message: "Get news successfully!",
        data: result,
        totalBanner,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getBannerById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBanner = await Banner.findOne({
        _id: id,
      });

      if (checkBanner === null) {
        resolve({
          status: "ERROR",
          message: "The banner is not defined!",
        });
      }

      const banner = await Banner.findById(id);

      resolve({
        status: "OK",
        message: "Get detail the banner successfully!",
        data: banner,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateBanner = (id, dataBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBanner = await Banner.findOne({
        _id: id,
      });

      if (checkBanner === null) {
        resolve({
          status: "ERROR",
          message: "The Banner is not exist!",
        });
      }

      const dataUpdateBanner = await Banner.findByIdAndUpdate(id, dataBody, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the new successfully!",
        data: dataUpdateBanner,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteBanner = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBanner = await Banner.findOne({
        _id: id,
      });
      if (checkBanner === null) {
        resolve({
          status: "ERROR",
          message: "The Banner is not defined!",
        });
      }

      await Banner.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Delete the Banner successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
  getBannerDisplay,
  getBanner,
};
