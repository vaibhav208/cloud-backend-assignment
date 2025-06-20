// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Port for the server to listen on
const port = 3000;

// In-memory database simulation for contacts
let contacts = [];

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// POST endpoint to identify and consolidate contact information
app.post('/identify', (req, res) => {
  const { email, phoneNumber } = req.body;

  // If email or phone number is missing, return an error
  if (!email || !phoneNumber) {
    return res.status(400).json({ message: "Email and phone number are required" });
  }

  // Check if the contact exists in the database
  let primaryContact = contacts.find(contact => contact.email === email || contact.phoneNumber === phoneNumber);
  
  if (!primaryContact) {
    // No matching contact found, create a new primary contact
    const newContact = {
      id: contacts.length + 1,  // Assigning a new unique ID
      email: email,
      phoneNumber: phoneNumber,
      linkedId: null,  // No linked contact initially
      linkPrecedence: 'primary',  // Mark as primary contact
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    contacts.push(newContact);  // Add the new contact to the "database"
    return res.status(200).json({
      primaryContactId: newContact.id,
      emails: [email],
      phoneNumbers: [phoneNumber],
      secondaryContactIds: []
    });
  } else {
    // Matching contact found, add new information as secondary contact
    const secondaryContact = {
      id: contacts.length + 1,  // New unique ID for the secondary contact
      email: email,
      phoneNumber: phoneNumber,
      linkedId: primaryContact.id,  // Link to the primary contact
      linkPrecedence: 'secondary',  // Mark as secondary contact
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    contacts.push(secondaryContact);  // Add the secondary contact
    return res.status(200).json({
      primaryContactId: primaryContact.id,
      emails: [primaryContact.email, email],
      phoneNumbers: [primaryContact.phoneNumber, phoneNumber],
      secondaryContactIds: [secondaryContact.id]
    });
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});