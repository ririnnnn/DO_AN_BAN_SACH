const StatisticService = require("../services/StatisticService");

const createStatistic = async (req, res) => {
  try {
    const { date, statisticByNumber, statisticByRevenue, bestSeller } =
      req.body;
    if (!date || !statisticByNumber || !statisticByRevenue || !bestSeller) {
      return res.status(400).json({
        status: "ERROR",
        message:
          "date, statisticByNumber, statisticByRevenue, bestSeller are required!",
      });
    }
    const response = await StatisticService.createStatistic(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const getStatisticById = async (req, res) => {
  try {
    const statisticId = req.params.id;

    if (!statisticId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The statistic ID is required!",
      });
    }

    const response = await StatisticService.getStatisticById(statisticId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const updateStatistic = async (req, res) => {
  try {
    const statisticId = req.params.id;
    const data = req.body;

    if (!statisticId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The statistic ID is required!",
      });
    }

    const response = await StatisticService.updateStatistic(statisticId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const deleteStatistic = async (req, res) => {
  try {
    const statisticId = req.params.id;

    if (!statisticId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The statistic ID is required!",
      });
    }

    const response = await StatisticService.deleteStatistic(statisticId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

module.exports = {
  createStatistic,
  getStatisticById,
  updateStatistic,
  deleteStatistic,
};
