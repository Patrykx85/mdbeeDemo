# Notes and Recordings App

## Assumptions:
- Each note can contain multiple recordings.
- A recording is deleted along with the note.
- Users are automatically activated upon registration due to the lack of email confirmation (or any other confirmation method).
- 

## Running the Application

The application is based on **Docker** and requires using `docker-compose` to run the containers.

### Step 1: Clone the repository

First, clone the repository to your local machine:

```bash
git clone <REPOSITORY_URL>
```

### Step 2: Start the application
To start the application, navigate to the directory where the docker-compose.yml file is located and run the following command:
```bash
docker-compose up
```

This command will start all necessary containers (backend, frontend, and database) and create datamodel in database using additional container - api_migrations.

### Step 3: Access the application

Once the containers are up and running, the application will be accessible at:

```bash
http://localhost:3000
```

Simply open this URL in your browser to start using the application.


## Technologies Used:
    Frontend: React.js
    Backend: django + django rest framework
    Database: postgres

## Prerequisites:
    Docker and Docker Compose must be installed on your system.

## Authors:
    Patryk Blachowski