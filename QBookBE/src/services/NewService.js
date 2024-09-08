const New = require("../models/NewModel");

const createNew = (dataBody) => {
  return new Promise(async (resolve, reject) => {
    const { title, image, ckeditor } = dataBody;
    try {
      const createNew = await New.create({
        title,
        image,
        ckeditor,
      });

      if (createNew) {
        resolve({
          status: "OK",
          message: "Create new successfully!",
          data: createNew,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getNew = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await New.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalNew = await New.count();

      resolve({
        status: "OK",
        message: "Get news successfully!",
        data: result,
        totalNew,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailNew = (newId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkNew = await New.findOne({
        _id: newId,
      });

      if (checkNew === null) {
        resolve({
          status: "ERROR",
          message: "The new is not defined!",
        });
      }

      const result = await New.findById(newId);

      resolve({
        status: "OK",
        message: "Get new detail successfully!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateNew = (newId, dataBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkNew = await New.findOne({
        _id: newId,
      });

      if (checkNew === null) {
        resolve({
          status: "ERROR",
          message: "The new is not defined!",
        });
      }

      const dataUpdateNew = await New.findByIdAndUpdate(newId, dataBody, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the new successfully!",
        data: dataUpdateNew,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteNew = (newId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkNew = await New.findOne({
        _id: newId,
      });

      if (checkNew === null) {
        resolve({
          status: "ERROR",
          message: "The new is not defined!",
        });
      }

      await New.findByIdAndDelete(newId);

      resolve({
        status: "OK",
        message: "Delete the new successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyNew = (newIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await New.deleteMany({ _id: newIds });

      resolve({
        status: "OK",
        message: "Delete many the new successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNew,
  getNew,
  getDetailNew,
  updateNew,
  deleteNew,
  deleteManyNew,
};
