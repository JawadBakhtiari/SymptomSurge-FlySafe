# Invoice Management Flask App

This repository contains a Flask application. The app provides various functionalities including account creation, sending emails, invoice creation, storage, and report generation. It integrates with MySQL for database storage and uses email for communication.

## Setup

To set up and run the Flask application, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/invoice-management.git
   cd invoice-management
   ```

2. Create a virtual environment and activate it:

   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Set up the MySQL database using the `database_storage_mysql.sql` script:

   ```sh
   mysql -u yourusername -p yourdatabase < src/database_storage_mysql.sql
   ```

5. Run the Flask application:
   ```sh
   python3 -m src.application
   ```

The server will start running on the port specified in the `src/config.py` file.

## Running Tests

To run tests, open two terminals. In the first terminal, start the server by executing:

```sh
python3 -m src.application
```
