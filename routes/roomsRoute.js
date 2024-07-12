const express = require('express');
const router = express.Router();

const Room = require('../models/room');

// Get all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Get room by ID
router.get("/getroom/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


// Get room by ID
router.post("/getallroombyid", async (req, res) => {
  const { id } = req.body;
  try {
    const room = await Room.findOne({_id:id});
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
    const room = req.body;
    try {
      const newRoom = new Room(room);
      await newRoom.save();
      res.status(201).json({ message: 'Room added successfully' });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });


  router.post("/getdetailsbyownerid",async(req,res)=>{
    const {houseownerid}= req.body;
  
    try{
       const rooms= await Room.find({houseownerid})
       res.send(rooms)
    }catch(error)
    {
      console.error("Error fetching room details:",error.message)
       return res.status(400).json({error:error.message})
    }
  })
  
  
  // Update a room
  router.put('/:id', async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoom);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  });
  
  // Delete a room
  router.delete('/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  });
  
module.exports = router;