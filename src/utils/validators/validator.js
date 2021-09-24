// Created By Eyder Ascuntar Rosales
const ApiError = require("../../dto/commons/response/apiErrorDTO");
const ServiceException = require("../errors/serviceException");
const commonErrors = require("../constants/commonErrors");

exports.validateNotNullRequest = (req) => {
  if (Object.keys(req.body).length === 0) {
    throw new ServiceException(
      commonErrors.ET_COMMON_02,
      new ApiError(
        commonErrors.ET_COMMON_02,
        commonErrors.EM_COMMON_02,
        "EM_COMMON_02"
      )
    );
  }
};

exports.validateNotNullParameter = (parameter, parameterName) => {
  if (typeof parameter !== "undefined" && parameter) {
    // console.log("validateNotNullParameter");
  } else {
    throw new ServiceException(
      commonErrors.ET_COMMON_02,
      new ApiError(
        `${commonErrors.ET_COMMON_02} ${parameterName}`,
        `${commonErrors.EM_COMMON_03} ${parameterName}`,
        "EM_COMMON_03"
      )
    );
  }
};
