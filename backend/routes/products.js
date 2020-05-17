const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(rew, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(rew, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
let Product = require("../models/product.model");

router.route("/").get((req, res) => {
  Product.find() // get a list of all Products in database
    .then(Products => res.json(Products)) // return the Products we got from the database
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", upload.single("productImage"), (req, res) => {
  console.log(req.file);
  const productImage = req.file.path;
  const productname = req.body.productname;
  const description = req.body.description;
  const cost = Number(req.body.cost);
  const sizes = req.body.sizes.split(",");
  console.log(req.body.sizes.split(","));

  // let sizesList = req.body.sizes;
  // sizesList.forEach(element => {
  //   sizes.push(element);
  //   console.log(element);
  // });
  // console.log(sizes);

  const newProduct = new Product({
    productImage,
    productname,
    description,
    cost,
    sizes
  });
  console.log(newProduct);
  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * find a product by id
 */
router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
});

/**
 * find a product to delete by id
 */
router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("product deleted"))
    .catch(err => res.status(400).json("Error" + err));
});

/**
 * update a product by id
 */
router.post("/update/:id", upload.single("productImage"), (req, res) => {
  console.log(req.file);
  Product.findById(req.params.id)
    .then(product => {
      product.productImage = req.file.path;
      product.productname = req.body.productname;
      product.description = req.body.description;
      product.cost = Number(req.body.cost);
      product.sizes = req.body.sizes.split(",");

      product
        .save()
        .then(() => res.json("product updated!"))
        .catch(err => res.status(400).json("Error" + err));
    })

    .catch(err => res.status(400).json("Error" + err));
});

module.exports = router;
