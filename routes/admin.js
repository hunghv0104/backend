var express = require('express');
var router = express.Router();
const ToyModel = require('../models/ToyModel')

//Image upload
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../frontend/public/images/'); // Destination folder where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename of the uploaded file
//   }
// });

const upload = multer()

//image upload using cloudinary
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: 'dxl3mam8f',
  api_key: '659489334821216',
  api_secret: 'TzIXi_iS-Q85aNcw6oW5AK9LmPc'
});

router.get('/', async(req, res)=>{
 const data = await ToyModel.find({})
 res.json({success : true, data:data})
})

//add

// router.post('/create', upload.single('image'), async (req, res) => {
//   try {
//     const { name, year, age_restriction, price, category, description } = req.body;
//     const image = req.file;

//     // Upload the image file to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(image.path);

//     // Create a new instance of the ToyModel and set the properties
//     const toy = new ToyModel({
//       name,
//       year,
//       age_restriction,
//       price,
//       category,
//       description,
//       image: uploadResult.secure_url // Save the secure URL from Cloudinary
//     });

//     await toy.save();

//     res.send({ success: true, message: 'Added successfully', data: toy });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ success: false, message: 'Server error' });
//   }
// });

router.post('/create',  async(req, res)=>{
 const data = new ToyModel(req.body) //lay data tu req 
 await data.save()
 res.send({success: true, message: "Added successfully", data: data})
})

//update
//Update kieu nay thi phai nhap ca id cua sp vao phan req chu k phai lay tu url
router.put('/update', async(req, res)=>{
 const {_id,...rest} = req.body //... la de lay du lieu con lai, neu k co thi k chay dc
 console.log(_id)
 const data = await ToyModel.updateOne({_id:_id}, rest) //{_id:id} de tim id matching voi _id trong database va update phan rest
 res.send({success: true, message:"updated successfully", data: data})
})

// router.put('/update', upload.single('image'), async (req, res) => {
//   try {
//     const { _id, ...rest } = req.body;
//     const { name, year, age_restriction, price, category, description } = req.body;
//     const image = req.file;

//     let newData = {
//       name,
//       year,
//       age_restriction,
//       price,
//       category,
//       description,
//     };

//     if (image) {
//       newData.image = image.filename;
//     }

//     const updatedData = await ToyModel.findByIdAndUpdate(_id, newData, { new: true });

//     res.send({ success: true, message: 'Updated successfully', data: updatedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ success: false, message: 'Server error' });
//   }
// });

//delete
router.delete('/delete/:id', async(req, res)=>{
 const id = req.params.id
 await ToyModel.deleteOne({_id:id})
 res.send({success: true, message:"Deleted successfully"})
})


module.exports = router;