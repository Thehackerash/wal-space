import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react"; // Updated import statement

const Page = () => {
  const [randomValue, setRandomValue] = useState("");

  // Function to generate a random string
  const generateRandomString = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    // Generate a new random string every time the component renders
    setRandomValue(generateRandomString(16)); // Generate a random string of length 16
  }, []);

  return (
    <div>
      <h1>QR-Code</h1>
      <p>Random Value: {randomValue}</p>

      {/* Generate and display the QR Code */}
      <QRCode
        value={randomValue} // Use the random string as the QR code value
        size={256} // QR code size
        level={"H"} // Error correction level
        includeMargin={true} // Include margin around the QR code
      />
    </div>
  );
};

export default Page;
