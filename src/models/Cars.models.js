import { DataTypes } from "sequelize";
import { sequelize } from "../common/sequelize/initsequelize.js";
import express from "express";

// Create the model
const Cars = sequelize.define(
  "Cars",
  {
    car_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    passengers: {
      type: DataTypes.INTEGER,
    },
    max_speed: {
      type: DataTypes.STRING,
    },
    gearbox_type: {
      type: DataTypes.STRING,
    },
    fuel_type: {
      type: DataTypes.STRING,
    },
    price_per_day: {
      type: DataTypes.DOUBLE,
    },
    discount_percentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "cars",
    timestamps: false,
  }
);

// Sync the model with the database (run once during the app setup)
Cars.sync()
  .then(() => {
    console.log("Table cars synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing cars table", err);
  });

// Set up Express app and routes
const app = express();

// Define the route to get all cars
app.get("/cars", async (req, res) => {
  try {
    const cars = await Cars.findAll({ raw: true });
    console.log({ cars });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Set the server to listen on a port (e.g., 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default Cars;
