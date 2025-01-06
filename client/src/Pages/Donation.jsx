import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const AlumniDonationForm = () => {

    const toast = useToast();

  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    pan: "",
    aadhaar: "",
    amount: "",
    category: "",
    pinCode: "",
    address: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("this is formdata:",formData);

    try {
      // Send form data to backend API
      const response = await fetch("http://localhost:5000/donation/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Donation Successful",
          description: "Thank you for your contribution!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Reset form after submission
        setFormData({
          email: "",
          mobile: "",
          pan: "",
          aadhaar: "",
          amount: "",
          category: "",
          pinCode: "",
          address: "",
        });
      } else {
        throw new Error("Failed to save donation");
      }
    } catch (error) {
        console.log("this is error:",error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt="5" p="5" boxShadow="lg" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb="4">
          <FormLabel>Enter Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email *"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Enter Mobile No</FormLabel>
          <Input
            type="tel"
            name="mobile"
            placeholder="Enter Mobile No *"
            value={formData.mobile}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Enter PAN Card No</FormLabel>
          <Input
            type="text"
            name="pan"
            placeholder="Enter PAN Card No *"
            value={formData.pan}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Enter Aadhaar No</FormLabel>
          <Input
            type="text"
            name="aadhaar"
            placeholder="Enter Aadhaar No *"
            value={formData.aadhaar}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Select Amount</FormLabel>
          <Select
            name="amount"
            placeholder="-Select Amount-"
            value={formData.amount}
            onChange={handleChange}
          >
            <option value="1000">₹1000</option>
            <option value="5000">₹5000</option>
            <option value="10000">₹10000</option>
          </Select>
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Donation Type</FormLabel>
          <Select
            name="category"
            placeholder="-Donation-"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="scholarship">Scholarship for Needy</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="medical">Medical Relief</option>
            <option value="social">Social Welfare</option>
            <option value="general">General</option>
          </Select>
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Enter Pin Code</FormLabel>
          <Input
            type="text"
            name="pinCode"
            placeholder="Enter Pin Code *"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Permanent Address</FormLabel>
          <Input
            type="text"
            name="address"
            placeholder="Permanent Address *"
            value={formData.address}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full" mt="4">
          Donate
        </Button>
      </form>
    </Box>
  );
};

export default AlumniDonationForm;
