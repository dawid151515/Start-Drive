namespace Start_Drive.API.Exceptions
{
    //error handling via middleware
    //this class inherits from Exception so that it can be called in the throw statement
    public class NotFoundException : Exception
    {
        //we create a constructor for this class with the message argument and add the base constructor from the exception class
        public NotFoundException(string message): base(message) { }
    }
}
