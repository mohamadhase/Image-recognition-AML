import uvicorn
from Recognition import app,logger

if __name__ == "__main__":
    file_name = __file__.split("/")[-1].split(".")[0].split("\\")[-1] # file name without extension
    logger.info("Server is Trying to Start ... ")
    uvicorn.run(f"{file_name}:app", host='0.0.0.0', port=8000, reload=True) 
    logger.info("Server is Start Succesfully ... ")
    
# to run the backend follow these steps : 
# 1. go to IMAGE-RECOGNETION-AML folder and open it in Command Line
# 2. Write cd back-end 
# 3. Write Python run.py 
# 4. the app should run in port 8000 // localhost:8000 