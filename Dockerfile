FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY ./back-end /app

COPY ./requirements.txt /app
WORKDIR /app

RUN pip install -r requirements.txt
RUN pip install google-cloud-storage google-cloud-vision

EXPOSE 8000

CMD ["python", "run.py"]
