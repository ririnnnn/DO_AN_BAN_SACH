# Use the official Node.js 14 image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port 
EXPOSE 3001

# Command to run the backend
CMD ["npm", "start"]
