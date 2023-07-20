# Official Node.js runtime as base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
# The notation is used to copy all the files begining from package and ending with .json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Command to start Node.js application 
CMD ["npm" ,"start"]


