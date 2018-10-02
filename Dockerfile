FROM node:8.12-jessie

COPY ./ /app
WORKDIR /app
RUN npm install

EXPOSE 3000

# Fire the lazers!!!
CMD ["npm", "run", "start"]
