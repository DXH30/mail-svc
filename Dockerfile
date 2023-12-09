# Use Node.js version 10 as the base image
FROM node:10

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ./src/package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "start"]
