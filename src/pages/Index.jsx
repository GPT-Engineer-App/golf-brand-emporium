import React, { useState } from "react";
import { Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text, VStack, Image, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast } from "@chakra-ui/react";
import { FaCartPlus, FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const productsData = [
  { id: 1, name: "Golf Club Set", price: 250, brand: "Brand A", category: "Clubs" },
  { id: 2, name: "Golf Balls (12 pack)", price: 30, brand: "Brand B", category: "Balls" },
  { id: 3, name: "Golf Tee", price: 5, brand: "Brand C", category: "Accessories" },
  { id: 4, name: "Golf Gloves", price: 20, brand: "Brand A", category: "Accessories" },
  { id: 5, name: "Golf Shoes", price: 100, brand: "Brand B", category: "Shoes" },
];

const Index = () => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState({ price: "", brand: [], category: [] });
  const toast = useToast();

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));
    setProducts(sortedProducts);
    setSortAsc(!sortAsc);
  };

  const handleFilterChange = (type, value) => {
    const updatedFilter = { ...filter, [type]: value };
    setFilter(updatedFilter);
    applyFilters(updatedFilter);
  };

  const applyFilters = (filters) => {
    let filteredProducts = productsData;

    if (filters.price) {
      filteredProducts = filteredProducts.filter((product) => product.price <= filters.price);
    }

    if (filters.brand.length) {
      filteredProducts = filteredProducts.filter((product) => filters.brand.includes(product.brand));
    }

    if (filters.category.length) {
      filteredProducts = filteredProducts.filter((product) => filters.category.includes(product.category));
    }

    setProducts(filteredProducts);
  };

  return (
    <Flex p={5}>
      <Box w="20%" p={5} borderRight="1px" borderColor="gray.200">
        <Heading size="md" mb={4}>
          Filters
        </Heading>
        <FormControl>
          <FormLabel>Max Price</FormLabel>
          <Input placeholder="Enter max price" onChange={(e) => handleFilterChange("price", e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Brand</FormLabel>
          <CheckboxGroup onChange={(values) => handleFilterChange("brand", values)}>
            <Stack>
              <Checkbox value="Brand A">Brand A</Checkbox>
              <Checkbox value="Brand B">Brand B</Checkbox>
              <Checkbox value="Brand C">Brand C</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Category</FormLabel>
          <CheckboxGroup onChange={(values) => handleFilterChange("category", values)}>
            <Stack>
              <Checkbox value="Clubs">Clubs</Checkbox>
              <Checkbox value="Balls">Balls</Checkbox>
              <Checkbox value="Accessories">Accessories</Checkbox>
              <Checkbox value="Shoes">Shoes</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>
      </Box>
      <Box w="80%" p={5}>
        <Flex justify="space-between" align="center" mb={5}>
          <Heading size="lg">Products</Heading>
          <Button leftIcon={sortAsc ? <FaSortAmountDown /> : <FaSortAmountUp />} onClick={handleSort}>
            Sort by Price
          </Button>
        </Flex>
        <VStack spacing={5}>
          {products.map((product) => (
            <Flex key={product.id} p={5} shadow="md" borderWidth="1px" justify="space-between" align="center" w="full">
              <Box>
                <Text fontWeight="bold">{product.name}</Text>
                <Text>Price: ${product.price}</Text>
                <Text>Brand: {product.brand}</Text>
                <Text>Category: {product.category}</Text>
              </Box>
              <Button leftIcon={<FaCartPlus />} colorScheme="teal" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default Index;
