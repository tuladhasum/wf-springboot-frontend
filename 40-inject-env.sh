#!/bin/sh
echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
echo "  BACKEND_API_URL: \"${BACKEND_API_URL}\"" >> /usr/share/nginx/html/env-config.js
echo "};" >> /usr/share/nginx/html/env-config.js
