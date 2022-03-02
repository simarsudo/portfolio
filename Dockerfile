FROM python

WORKDIR /portfolio

COPY requirements.txt /portfolio

RUN pip install -r requirements.txt

COPY . /portfolio

CMD gunicorn --workers=1 --timeout 600 portfolio.wsgi
