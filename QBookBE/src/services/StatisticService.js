const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

const getStatistic = ({ groupBy, countBy, from, type }) => {
  return new Promise(async (resolve, reject) => {
    console.log("services");
    try {
      // Determine the date field to use for grouping
      const dateField = {
        day: { $dayOfMonth: "$createdAt" },
        week: { $week: "$createdAt" },
        month: { $month: "$createdAt" },
      }[groupBy] || { $dayOfMonth: "$createdAt" };

      // Determine the start date for filtering based on 'from'
      let startDate = new Date();
      switch (groupBy) {
        case "day":
          startDate.setDate(startDate.getDate() - from);
          break;
        case "week":
          startDate.setDate(startDate.getDate() - from * 7);
          break;
        case "month":
          startDate.setMonth(startDate.getMonth() - from);
          break;
      }

      // Define the aggregation pipeline
      const pipeline = [
        {
          $match: {
            createdAt: { $gte: startDate }, // Filter orders from the specified date
          },
        },
        {
          $unwind: "$orderItems", // Deconstruct the orderItems array to aggregate each item
        },
        {
          $lookup: {
            from: "products", // The collection name for products
            localField: "orderItems.product",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: "$productDetails", // Deconstruct the productDetails array
        },
        {
          $project: {
            createdAt: 1,
            orderItems: {
              amount: 1,
              discount: 1,
              price: 1,
            },
            productDetails: 1,
            user: 1,
          },
        },
        {
          $lookup: {
            from: "genres", // The collection name for products
            localField: "productDetails.genreId",
            foreignField: "_id",
            as: "genre",
          },
        },
        {
          $unwind: "$genre", // Deconstruct the productDetails array
        },
        {
          $group: {
            _id: {
              genre: "$genre",
              period: dateField,
            },
            count:
              countBy === "revenue"
                ? {
                    $sum: {
                      $multiply: ["$orderItems.amount", "$orderItems.price"],
                    },
                  } // Sum revenue by multiplying price by quantity
                : { $sum: "$orderItems.amount" }, // Sum number of items sold
          },
        },
        {
          $sort: { "_id.period": 1 }, // Sort by year and period
        },
        {
          $group: {
            _id:
              type == "table"
                ? {
                    // genre: "$_id.genre.name",
                    period: "$_id.period",
                  }
                : {
                    genre: "$_id.genre.name",
                    // period: dateField,
                  },
            statisticByPediod:
              type == "table"
                ? {
                    $push: {
                      genre: "$_id.genre.name",
                      count: "$count",
                    },
                  }
                : {
                    $push: {
                      period: "$_id.period",
                      count: "$count",
                    },
                  },
          },
        },
        // {
        //   $group: {
        //     _id: {
        //       category: "$genre", // Group by category name
        //       year: { $year: "$createdAt" }, // Group by year
        //       period: dateField, // Group by day, week, or month
        //     },
        //     count:
        //       countBy === "revenue"
        //         ? {
        //             $sum: {
        //               $multiply: ["$orderItems.amount", "$orderItems.price"],
        //             },
        //           } // Sum revenue by multiplying price by quantity
        //         : { $sum: "$orderItems.amount" }, // Sum number of items sold
        //   },
        // },
        // {
        //   $sort: { "_id.year": 1, "_id.period": 1 }, // Sort by year and period
        // },
      ];
      // Execute the aggregation
      const results = await mongoose.model("Order").aggregate(pipeline);
      resolve({
        status: "OK",
        message: "Get statistic success!",
        data: results,
      });
    } catch (e) {
      reject(e);
    }
  });
};
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
  getStatistic,
  createStatistic,
  getStatisticById,
  updateStatistic,
  deleteStatistic,
};
