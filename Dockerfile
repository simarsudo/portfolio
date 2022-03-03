FROM python

WORKDIR /portfolio

COPY requirements.txt /portfolio

RUN pip install --no-cache-dir -r requirements.txt

COPY . /portfolio

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 portfolio.wsgi
