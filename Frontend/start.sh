#!/bin/sh
# Substitute PORT in nginx config (default to 80 if not set)
sed -i "s/\${PORT}/${PORT:-80}/g" /etc/nginx/conf.d/default.conf
echo "Starting nginx on port ${PORT:-80}"
cat /etc/nginx/conf.d/default.conf | head -3
exec nginx -g 'daemon off;'
