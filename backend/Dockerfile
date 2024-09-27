FROM python:3.11-slim-bullseye

ENV PYTHONUNBUFFERED=1
WORKDIR /usr/src/backend

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
COPY ./src .
