#!/bin/bash

# Set up some variables (optional)
PROJECT_DIR="./"  # Change to your actual project directory
VENV_DIR="myvenv"  # Name of the virtual environment directory
REQUIREMENTS_FILE="requirements.txt"  # Change if your requirements file has a different name

# Function to print messages
echo "Starting project setup..."

# Step 1: Navigate to the project directory
echo "Navigating to the project directory..."
cd "$PROJECT_DIR" || { echo "Project directory not found!"; exit 1; }

# Step 2: Create a virtual environment
echo "Creating virtual environment..."
python3 -m venv "$VENV_DIR" || { echo "Failed to create virtual environment!"; exit 1; }

# Step 3: Activate the virtual environment
echo "Activating virtual environment..."
# For bash/zsh:
source "$VENV_DIR/bin/activate"

# Step 4: Install dependencies from requirements.txt
if [ -f "$REQUIREMENTS_FILE" ]; then
    echo "Installing dependencies from $REQUIREMENTS_FILE..."
    pip install -r "$REQUIREMENTS_FILE" || { echo "Failed to install dependencies!"; exit 1; }
else
    echo "$REQUIREMENTS_FILE not found!"
    exit 1
fi

# Step 5: Make and apply migrations
echo "Making migrations..."
python3 manage.py makemigrations || { echo "Failed to make migrations!"; exit 1; }

echo "Applying migrations..."
python3 manage.py migrate || { echo "Failed to apply migrations!"; exit 1; }

echo "making walmart migrations..."
python3 manage.py makemigrations walmart || { echo "Failed to make migrations!"; exit 1; }


echo "Project setup complete!"
