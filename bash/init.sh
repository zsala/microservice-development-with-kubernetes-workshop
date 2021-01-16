kubectl create namespace workshop

docker build \
-t 'test-front:dev' \
-f ./docker/Dockerfile \
.