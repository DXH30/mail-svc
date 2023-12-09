#!/usr/bin/bash

# Replace with your server's address and port
SERVER_URL="http://localhost:3000"

# Replace with the recipient email address
TO_EMAIL="recipient@example.com"

# Replace with the path to the file you want to attach
FILE_PATH="file.txt"

# Make a POST request with curl
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "email=${TO_EMAIL}" \
  -F "subject=Test Subject" \
  -F "text=Test Text" \
  -F "attachment=@${FILE_PATH}" \
  ${SERVER_URL}/send

