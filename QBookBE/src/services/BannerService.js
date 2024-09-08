const Banner = require("../models/BannerModel");

const createBanner = (dataBody) => {
  return new Promise(async (resolve, reject) => {
    const { title, image, description } = dataBody;
    try {
      // Placeholder for creating a banner
      reject({
        status: "ERROR",
        message: "unimplemented",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getBannerById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Placeholder for retrieving a banner by ID
      reject({
        status: "ERROR",
        message: "unimplemented",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateBanner = (id, dataBody) => {
  return new Promise(async (resolve, reject) => {
    const { title, image, description } = dataBody;
    try {
      // Placeholder for updating a banner by ID
      reject({
        status: "ERROR",
        message: "unimplemented",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteBanner = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Placeholder for deleting a banner by ID
      reject({
        status: "ERROR",
        message: "unimplemented",
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
};
