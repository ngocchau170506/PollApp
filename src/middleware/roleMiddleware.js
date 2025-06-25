import sendResponse from "../utils/response.js";

const roleMiddleware = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return sendResponse(res, false, "Access denied", null, 403);
  }
  next();
};

export default roleMiddleware;
