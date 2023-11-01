using Microsoft.EntityFrameworkCore;
using ServicifyDB.DBContents;
using ServicifyDB.Models;
using ServicifyDB.Services;

namespace ServicifyDB
{
    public class Program
    {
        static void Main()
        {
            //Testing program 

            //using (var context = new ServicifyDbContent())
            //{
            //    var user1 = new User()
            //    {
            //        userID = 1234,
            //        userType = new UserType()
            //        {
            //            Id = 1,
            //            userTypeDescription = "Professional",
            //        },
            //        userName = "Joshua Mazure",
            //        email = "jrmazure@mtu.edu",
            //        phone = 2314094967,
            //        skillSet = "Drywall",
            //        zip = 49428,
            //        userRate = 20,
            //    };
            //
            //    context.users.Add(user1); //adds class to the database
            //    context.SaveChanges(); //updates the databse
            //
            //    var myDb = context.users.ToList();
            //
            //    context.Purchases.Remove(purchase); //remove item in class with object reference
            //    context.Purchases.Update(purchase); //update item in class
            //
            //    var p = context.Purchases.FirstOrDefault(p => p.Product == "Shoes"); //finds the first purchase with the product name of shoes 
            //    var p1 = context.Purchases.Where(p => p.Price <= 100m); //gets list of objects where all purchases are less than 100
            //
            //
            //}
        }
    }

    



}
