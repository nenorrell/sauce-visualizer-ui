#!/bin/bash

echo "\n Checking if directories already exist..."
if [ -d "./generator-dist" ]; then
    printf '%s\n' "Removing generator-dist..."
    rm -rf "generator-dist"
fi
if [ -d "./dist" ]; then
    printf '%s\n' "Removing dist..."
    rm -rf "./dist"
fi

echo "Compiling app..."
make compile
make compile-generator

echo "Setting up dist folder..."
mkdir -p ./dist
mkdir -p ./dist/ui/static

echo "Moving generator-dist to dist..."
mv ./build/static/* ./dist/ui/static
mv ./generator-dist/* ./dist

echo "Done!"
