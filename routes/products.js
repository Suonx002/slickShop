const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../model/User');
const Product = require('../model/Product');

// @route      GET api/products
// @desc       Get user one product
// @access     Private

router.get('/:id', auth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).sort({
      date: -1
    });
    const productItem = products.filter(
      product => product.id === req.params.id
    );

    res.json(productItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route      GET api/products
// @desc       Get all users products
// @access     Private

router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route      POST api/products
// @desc       Add a new product
// @access     Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('imageUrl', 'Image Url is required')
        .not()
        .isEmpty(),
      check('brand', 'Brand is required')
        .not()
        .isEmpty(),
      check('website', 'Website is required')
        .not()
        .isEmpty(),
      check('originalPrice', 'Original Price is required')
        .not()
        .isEmpty(),
      check('discountPrice', 'Discount Price is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      title,
      description,
      imageUrl,
      brand,
      website,
      originalPrice,
      discountPrice
    } = req.body;

    try {
      const newProduct = new Product({
        title,
        description,
        imageUrl,
        brand,
        website,
        originalPrice,
        discountPrice,
        user: req.user.id
      });

      const product = await newProduct.save();
      console.log(product);

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error...');
    }
  }
);

// @route      PUT api/products/:id
// @desc       Update Product
// @access     Private

router.put('/:id', auth, async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    brand,
    website,
    originalPrice,
    discountPrice
  } = req.body;

  //Build product object
  const productField = {};

  if (title) productField.title = title;
  if (description) productField.description = description;
  if (imageUrl) productField.imageUrl = imageUrl;
  if (brand) productField.brand = brand;
  if (website) productField.website = website;
  if (originalPrice) productField.originalPrice = originalPrice;
  if (discountPrice) productField.discountPrice = discountPrice;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    //Make sure user owns the product
    if (product.user.toString() !== req.user.id)
      return res.status(404).json({ msg: 'Not Authorized' });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: productField
      },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error...');
  }
});

// @route      DELETE api/products/:id
// @desc       Delete Product
// @access     Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    //Make sure user owns the product
    if (product.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not Authorized' });

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Product Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error...');
  }
});

module.exports = router;
