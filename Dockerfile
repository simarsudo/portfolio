FROM python

WORKDIR /portfolio

COPY requirements.txt /portfolio

RUN pip install -r requirements.txt

COPY . /portfolio

EXPOSE 8080

ENV PORT 8080

CMD gunicorn --bind :$PORT --workers=2 portfolio.wsgi:application
