# Silver Umbrella - Full-Stack Blog Application

## Overview

Silver Umbrella is a full-stack blog application. It is built using React.js for the front-end and Ruby on Rails for the back-end. Users can sign up, sign in, and interact with blog posts, making it a versatile platform for sharing thoughts and ideas.

## Features

- **User Authentication:**

  - Users can sign up and sign in to their accounts securely.
  - Authentication is handled using Devise-API gem.

- **Blog Posts:**

  - Users can read, create and delete blog posts.
  - Each post can include a title, content, and banner.

- **Database:**
  - The application uses MySql to store user data and blog posts.

## Technologies Used

- **Front-end:**

  - React.js
  - React Router DOM
  - Redux Toolkit
  - React Query
  - TailwindCSS

- **Back-end:**

  - Ruby on Rails
  - Devise
  - JsonAPI::Resources

- **Database:**
  - MySql

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Ruby 3.1.1
- Rails 7.0.6
- Bundler 2.4.7
- MySql
- Node 18.17.1
- NPM 9.6.7

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ankkyprasad/silver-umbrella.git
    ```
2. Change into the project directory:

    ```bash
    cd silver-umbrella
    ```
3. Install dependencies:

    ```bash
    # Install front-end dependencies
    cd frontend
    npm install

    # Install back-end dependencies
    cd backend
    bundle install
    ```
4. Set up the database:

    ```bash
    # In the server directory
    rails db:create
    rails db:migrate
    rails db:seed
    ```
5. Start the development server:

    ```bash
    # In the backend directory
    rails server

    # In the frontend directory
    npm start
    ```
6. Access the application in your web browser at http://localhost:3000.