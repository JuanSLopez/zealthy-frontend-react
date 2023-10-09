"use client";
import React, { useState } from "react";
import axios from "axios";
function TextInputForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Handle form submission here
    const postData = {
      name: name,
      email: email,
      description: description,
    };

    // Wrap the postData in a 'body' object

    console.log("Input 1:", name);
    console.log("Input 2:", email);
    console.log("Input 3:", description);
    // Clear the input values after submission
    try {
      let response = await axios.post(
        "https://zealthy-backend-five.vercel.app/api/tickets/create/",
        postData, // Send the requestBody as the request body
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      console.log(response);
      setName("");
      setEmail("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-20 flex items-center">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h1 className="block text-gray-700 text-sm font-bold mb-2">
            Ticketing Input Form
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              placeholder="John Smith"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              placeholder="example@example.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
            placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full min-h-40 focus:outline-none focus:ring focus:border-blue-300"
              rows={6} // Adjust the number of rows as needed
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TextInputForm;
