# Use an official Python runtime as a parent image
FROM python:3.10.12

COPY . .

# Set working directory
# WORKDIR /google_review_project

# Copy the current directory contents into the container at /google_review_project
# COPY . /google_review_project

# Install system dependencies
# RUN apt-get update \
#     && apt-get install -y nodejs npm \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
# WORKDIR /google_review_project
RUN pip install -r requirements.txt

# Change directory to frontend and install Node.js dependencies
# WORKDIR /frontend
# RUN npm install

# Change directory back to the project root
# WORKDIR /google_review_project

# # Expose port 8000 to allow communication to/from server
# EXPOSE 8000

# # Copy the entrypoint script into the container
# COPY entrypoint.sh /entrypoint.sh

# # Grant execute permissions to the entrypoint script
# RUN chmod +x /entrypoint.sh

# # Set the entrypoint command
# ENTRYPOINT ["/entrypoint.sh"]

RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Start Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "google_review_project.wsgi:application"]