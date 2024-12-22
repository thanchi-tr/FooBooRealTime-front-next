# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire application
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Prepare production image
FROM node:18-slim AS runner

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Install only production dependencies
RUN npm install

# Expose the port on which Next.js will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "dev", "start"]
