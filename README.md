Google Review Project 

1. clone the repo 
    git clone ...

2. create virtual environment 
    python3 -m venv venv_google_review 

    source venv_google_review/bin/activate 

3. install the requirements.txt
    pip install -r requirements.txt 

4. copy .env.example file
    cp .env.example .env 

5. install node modules
    cd frontend
    npm install

======= Production==========

6. Create runtime.txt
    python --version > runtime.txt

7. Create requirements.txt
    pip freeze > requirements.txt

8. Create Procfile

9. python manage.py collectstatic

10.procfile 
    web: gunicorn google_review_project.wsgi --error-logfile logs/error.log --log-file logs/access.log