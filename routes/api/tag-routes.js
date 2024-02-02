const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = Product.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = Product.findAll({
      where: {id: req.params.id},
      include: [{model: Product}]
    })
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try{
    Product.create(req.body)
    .then((product) => {
      
    })
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
