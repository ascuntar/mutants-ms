// Created By Eyder Ascuntar Rosales
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const ClientReport = require('../../models/taxDeclaration/ClientReportModel');
const httpCodes = require('../../utils/constants/httpCodes');
const APIFeatures = require('../../utils/responses/apiFeatures');

// =========== Function to filter specific properties to udpate
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// =========== Function to get Clients
exports.get = async (req, res) => {
  if (
    req.query &&
    req.query.clientTypeId &&
    req.query.clientID &&
    req.query.clientBirthDate
  ) {
    const features = new APIFeatures(ClientReport.find(), req.query).filter();
    const clientReports = await features.query;
    if (clientReports && clientReports.length > 0) {
      const filter = { clientID: req.query.clientID };
      const update = { downloadedAt: new Date(), channel: 'WEB' };
      await ClientReport.updateMany(filter, update, {
        new: true
      });
      return clientReports;
    } else {
      throw new ServiceException(
        commonErrors.EM_COMMON_15,
        new ApiError(
          `${commonErrors.EM_COMMON_15}`,
          `${commonErrors.EM_COMMON_15}`,
          'EM_COMMON_15',
          httpCodes.BAD_REQUEST
        )
      );
    }
  } else {
    throw new ServiceException(
      commonErrors.E_COMMON_01,
      new ApiError(
        `${commonErrors.EM_COMMON_02}`,
        `${commonErrors.EM_COMMON_02}`,
        'EM_COMMON_02',
        httpCodes.BAD_REQUEST
      )
    );
  }
};

// =========== Function to create
exports.create = async (req, res) => {
  try {
    customValidator.validateNotNullRequest(req);
    let clientReport = await ClientReport.create(req.body);
    return clientReport;
  } catch (error) {
    throw error;
  }
};
