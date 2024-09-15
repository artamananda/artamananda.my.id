# !/bin/bash
MODE="production"

echo "----- Migration: Started -----"

echo "===== Migrate DB Project ====="
ENV_PATH=.env.$MODE npx sequelize-cli db:migrate --env $MODE

echo "----- Migration: Finished -----"

yarn run start