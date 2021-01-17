kubectl create namespace workshop

docker build \
-t 'test-front:dev' \
-f ./docker/Dockerfile \
.

# Build Image
docker build \
-t 'test-backend:dev' \
-f ./Dockerfile \
.
