const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const members = require('../../Members');

// GETS ALL MEMBERS
router.get('/', (req, res) => {
  res.json(members);
});

// GET ALL ACTIVE MEMBERS
router.get('/active', (req, res) => {
  res.json(members.filter(member => member.status == 'active'))
}); 

// GET ALL INACTIVE MEMBERS
router.get('/inactive', (req, res) => {
  res.json(members.filter(member => member.status == 'inactive'))
});

// GET SINGLE MEMBER
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id == req.params.id) // true or false

  if (found) {
    res.json(members.filter(member => member.id == req.params.id))
  } else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id} was found` })
  }
});

// Create Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  // res.json(members)
  //The res.redirect is for templates. To serve to the template comment out the bottom or top
  res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
  const found = members.some(member => req.params.id == member.id)
  if (found) {

    const updatedMember = req.body;
    members.forEach(member => {
      if (member.id == req.params.id) {
        member.name = updatedMember.name ? updatedMember.name : member.name
        member.email = updatedMember.email ? updatedMember.email : member.email

        res.json(({ msg: 'Member updated', member }))
      }
    })
  } else {
    res.status(400).json({ msg: `No member found with the ID of ${req.params.id}` })
  }
});

// Delete Member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id == req.params.id)

  if(found) {
    let index = members.findIndex(member => member.id == req.params.id)
    console.log(index)
    members.splice(index, 1)
    // res.json({ msg: 'Member deleted', members })
    res.redirect('/');
    // res.json({ msg: 'Member deleted', members: members.filter(member => member.id != req.params.id) })
  } else {
    res.status(400).json({ msg: `No member found with the ID of ${req.params.id}` })
  }
})


module.exports = router;