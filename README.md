# GuestRoomBooking-App

## Frontend Packages

    @testing-library/jest-dom@5.17.0  
    @testing-library/react@13.4.0     
    @testing-library/user-event@13.5.0
    antd@5.19.1
    axios@1.7.2
    moment@2.30.1
    react-bootstrap@2.10.4
    react-dom@18.3.1
    react-router-dom@6.24.1
    react-scripts@5.0.1
    react-spinners@0.14.1
    react@18.3.1
    web-vitals@2.1.4

## Backend Packages

    express@4.19.2
    moment@2.30.1
    mongoose@8.5.0
    nodemon@3.1.4
    router@1.3.8

## Project Overview
     Title : Guest Room Booking Application
     Description : Think about house owners who allow paying guests to stay in their home for a short period. Say,
     less than 30 days. The house owners need an application to take bookings and manage their bookings properly.


### Database Schema and Sample Data

#### Database Schema

Here’s a simple schema for the guest room booking application using MongoDB:

1. Users Collection:
   - Stores information about the customers.
     
2. Houseowner Collection:
   - Stores details about the houseowner.
     
3. Booking Collection:
   - Stores the booking details of the customer.

4. Room Collection:
   - Stores the details of the room.


## User Collection Schema

``json
{
   "_id" : "ObjectId",
   "name" : "String",
   "email" : "String",
   "password" : "String",
   "phone" : "Number",
}
``

## Sample Data for User Collection

``json
[
 {
   "_id" : "98gsdu725402gbik9870",
   "name" : "User",
   "email" : "user@gmail.com",
   "password" : "user@123",
   "phone" : 8791234515,      
 }
]
``

## Houseowner Collection Schema

``json
{
   "_id" : "ObjectId",
   "name" : "String",
   "email" : "String",
   "password" : "String",
   "phone" : "Number",
}
``

## Sample Data for Houseowner Collection

``json
[
 {
   "_id" : "98gsdu725402gbik9870",
   "name" : "Owner",
   "email" : "owner@gmail.com",
   "password" : "owner@123",
   "phone" : 7633951387,      
 }
]
``

## Booking Collection Schema

``json
{
   "_id" : "ObjectId",
   "room" : "String",
   "roomid" : "String",
   "userid" : "String",
   "fromdate" : "String",
   "todate" : "String",
   "totalamount" : "Number",
   "totaldays" : "Number",
   "status" : "String",
}
``

## Sample Data for Booking Collection

``json
[
 {
   "_id" : "hgdri78347mckbl",
   "room" : "MahaLakshmi Homestay",
   "roomid" : "78ghyt92084aefi",
   "userid" : "98gsdu725402gbik9870",
   "fromdate" : "12-07-2024",   
   "todate" : "14-07-2024",
   "totalamount" : 6000,
   "totaldays" : 3,
   "status" : "booked", 
 }
]
``

## Room Collection Schema

``json
{
   "_id" : "ObjectId",
   "name" : "String",
   "amenity" : "String",
   "floorsize" : "String",
   "noofbeds" : "Number",
   "minstay" : "Number",
   "maxstay" : "Number",
   "rentperday" : "Number",
   "phonenumber" : "Number",
   "description" : "String",
   "imageurls" : "String",
}
``

## Sample Data for Room Collection

``json
[
 {
   "_id" : "ae457knhg23900n",
   "name" : "Devatha Homestay",
   "amenity" : "Free Wifi, AC",
   "floorsize" : "500 sqft",
   "noofbeds" : 1,
   "minstay" : 1,
   "maxstay" : 15,
   "rentperday" : 2000,
   "phonenumber" : 9871234508,
   "description" : "It is situated at Coimbatore and it is 1km away from the railway station.",
   "imageurls" : "https://image.jpg", 
 }
]
``

1. Project Setup

   Clone the Repository:

    git clone <your-repo-url>
    
    cd <your-repo-name>
    
2. Backend Setup:
   
   Navigate to the backend directory and install dependencies:

     cd backend
   
     npm install

  Create a .env file in the backend directory with the following content:

     .env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/mern-rooms
     (run node server.js)

3. Frontend Setup:
   
     cd ../client

     npm install

     npm start
