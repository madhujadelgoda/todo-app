#!/usr/bin/env sh
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

if ! grep -q '^APP_KEY=base64:' .env; then
  php artisan key:generate --force
fi

echo "Waiting for PostgreSQL..."
until php -r '
$host = getenv("DB_HOST");
$port = getenv("DB_PORT");
$db = getenv("DB_DATABASE");
$user = getenv("DB_USERNAME");
$pass = getenv("DB_PASSWORD");

try {
    new PDO("pgsql:host={$host};port={$port};dbname={$db}", $user, $pass);
    exit(0);
} catch (Throwable $e) {
    exit(1);
}
'; do
  sleep 2
done

php artisan migrate --force

exec php artisan serve --host=0.0.0.0 --port=8000