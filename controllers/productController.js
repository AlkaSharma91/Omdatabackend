import multer from "multer";
import Product from "../models/productModel.js";
import { upload } from "../utils/useMulter.js";
import fs from "fs";

export const addProduct = async (req, res) => {

  console.log("dfugsyufgdyfdgf",req.user._id);

  upload(req, res, async function (err) {
    console.log("req with upload  came");
          if (err instanceof multer.MulterError) {
              console.log("error is", err);
              return res.status(500).send({
               err: "not valid image",
                                          });
    } else if (err) {
      console.log("error is", err);
      return res.status(500).send({
        status: 500,
        err: "not valid image",
      });
    } else {
      console.log();
      const { name, price, description } = req.body;
      console.log("add product called");
      let image;
      if (req?.file?.path) {
        image = req.file.path;
      } else {
        image = null;
      }

      const product = await Product.create({ user:req.user._id,name, price, description, image });
      if (product) {
        return res.status(200).json({
          status: 200,
          message: "product added successfully",
          product: product,
        });
      } else {
        return res.status(500).send({
          status: 500,
          message: "product not added",
        });
      }
    }
    //  return res.status(200).send(req.file)
  });
};

export const getAllProducts = async (req, res) => {
  try {
    console.log("user id is",req.user._id);
    const products = await Product.find({user:req.user._id,isDeleted:false});
    if (products) {
      console.log("product is", products);
      return res.status(200).json({
        products,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "products not get",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "products not get",
    });
  }
};

export const deleteProductWithId = async (req, res) => {
  try {
    console.log("user id is",req.user._id);
    const id = req.params.id;
    const product = await Product.findOne({ _id: id,user:req.user._id});
    console.log("product is", product);
    if (product) {
      const pathToFile = `${product.image}`;
      console.log("path to file is", pathToFile);
      // const result = await Product.deleteOne({ _id: id });
      const result = await Product.updateOne({ _id: id,user:req.user._id }, { isDeleted: true });

      if (result) {
        return res.status(200).send({
          status: 200,
          message: "product deleted successfully",
        });
      }
    } else {
      return res.status(404).send({
        status: 404,
        message: "product not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "not deleted some exception occured",
      error,
    });
  }
};

export const updateProductWithId = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    console.log("req.body", req?.body);
    console.log("req.file", req?.file);
    console.log("req.data", req?.data);
    console.log("req.image", req?.image);

    console.log("product is", product);
    if (product) {
      const filePath = product.image;

      upload(req, res, async function (err) {
        console.log("req with upload  came");
        if (err instanceof multer.MulterError) {
          console.log("error is", err);
          return res.status(500).send({
            status: 500,
            err: "not valid image",
          });
        } else if (err) {
          console.log("error is", err);
          return res.status(500).send({
            status: 500,
            err: "not valid image",
          });
        } else {
          console.log(req.file);
          if (req?.file?.path) {
            const image = req.file.path;
            const { name, price, description } = req.body;
            const { modifiedCount } = await Product.updateOne(
              { _id: id },
              { name, price, description, image }
            );
            if (modifiedCount === 1) {
              fs.unlink(filePath, function (err) {
                if (err) {
                  throw err;
                } else {
                  console.log("Successfully deleted the file.");
                }
              });

              const product = await Product.findOne({ _id: id });
              if (product) {
                console.log("product updated successfull");
                res.status(200).send({
                  staus: 200,
                  message: "user updated successfully",
                  product,
                });
              }
            }
          } else {
            const { name, price, description } = req.body;
            const { modifiedCount } = await Product.updateOne(
              { _id: id },
              { name, price, description }
            );
            if (modifiedCount === 1) {
              const product = await Product.findOne({ _id: id });
              if (product) {
                console.log("product updated successfull");
                res.status(200).send({
                  staus: 200,
                  message: "user updated successfully",
                  product,
                });
              }
            }
          }
        }
      });
    }
  } catch (error) {}
};



