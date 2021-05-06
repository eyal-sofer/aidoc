FROM python:3
# Set application working directory
ADD app.py /
# Install requirements
RUN pip install flask
RUN pip install flask_restful
RUN pip install sys
# Install application
EXPOSE 80
# Run application
CMD python app.py
