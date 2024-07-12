const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    } = req.body;

    console.log("Received request body:", req.body);

    try {
        const formattedFromDate = moment(fromdate, 'YYYY-MM-DD', true);
        const formattedToDate = moment(todate, 'YYYY-MM-DD', true);

        if (!formattedFromDate.isValid() || !formattedToDate.isValid()) {
            console.error("Invalid date format received:", { fromdate, todate });
            return res.status(400).json({ error: "Invalid date format" });
        }

        const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: formattedFromDate.format('DD-MM-YYYY'),
            todate: formattedToDate.format('DD-MM-YYYY'),
            totalamount,
            totaldays
        });

        const booking = await newBooking.save();
        res.send("Room booked successfully");

    } catch (error) {
        console.error("Error occurred:", error); // Log the error for debugging
        return res.status(400).json({ error });
    }
});

module.exports = router;
