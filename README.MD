# Notes and Recordings App

## Assumptions
- Each note can contain multiple recordings.
- A recording is deleted along with the note.
- Users are automatically activated upon registration due to the lack of email confirmation (or any other confirmation method).
- **keys.env** (or any other file containing sensitive data, such as passwords or API keys) should never be committed to the repository. For the purpose of this demo, in order to avoid the tester having to create/copy this file manually, it has exceptionally been added to the repository.

## Running the Application

The application is based on **Docker** and requires using `docker-compose` to run the containers.

### Step 1: Clone the repository

First, clone the repository to your local machine:

git clone https://github.com/Patrykx85/mdbeeDemo


### Step 2: Start the application

To start the application, navigate to the directory where the `docker-compose.yml` file is located and run the following command:

docker-compose up


This command will start all necessary containers (backend, frontend, and database) and create the database schema using an additional container - `api_migrations`.

### Step 3: Access the application

Once the containers are up and running, the application will be accessible at:

http://localhost:3000


Simply open this URL in your browser to start using the application.

### Step 4: Logging In and Registering

Once the application has started, the user will be presented with the **login panel**.

- On the login panel, there is a **link to the registration panel**.
- You need to **register** by filling out the required details.
- After successful registration, the system will automatically **redirect you back to the login panel**.

Once you're redirected to the login panel, you can log in using the credentials you just created.

### Step 5: Adding a New Note

After logging in, the user will see the **Add New Note** panel, where they can:

- Enter a **title** for the note.
- Write a **description** for the note.
- Once the title and description are filled in, click the **Save** button to store the note.

The note will be saved and added to the list of notes.

### Step 6: Viewing the Notes List

After adding notes, the user can view them on the **Notes List**. The list will display all the notes the user has created.

- If the description of a note is too long, it will be automatically **truncated** to fit the available space.
- To view the full description of a note, the user can click on the **expand button (downward arrow)** next to the note to reveal the complete description.

### Step 7: Editing and Deleting Notes

On the left side of each note in the list, there are icons for **editing** and **deleting** a note.

- **Editing a note**:
  - Click the **edit icon** (pencil symbol) next to the note you want to edit.
  - The system will open an **edit panel** where the user can modify the note's title and description.
  - After making the changes, click **Save** to update the note.

- **Deleting a note**:
  - Click the **delete icon** (trash can symbol) next to the note you want to remove.
  - The system will prompt a confirmation message asking if you are sure you want to delete the note.
  - If confirmed, the note will be **permanently deleted** along with any associated recordings.

### Step 8: Voice Notes

After expanding a note, the user can add a voice recording by following these steps:

1. Click the **"Record New Voice Note"** button. This will open the voice recording panel.
2. In the recording panel, click the **"Start recording"** button.
   - The browser may ask for permission to access the microphone. Once granted, recording will begin.
3. The user can record their voice note until they click the **"Stop recording"** button.
4. After stopping the recording, the user can choose to **save the voice note** by clicking the **"Save this recording"** button.
   - The recording will then be uploaded and saved on the server, linked to the note.

### Step 9: Playing Voice Notes

Once a voice note is saved to the server, it will appear in the list of voice notes associated with the note, which can be viewed after expanding the note row.

1. To play a voice note, click the **"Download voice note"** button next to the recording you want to listen to.
2. After downloading, an **audio player** will appear next to the voice note.
3. The user can use the audio player to **listen to the voice note** by pressing the **play button** on the player.

The audio player will allow the user to control playback (play, pause, seek, etc.) of the voice note.

### Step 10: Running Automated Tests

To run the automated tests for the application, follow these steps:

1. **Log in to the API container**:
   First, enter the API container using the following command:

docker-compose exec api /bin/bash

2. **Run the tests**:
Once inside the container, run the following command to execute the automated tests:

python manage.py test

This will run all the automated tests defined in the Django project, ensuring that everything is working as expected.

## Technologies Used:
- **Frontend**: React.js
- **Backend**: Django + Django Rest Framework
- **Database**: Postgres

## Prerequisites:
- Docker and Docker Compose must be installed on your system.

## Authors:
- Patryk Blachowski