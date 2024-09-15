# !/bin/bash
echo -n "Mode (local | development | staging | production): "
read MODE

if [ -z "$MODE" ]
then
  MODE="local"
fi

echo "----- Migration: Started -----"

echo "===== Migrate DB Project ====="
ENV_PATH=.env.$MODE npx sequelize-cli db:migrate --env $MODE

echo "----- Migration: Finished -----"