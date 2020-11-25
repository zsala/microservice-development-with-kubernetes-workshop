#!/usr/bin/env sh
eval $(minikube docker-env)

export REMOTE_HOST=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -n 1)

# Build Image
docker build \
-t 'test-backend:dev' \
-f ./docker/Dockerfile \
.

# Mount Project to Minikube for user hive
if grep -Eo none ~/.minikube/machines/minikube/config.json ; then
    # --vm-driver=none: create top-level symlink
    ln -Ts "$(pwd)" "/test-backend"
else
    minikube mount "$(pwd):/test-backend" --uid 999 --9p-version=9p2000.L &
fi

# Deploy to K8s
kubectl config use-context minikube
kubectl apply -f charts/ --namespace=workshop
