const ContactService = require("../services/ContactService");

const createContact = async (req, res) => {
  try {
    const { userName, email, address, content, userId } = req.body;
    if (!userName || !email || !address || !content || !userId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The input is required!",
      });
    }
    const respone = await ContactService.createContact(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllContact = async (req, res) => {
  try {
    const respone = await ContactService.getAllContact();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!contactId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The contact id is required!",
      });
    }

    const respone = await ContactService.getContactById(contactId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getContact = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await ContactService.getContact(
      Number(page) || 1,
      Number(limit) || 10
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const data = req.body;

    if (!contactId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The contact id is required!",
      });
    }

    const respone = await ContactService.updateContact(contactId, data);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!contactId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The contact id is required!",
      });
    }

    const respone = await ContactService.deleteContact(contactId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyContact = async (req, res) => {
  try {
    const contactIds = req.body;
    const respone = await ContactService.deleteManyContact(contactIds);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getContactUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The user id is required!",
      });
    }
    const response = await ContactService.getContactUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createContact,
  getAllContact,
  getContact,
  getContactById,
  updateContact,
  deleteContact,
  deleteManyContact,
  getContactUser,
};
