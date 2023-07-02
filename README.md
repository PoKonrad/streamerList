# Streamer Spotlight Full Stack Application

This project is a Streamer Spotlight full stack application that allows users to discover and showcase their favorite streamers. The application supports real-time updates using SocketIO.

## Installation

To run the application, you have two options depending on your preference and environment setup.

### Option 1: Docker

1. Ensure that you have Docker installed on your machine.

2. Clone this repository to your local machine.

3. Open a terminal or command prompt in the root directory of the project.

4. Run the following command to start the application using Docker:

   ```shell
   docker-compose up
   ```
his will build and run the necessary containers for both the frontend and backend. By default, the application runs on port 80. If you wish to change the port, you can modify it in the docker-compose.yml file before running the docker-compose up command.

### Option 2: NPM

1. Ensure that you have Node.js and npm (Node Package Manager) installed on your machine.

2. Clone this repository to your local machine.

3. Open a terminal or command prompt in the root directory of the project.

4. Install the required dependencies for both the frontend and backend by running the following command:

```shell
npm install
```

5. Start the frontend development server by running the following command:

```shell
npm run dev
```
This will start the frontend application on a development server.

6. Open another terminal or command prompt in the root directory of the project.

7. Start the backend server by running the following command:

```shell
npm run start:dev
```
This will start the backend server.

### Usage
Once the application is running, you can access it by opening a web browser and navigating to `http://localhost` or the port you specified if you changed it.

The Streamer Spotlight application provides the following features:
- Discover streamers: Browse and discover a list of streamers.
- Streamer details: View information about a specific streamer, including their description, platform and image
- Add streamers: Share your favorite streamers by adding them to the database
- Streamer rating: Upvote or Downvote specific streamers
- Real-time updates: Get real-time updates when a streamer is added or upvoted

### Technology Stack
#### Backend

- NestJS: A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.
- SQL lite: A lightweight, file-based database engine.
- TypeORM: An Object Relational Mapping (ORM) library that provides a convenient way to interact with the database.
- SocketIO: A library that enables real-time, bidirectional, and event-based communication between the browser and the server.

#### Frontend

- React: A JavaScript library for building user interfaces.
- React Query: A data fetching and caching library for React.
- React Router: A routing library for React applications.
- MUI (formerly Material-UI): A popular React UI framework.

Both the frontend and backend are written in TypeScript, which adds static typing and enhances developer productivity.
