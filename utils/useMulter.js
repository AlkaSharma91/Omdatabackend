import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
    cb(null, 'uploads/productsImages/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
export const upload  = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
   
}).single('image');

//export const upload = multer({ storage: storage }).single('image')