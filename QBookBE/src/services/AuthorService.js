const Author = require("../models/AuthorModel");

const createAuthor = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, bio } = data;
    try {
      const checkAuthor = await Author.findOne({
        name,
      });

      if (checkAuthor !== null) {
        resolve({
          status: "ERROR",
          message: "The name author is definded!",
        });
      }

      const createNewAuthor = await Author.create({
        name,
        bio,
      });

      if (createNewAuthor) {
        resolve({
          status: "OK",
          message: "Create the author successfully!",
          data: createNewAuthor,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllAuthor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allAuthor = await Author.find();

      resolve({
        status: "OK",
        message: "Get all the author successfully!",
        data: allAuthor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAuthorById = (authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await Author.findOne({
        _id: authorId,
      });

      if (checkAuthor === null) {
        resolve({
          status: "ERROR",
          message: "The author is not defined!",
        });
      }

      const author = await Author.findById(authorId);

      resolve({
        status: "OK",
        message: "Get detail the author successfully!",
        data: author,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateAuthor = (authorId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await Author.findOne({
        _id: authorId,
      });

      if (checkAuthor === null) {
        resolve({
          status: "ERROR",
          message: "The author is not defined!",
        });
      }

      const dataUpdateAuthor = await Author.findByIdAndUpdate(authorId, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the author successfully!",
        data: dataUpdateAuthor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteAuthor = (authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await Author.findOne({
        _id: authorId,
      });

      if (checkAuthor === null) {
        resolve({
          status: "ERROR",
          message: "The author is not defined!",
        });
      }

      await Author.findByIdAndDelete(authorId);

      resolve({
        status: "OK",
        message: "Delete the author successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyAuthor = (authorIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Author.deleteMany({ _id: authorIds });

      resolve({
        status: "OK",
        message: "Delete many the author success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAuthor = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Author.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalAuthor = await Author.count();

      resolve({
        status: "OK",
        message: "Get authors successfully!",
        data: result,
        totalAuthor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAuthor,
  createAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  deleteManyAuthor,
};
