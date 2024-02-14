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
    Tag.create(req.body)
    .then((tag) => {
      res.json(tag)
    })
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
  .then((updatedTag) => {
    if (!updatedTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
    
  }
);

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      if (!deletedTag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(deletedTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
