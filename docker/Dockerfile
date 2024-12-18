FROM python:3.12-slim-bookworm as api
ENV PYTHONUNBUFFERED 1

# Make sure the image is up to date
RUN apt-get update && apt-get upgrade -y && apt-get install -y cron binutils libproj-dev gdal-bin tzdata libpango-1.0-0 libpangoft2-1.0-0
# RUN apt-get update && apt-get upgrade -y && apt-get install -y binutils libproj-dev gdal-bin tzdata libpango-1.0-0 libpangoft2-1.0-0
# RUN apt-get -y install python3-pip python3-cffi python3-brotli libpango-1.0-0 libpangoft2-1.0-0
RUN apt clean

# # Add crontab file in the cron directory
# ADD crontab /etc/cron.d/hello-cron

# # Give execution rights on the cron job
# RUN chmod 0644 /etc/cron.d/hello-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Install Pipenv that will install all other Python dependencies
# Since recent versions have an unsolved issue we're using an older version
# (see: https://github.com/pypa/pipenv/issues/4220)
RUN pip install pipenv==2024.3.0

# Create the folder for storing the code
RUN mkdir /code
WORKDIR /code

# Install Python dependencies
COPY mdbeeapi/Pipfile* /code/
RUN pipenv install  --system --deploy --ignore-pipfile 

# Copy the code over (a volume will be mounted over it for hot-reloading)
COPY mdbeeapi /code/

# Set the default command to run when the container starts
# CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000
CMD python manage.py migrate && python manage.py collectstatic --no-input && /etc/init.d/cron start && run-program gunicorn mdbeeapi.wsgi:application --bind 0.0.0.0:8000



FROM node:21-bookworm-slim as frontend
WORKDIR /mdbee
COPY mdbee/package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
