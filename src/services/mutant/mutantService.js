// Created By Eyder Ascuntar Rosales
const customValidator = require("../../utils/validators/validator");
const ApiError = require("../../dto/commons/response/apiErrorDTO");
const ServiceException = require("../../utils/errors/serviceException");
const commonErrors = require("../../utils/constants/commonErrors");
const commonMessages = require("../../utils/constants/commonMessages");
const httpCodes = require("../../utils/constants/httpCodes");
const Mutant = require("../../models/mutant/mutantModel");
const sequenceNumber = 3;
const isMutantParam = 2;

// =========== Function to check if it is a mutant
exports.isMutant = async (req) => {
  // Validate request
  customValidator.validateNotNullRequest(req);
  const { dna } = req.body;
  customValidator.validateNotNullParameter(dna, "dna");
  const matrixSize = dna.length;
  const dnaChain = dna.join("");
  let mutant = await Mutant.findOne({
    dnaChain: dnaChain,
  }).lean();
  if (!mutant) {
    matrixValidate(matrixSize, dnaChain);
    const defDnaChainsArray = arrayChainDnaGenerator(dna, matrixSize);
    let isMutantCounter = 0;
    for (chain of defDnaChainsArray) {
      if (isMutantCounter < isMutantParam) {
        if (chain.includes("AAAA")) {
          isMutantCounter += 1;
        }
        if (chain.includes("TTTT")) {
          isMutantCounter += 1;
        }
        if (chain.includes("CCCC")) {
          isMutantCounter += 1;
        }
        if (chain.includes("GGGG")) {
          isMutantCounter += 1;
        }
      } else {
        break;
      }
    }
    if (isMutantCounter >= 2) {
      await Mutant.create({ dnaChain: dnaChain, isMutant: true });
      return commonMessages.WELCOME;
    } else {
      await Mutant.create({ dnaChain: dnaChain, isMutant: false });
      throw new ServiceException(
        commonErrors.E_COMMON_01,
        new ApiError(
          `${commonErrors.EM_COMMON_19}`,
          `${commonErrors.EM_COMMON_19}`,
          "EM_COMMON_19",
          httpCodes.FORBIDDEN
        )
      );
    }
  } else {
    throw new ServiceException(
      commonErrors.E_COMMON_01,
      new ApiError(
        `${commonErrors.EM_COMMON_20}`,
        `${commonErrors.EM_COMMON_20}`,
        "EM_COMMON_20",
        httpCodes.BAD_REQUEST
      )
    );
  }
};

/**
 * Function to returns stats of mutant checks
 * @returns
 */

exports.stats = async () => {
  const count_mutant_dna = await Mutant.countDocuments({
    isMutant: true,
  }).lean();
  const count_human_dna = await Mutant.countDocuments({
    isMutant: false,
  }).lean();
  let stats = {
    count_mutant_dna: count_mutant_dna,
    count_human_dna: count_human_dna,
    total: count_mutant_dna + count_human_dna,
  };

  return stats;
};

/**
 * function that validates if the string is correct.
 * Square dimension
 * Only allow requested characters
 * @param {*} matrixSize
 * @param {*} dnaChain
 * @returns
 */
function matrixValidate(matrixSize, dnaChain) {
  if (matrixSize > sequenceNumber) {
    if (matrixSize * matrixSize === dnaChain.length) {
      if (new RegExp("^[ATCG]+$").test(dnaChain)) {
        return true;
      }
    }
  }
  throw new ServiceException(
    commonErrors.E_COMMON_01,
    new ApiError(
      `${commonErrors.EM_COMMON_18}`,
      `${commonErrors.EM_COMMON_18}`,
      "EM_COMMON_18"
    )
  );
}

/**
 * Check if str is empty
 * @param {*} str
 * @returns
 */
function isEmpty(str) {
  return !str || str.length === 0;
}

/**
 * Generate adn chains array
 * @param {*} dna
 * @param {*} matrixSize
 * @returns
 */
function arrayChainDnaGenerator(dna, matrixSize) {
  const dnaChainsArray = [];
  const matrixDna = [];
  const reverseMatrixDna = [];
  for (let dnaBase of dna) {
    // Horizontal chains
    dnaChainsArray.push(dnaBase);
    matrixDna.push(Array.from(dnaBase));
    reverseMatrixDna.push(
      Array.from(
        dnaBase
          .split("")
          .reverse()
          .join("")
      )
    );
  }
  // Diagonal
  let visualize = "";
  for (let k = 0; k < matrixSize * 2; k++) {
    for (let j = 0; j <= k; j++) {
      let i = k - j;
      if (i < matrixSize && j < matrixSize) {
        visualize += matrixDna[i][j];
      }
    }
    // console.log(visualize);
    // diagonal chains
    if (!isEmpty(visualize) && visualize.length > sequenceNumber)
      dnaChainsArray.push(visualize);
    visualize = "";
  }

  // Reverse Diagonal
  visualize = "";
  for (let k = 0; k < matrixSize * 2; k++) {
    for (let j = 0; j <= k; j++) {
      let i = k - j;
      if (i < matrixSize && j < matrixSize) {
        visualize += reverseMatrixDna[i][j];
      }
    }
    // console.log(visualize);
    // reverse diagonal chains
    if (!isEmpty(visualize) && visualize.length > sequenceNumber)
      dnaChainsArray.push(visualize);
    visualize = "";
  }

  const matrixDnaVertical = [];
  for (var i = 0; i < matrixDna.length; i++) {
    var cube = matrixDna[i];
    for (var j = 0; j < cube.length; j++) {
      if (i === 0) {
        matrixDnaVertical.push(cube[j]);
      } else {
        matrixDnaVertical[j] = matrixDnaVertical[j] + cube[j];
      }
    }
  }
  // Add vertical chains
  const defDnaChainsArray = [...dnaChainsArray, ...matrixDnaVertical];
  // console.table(defDnaChainsArray);
  return defDnaChainsArray;
}
