const Statistic = require("../models/StatisticModel");

const createStatistic = (dataBody) => {
  return new Promise(async (resolve, reject) => {
    const { name, value, description } = dataBody;
    try {
      // Placeholder for creating a statistic
      reject({
        status: "ERROR",
        message: "unimplemented",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getStatisticById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Placeholder for retrieving a statistic by ID
      reject({
        status: "ERROR",
        message: "unimplemented",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateStatistic = (id, dataBody) => {
  return new Promise(async (resolve, reject) => {
    const { name, value, description } = dataBody;
    try {
      // Placeholder for updating a statistic by ID
      reject({
        status: "ERROR",
        message: "unimplemented",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteStatistic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Placeholder for deleting a statistic by ID
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
  createStatistic,
  getStatisticById,
  updateStatistic,
  deleteStatistic,
};
