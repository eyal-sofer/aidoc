FROM python:3
# Set application working directory
WORKDIR /usr/src/app
# Install requirements
RUN pip install flask
RUN pip install flask_restful
# Install application
COPY app.py ./
# Run application
CMD python app.py
