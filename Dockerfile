FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# For development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# For production build, uncomment these and comment out the above CMD
# RUN npm run build
# EXPOSE 80
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "80"]