import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import axios from "axios";

configDotenv();

const app = express();
const secretKey = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

// Routes
app.post("/pay", async (req, res) => {
  const { transactionId } = req.body;

  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    // Send the response from Flutterwave back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error verifying transaction:", error);
    res
      .status(500)
      .json({ message: "Error verifying transaction", error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
