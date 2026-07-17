#!/bin/bash
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -print0 | while IFS= read -r -d '' file; do
  # Use temporary placeholders to avoid double replacement
  sed -i -E \
    -e 's/text-xs/TEMP_SM/g' \
    -e 's/text-\[10px\]/TEMP_SM/g' \
    -e 's/text-\[11px\]/TEMP_SM/g' \
    -e 's/text-\[12px\]/TEMP_SM/g' \
    -e 's/text-sm/TEMP_BASE/g' \
    -e 's/text-base/TEMP_LG/g' \
    -e 's/text-lg/TEMP_XL/g' \
    -e 's/text-xl/TEMP_2XL/g' \
    -e 's/text-2xl/TEMP_3XL/g' \
    -e 's/text-3xl/TEMP_4XL/g' \
    -e 's/text-4xl/TEMP_5XL/g' \
    -e 's/text-5xl/TEMP_6XL/g' \
    -e 's/text-6xl/TEMP_7XL/g' \
    -e 's/text-7xl/TEMP_8XL/g' \
    "$file"

  # Convert placeholders to final classes
  sed -i -E \
    -e 's/TEMP_SM/text-sm/g' \
    -e 's/TEMP_BASE/text-base/g' \
    -e 's/TEMP_LG/text-lg/g' \
    -e 's/TEMP_XL/text-xl/g' \
    -e 's/TEMP_2XL/text-2xl/g' \
    -e 's/TEMP_3XL/text-3xl/g' \
    -e 's/TEMP_4XL/text-4xl/g' \
    -e 's/TEMP_5XL/text-5xl/g' \
    -e 's/TEMP_6XL/text-6xl/g' \
    -e 's/TEMP_7XL/text-7xl/g' \
    -e 's/TEMP_8XL/text-8xl/g' \
    "$file"
done
