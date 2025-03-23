import multer from "multer";
import path from "path";

// multer.memoryStorage() lưu tạm data hình ảnh vào trong RAM rồi mới đưa vào buffer
// tự giải phóng ram sau khi kết thúc api
const uploadCloud = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

export default uploadCloud;
