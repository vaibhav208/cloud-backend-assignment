
# Step 1: Use a minimal base image
FROM node:18-alpine AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Expose the port the app will run on
EXPOSE 3000

# Step 6: Start the application
CMD ["node", "server.js"]
