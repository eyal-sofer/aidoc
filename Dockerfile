FROM python:3
# Set application working directory
ADD app.py /
# Install requirements
RUN pip install flask
RUN pip install flask_restful
# Install application
EXPOSE 80
#define Env variable
ENV BUILD_NUM=${BUILD_NUM:-NOT_DEFINED}
# Run application
CMD python app.py
