#!/usr/bin/env sh
echo "${USER_KOOR}" > /etc/nginx/conf.d/.htpasswd
echo "${USER_ADMIN}" > /etc/nginx/conf.d/.htpasswd_admin