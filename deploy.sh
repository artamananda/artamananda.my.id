# !/bin/bash
echo "----- Migration: Started -----"

echo "===== Migrate DB Project ====="
npx prisma migrate dev

echo "----- Migration: Finished -----"

yarn run start