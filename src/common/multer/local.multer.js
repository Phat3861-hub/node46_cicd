import multer from'multer'
import path from 'path'
// nơi lưu trữ (lưu pixel data hình ảnh)  xử lý tên file và đuôi mở rộng (extension))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // có req và file để xử lý logic tạo ra folder muốn lưu trữ(file:image,doc,excel..)
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      // đuôi mở rộng của file
      const fileExtension =path.extname(file.originalname)

      // xử lý tên file
    //   const fileNameString = file.fieldname + '-' + uniqueSuffix + fileExtension
      const fileNameString = `local-${file.fieldname}-${uniqueSuffix}-${fileExtension}`
      cb(null, fileNameString)
    }
  })


const uploadLocal = multer({ storage: storage  })

export default uploadLocal