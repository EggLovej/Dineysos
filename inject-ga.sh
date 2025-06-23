#!/bin/bash
# Replace placeholder with actual GA ID during Vercel build
find . -type f -name "*.html" -exec sed -i "s|{{GA_MEASUREMENT_ID}}|$GA_MEASUREMENT_ID|g" {} \;