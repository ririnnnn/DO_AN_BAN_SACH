const Product = require("../models/ProductModel");

const createProduct = (reqBody) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      price,
      countInStock,
      discount,
      description,
      pageCount,
      format,
      weight,
      authorId,
      genreId,
      publisherId,
    } = reqBody;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({
          status: "ERROR",
          message: "The book title already exists!",
        });
      } else {
        const newProduct = await Product.create({
          name,
          image,
          price,
          countInStock,
          discount,
          description,
          pageCount,
          format,
          weight,
          authorId,
          genreId,
          publisherId,
        });

        if (newProduct) {
          resolve({
            status: "OK",
            message: "Create new book successfully!",
            data: newProduct,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId,
      });

      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product is not definded!",
        });
      } else {
        const result = await Product.findByIdAndUpdate(productId, data, {
          new: true,
        });
        resolve({
          status: "OK",
          message: "Update the product successfully!",
          data: result,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product not found!",
        });
      } else {
        const product = await Product.findById(id);

        resolve({
          status: "OK",
          message: "Get detail the product successfully!",
          data: product,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId,
      });

      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product is not definded!",
        });
      } else {
        await Product.findByIdAndDelete(productId);
        resolve({
          status: "OK",
          message: "Delete the product successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter, publisher, rating) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrPublisher = null;
      let totalProduct = null;

      if (publisher) {
        arrPublisher = publisher[1].split(",");
      }

      // Trường hợp có filter và sort
      if (filter && sort) {
        // Trường hợp có filter, sort và publisher
        if (publisher) {
          // Trường hợp có filter, sort, publisher và rating
          if (rating) {
            let ratingQuery = {};
            if (rating === 3) {
              ratingQuery = { averageRating: { $gte: 3 } };
            } else if (rating === 4) {
              ratingQuery = { averageRating: { $gte: 4 } };
            } else if (rating === 5) {
              ratingQuery = { averageRating: 5 };
            }
            const result = await Product.find({
              ...ratingQuery,
              [filter[0]]: filter[1],
              [publisher[0]]: arrPublisher,
            })
              .skip((page - 1) * limit)
              .limit(limit)
              .sort({ price: sort });

            totalProduct = await Product.count({
              ...ratingQuery,
              [filter[0]]: filter[1],
              [publisher[0]]: arrPublisher,
            });

            resolve({
              status: "OK",
              message: "Get products success!",
              totalProduct,
              data: result,
            });
          }

          const result = await Product.find({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ price: sort });

          totalProduct = await Product.count({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          });

          resolve({
            status: "OK",
            message: "Get products success!",
            totalProduct,
            data: result,
          });
        }

        const result = await Product.find({
          [filter[0]]: filter[1],
        })
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ price: sort });

        totalProduct = await Product.count({
          [filter[0]]: filter[1],
        });

        resolve({
          status: "OK",
          message: "Get products success!",
          totalProduct,
          data: result,
        });
      }

      // Trường hợp có filter và publisher
      if (filter && publisher) {
        // Trường hợp có filter, publisher và rating
        if (rating) {
          let ratingQuery = {};
          if (rating === 3) {
            ratingQuery = { averageRating: { $gte: 3 } };
          } else if (rating === 4) {
            ratingQuery = { averageRating: { $gte: 4 } };
          } else if (rating === 5) {
            ratingQuery = { averageRating: 5 };
          }

          const result = await Product.find({
            ...ratingQuery,
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .skip((page - 1) * limit)
            .limit(limit);

          totalProduct = await Product.count({
            ...ratingQuery,
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          });

          resolve({
            status: "OK",
            message: "Get products success!",
            totalProduct,
            data: result,
          });
        } else {
          const result = await Product.find({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .skip((page - 1) * limit)
            .limit(limit);

          totalProduct = await Product.count({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          });

          resolve({
            status: "OK",
            message: "Get products success!",
            totalProduct,
            data: result,
          });
        }
      }

      if (limit) {
        const result = await Product.find()
          .skip((page - 1) * limit)
          .limit(limit);

        totalProduct = await Product.count();

        resolve({
          status: "OK",
          message: "Get products success!",
          totalProduct,
          data: result,
        });
      }

      const product = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit);

      totalProduct = await Product.count();

      resolve({
        status: "OK",
        message: "Get products success!",
        totalProduct,
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete many product success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const typeProduct = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Get all type product success",
        data: typeProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCountProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Product.count();
      resolve({
        status: "OK",
        message: "Get count product success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProductAuthor = (limit, page, sort, filter, publisher, rating) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrPublisher;
      const totalProduct = await Product.count();

      if (publisher) {
        arrPublisher = publisher[1].split(",");
      }

      // Trường hợp có filter và sort
      if (filter && sort) {
        // Trường hợp có filter, sort và publisher
        if (publisher) {
          // Trường hợp có filter, sort, publisher và rating
          if (rating) {
            let ratingQuery = {};
            if (rating === 3) {
              ratingQuery = { averageRating: { $gte: 3 } };
            } else if (rating === 4) {
              ratingQuery = { averageRating: { $gte: 4 } };
            } else if (rating === 5) {
              ratingQuery = { averageRating: 5 };
            }
            const allProductRating = await Product.find({
              ...ratingQuery,
              [filter[0]]: filter[1],
              [publisher[0]]: arrPublisher,
            })
              .limit(limit)
              .skip(page * limit)
              .sort({ price: sort });
            resolve({
              status: "OK",
              message: "SUCCESS",
              totalPage: Math.ceil(totalProduct / limit),
              pageCurrent: page + 1,
              totalProduct: totalProduct,
              data: allProductRating,
            });
          }
          const allProductFilter = await Product.find({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .limit(limit)
            .skip(page * limit)
            .sort({ price: sort });
          resolve({
            status: "OK",
            message: "SUCCESS",
            totalPage: Math.ceil(totalProduct / limit),
            pageCurrent: page + 1,
            totalProduct: totalProduct,
            data: allProductFilter,
          });
        }

        const allProductSort = await Product.find({
          [filter[0]]: filter[1],
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ price: sort });
        resolve({
          status: "OK",
          message: "SUCCESS",
          totalPage: Math.ceil(totalProduct / limit),
          pageCurrent: page + 1,
          totalProduct: totalProduct,
          data: allProductSort,
        });
      }

      // Trường hợp có filter và publisher
      if (filter && publisher) {
        if (rating) {
          let ratingQuery = {};
          if (rating === 3) {
            ratingQuery = { averageRating: { $gte: 3 } };
          } else if (rating === 4) {
            ratingQuery = { averageRating: { $gte: 4 } };
          } else if (rating === 5) {
            ratingQuery = { averageRating: 5 };
          }
          const allProductRating = await Product.find({
            ...ratingQuery,
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .limit(limit)
            .skip(page * limit);
          resolve({
            status: "OK",
            message: "SUCCESS",
            totalPage: Math.ceil(totalProduct / limit),
            pageCurrent: page + 1,
            totalProduct: totalProduct,
            data: allProductRating,
          });
        } else {
          const allProductFilter = await Product.find({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .limit(limit)
            .skip(page * limit);
          resolve({
            status: "OK",
            message: "SUCCESS",
            totalPage: Math.ceil(totalProduct / limit),
            pageCurrent: page + 1,
            totalProduct: totalProduct,
            data: allProductFilter,
          });
        }
      }

      if (filter) {
        const allProductFilter = await Product.find({
          [filter[0]]: filter[1],
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "SUCCESS",
          totalPage: Math.ceil(totalProduct / limit),
          pageCurrent: page + 1,
          totalProduct: totalProduct,
          data: allProductFilter,
        });
      }

      if (limit) {
        const product = await Product.find()
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "SUCCESS",
          totalPage: Math.ceil(totalProduct / limit),
          pageCurrent: page + 1,
          totalProduct: totalProduct,
          data: product,
        });
      }

      const product = await Product.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "OK",
        message: "SUCCESS",
        totalPage: Math.ceil(totalProduct / limit),
        pageCurrent: page + 1,
        totalProduct: totalProduct,
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const searchProduct = (q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataProduct = await Product.find({
        name: { $regex: new RegExp(q, "i") },
      });

      resolve({
        status: "OK",
        message: "Gel all products successfully!",
        data: dataProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const ratingProduct = (productId, userId, rating) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(productId);

      if (!product) {
        resolve({
          status: "ERROR",
          message: "Product not found!",
        });
      }

      const findIndex = product.ratings.findIndex(
        (item) => item.userId.toString() === userId.toString()
      );

      if (findIndex !== -1) {
        product.ratings[findIndex].rating = rating;
      } else {
        product.ratings.push({
          userId,
          rating,
        });
      }

      const totalRating = product.ratings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      product.averageRating = (totalRating / product.ratings.length).toFixed(1);

      await product.save();

      resolve({
        status: "OK",
        message: "Rating the product successfully!",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProduct = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Product.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalProduct = await Product.count();

      resolve({
        status: "OK",
        message: "Get products successfully!",
        data: result,
        totalProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getBestSeller = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Product.find()
        .sort({ selled: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalProduct = result.length;

      resolve({
        totalProduct,
        status: "OK",
        message: "Get products best seller successfully!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  getCountProduct,
  getProductAuthor,
  searchProduct,
  ratingProduct,
  getProduct,
  getBestSeller,
};
