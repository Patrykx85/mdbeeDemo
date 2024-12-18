npm run build

##
pipenv shell

sudo systemctl restart gunicorn


to start:
docker compose up

create admin
docker compose exec api /bin/bash
python manage.py createsuperuser
