const Publisher = require("../models/PublisherModel");

const createPublisher = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, address } = data;
    try {
      const checkPublisher = await Publisher.findOne({
        name: name,
      });

      if (checkPublisher !== null) {
        resolve({
          status: "ERROR",
          message: "The publisher's name already exists!",
        });
      }

      const createNewPublisher = await Publisher.create({
        name: name,
        address: address,
      });

      if (createNewPublisher) {
        resolve({
          status: "OK",
          message: "Create publisher success!",
          data: createNewPublisher,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllPublisher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allPublisher = await Publisher.find();
      resolve({
        status: "OK",
        message: "Get all publisher success!",
        data: allPublisher,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getPublisherById = (publisherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPublisher = await Publisher.findOne({
        _id: publisherId,
      });

      if (checkPublisher === null) {
        resolve({
          status: "ERROR",
          message: "The publisher is not defined!",
        });
      }

      const publisher = await Publisher.findById(publisherId);

      resolve({
        status: "OK",
        message: "Get detail publisher success!",
        data: publisher,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getPublisher = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Publisher.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalPublisher = await Publisher.count();

      resolve({
        status: "OK",
        message: "Get publishers successfully!",
        data: result,
        totalPublisher,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatePublisher = (publisherId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPublisher = await Publisher.findOne({
        _id: publisherId,
      });

      if (checkPublisher === null) {
        resolve({
          status: "ERROR",
          message: "The publisher is not defined!",
        });
      }

      const dataUpdatePublisher = await Publisher.findByIdAndUpdate(
        publisherId,
        data,
        { new: true }
      );

      resolve({
        status: "OK",
        message: "Update the publisher success!",
        data: dataUpdatePublisher,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deletePublisher = (publisherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPublisher = await Publisher.findOne({
        _id: publisherId,
      });

      if (checkPublisher === null) {
        resolve({
          status: "ERROR",
          message: "The publisher is not defined!",
        });
      }

      await Publisher.findByIdAndDelete(publisherId);

      resolve({
        status: "OK",
        message: "Delete the publisher success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyPublisher = (publisherIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Publisher.deleteMany({ _id: publisherIds });

      resolve({
        status: "OK",
        message: "Delete many the publisher success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createPublisher,
  getAllPublisher,
  updatePublisher,
  deletePublisher,
  deleteManyPublisher,
  getPublisher,
  getPublisherById,
};
