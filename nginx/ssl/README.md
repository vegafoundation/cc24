# SSL Certificates Directory

Place your SSL certificates here for production deployment:

- `cert.pem` - SSL Certificate
- `key.pem` - SSL Private Key

## For Development/Testing

Generate self-signed certificates:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem \
  -subj "/C=DE/ST=Niedersachsen/L=Goettingen/O=CarCompany24/CN=localhost"
```

## For Production

Use Let's Encrypt or your preferred CA:

```bash
# With certbot
certbot certonly --standalone -d yourdomain.com

# Copy certificates
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem key.pem
```
