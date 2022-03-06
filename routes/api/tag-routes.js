const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // this will find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'price', 'product_name', 'stock', 'category_id'],
      },
    ],
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // this will find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'price', 'product_name', 'stock', 'category_id'],
      },
    ],
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // this will create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // this will update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((dbTagData) => {
    if(!dbTagData) {
      res.status(404).json({ message: 'Tag not found with this id'});
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // this will delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbTagData) => {
    if(!dbTagData) {
      res.status(404).json({ message: 'Tag not found with this id'});
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;