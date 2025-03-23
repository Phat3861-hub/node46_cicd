import { responseSuccess } from "../common/helpers/response.helper.js";
import videoService from "../services/video.service.js";

const videoController = {
  videoList: async (req, res, next) => {
    try {
      const videos = await videoService.videoList(req);

      const resData = responseSuccess(videos, "get list video successfully");

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  videoDetail: async (req, res, next) => {
    try {
      const videos = await videoService.videoDetail(req);

      const resData = responseSuccess(videos, "get detail video successfully");

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default videoController;
