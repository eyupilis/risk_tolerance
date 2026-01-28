#!/usr/bin/env bash
# Render.com build script for IPS System

set -o errexit

pip install --upgrade pip
pip install -r requirements.txt
