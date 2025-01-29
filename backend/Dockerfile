# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
