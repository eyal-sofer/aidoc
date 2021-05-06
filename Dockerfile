FROM python:3
# Set application working directory
ADD app.py /
# Install requirements
RUN pip install flask
RUN pip install flask_restful
# Install application
EXPOSE 80
# Run application
CMD python app.py $GITHUB_RUN_NUMBER
