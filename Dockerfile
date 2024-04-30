# Use an official Python runtime as a parent image
FROM ubuntu:latest

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update \
    && apt-get install -y python3 python3-pip python3-dev \
    && apt-get install -y nodejs npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /google_review_project

# Copy the current directory contents into the container at /google_review_project
COPY . /google_review_project

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Change directory to frontend and install Node.js dependencies
WORKDIR /google_review_project/frontend
RUN npm install

# Change directory back to the project root
WORKDIR /google_review_project

# Expose port 8000 to allow communication to/from server
EXPOSE 8000

# Start Django development server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
