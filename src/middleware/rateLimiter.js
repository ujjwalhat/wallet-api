import ratelimit from "../middleware/rateLimiter.js";

const rateLimiter = async (req, res, next) => {
  try {
    //userId,IP address
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({
        message: "Too many request, please try again later",
      });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
