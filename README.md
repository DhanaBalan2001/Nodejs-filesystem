# Node.js File System API

  1. Overview :

   -  This project provides a simple yet powerful RESTful API built using Node.js and Express.js to manage text files in a designated directory. It utilizes the native Node.js fs (File System) module to create and list .txt files, with filenames and content based on the current timestamp. Designed for extensibility and ease of use, this project follows best practices for maintainability and error handling.

  2. Features :

   -  Create Timestamped Text File

   -  Generates a .txt file in the /files directory.

   -  The file’s name is based on the current timestamp in the format YYYY-MM-DDTHH-MM-SS.

   -  Retrieve All Text Files

   -  Fetches a list of all .txt files in the /files directory.
  
   -  Error Handling & Logging
   
   -  Provides comprehensive error handling.

   -  Uses winston for request and error logging.

 3. API Endpoints :
    
   -  POST /create-file:

       Creates a new timestamped file.

   -  GET /files:
   
       Lists all existing text files.

 4. Setup & Installation :
    
   -  Prerequisites:

      Node.js (version 14 or higher)

      npm (Node Package Manager)

      
