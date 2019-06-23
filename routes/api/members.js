const express = require('express');
const router = express.Router();

const members = require('../../Members')

// GETS ALL MEMBERS FROM JSON
router.get('/', (req, res) => {
  res.json(members);
})

// GET ALL ACTIVE MEMBERS
router.get('/active', (req, res) => {
  res.json(members.filter(member => member.status == 'active'))
}) 

// GET ALL INACTIVE MEMBERS
router.get('/inactive', (req, res) => {
  res.json(members.filter(member => member.status == 'inactive'))
})

// GET SINGLE MEMBER
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))
  console.log(found)
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id} was found` })
  }
})

module.exports = router;