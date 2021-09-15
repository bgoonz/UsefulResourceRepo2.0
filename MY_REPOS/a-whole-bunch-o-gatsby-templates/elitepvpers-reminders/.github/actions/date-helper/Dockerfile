FROM node:10-slim

LABEL com.github.actions.name="date-helper"
LABEL com.github.actions.description="Give back the appropriate routine number"
LABEL com.github.actions.icon="clock"
LABEL com.github.actions.color="black"

# Copy the action's code into the container
COPY . .

# Install dependencies
RUN yarn

# Start node app
ENTRYPOINT [ "node", "/index.js" ]