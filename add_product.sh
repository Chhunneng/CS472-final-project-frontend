#!/bin/bash

# Base URL - replace with your actual API URL
BASE_URL="http://localhost:3000"

# Function to add a single product
add_product() {
  curl -X POST "${BASE_URL}/products" \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"$1\",
      \"description\": \"$2\",
      \"category\": \"$3\",
      \"price\": $4,
      \"imageUrl\": \"$5\"
    }"
  echo -e "\n"
}
add_product "Smartphone with Dual Camera" "High-resolution smartphone with dual camera setup" "Electronics" 699.99 "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
add_product "Wireless Headphones" "Noise-cancelling over-ear wireless headphones" "Electronics" 199.99 "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
add_product "Laptop on Desk" "Sleek laptop suitable for work and entertainment" "Electronics" 999.99 "https://images.pexels.com/photos/18105/pexels-photo.jpg"
add_product "Smartwatch Display" "Smartwatch with fitness tracking features" "Electronics" 249.99 "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
add_product "DSLR Camera" "Professional DSLR camera for high-quality photography" "Electronics" 1199.99 "https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg"
add_product "Denim Jeans" "Classic blue denim jeans with a comfortable fit" "Clothing" 59.99 "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
add_product "Casual T-Shirt" "Soft cotton t-shirt perfect for casual wear" "Clothing" 19.99 "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
add_product "Leather Jacket" "Stylish leather jacket for a modern look" "Clothing" 149.99 "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
