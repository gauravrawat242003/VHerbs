const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
     {
          email: {
               type: String,
               required: true,
          },
          password: {
               type: String,
               required: true, 
          },
          firstName: {
               type: String,
               required: true,
          },
          lastName: {
               type: String,
          },
          accountType: {
               type: String,
               enum: ["user", "admin"],
               default: "user",  
          },
          additionalDetails: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Profile",
          },
          bookmarks: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Herb",
          }
          ],
          notes: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Note",
          }
          ],
          likes: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Herb",
          }
          ],
          // these 2 will be used while resetting the password
          token: {
               type: String,
          },
          resetPasswordExpires: {
               type: Date,
          },
     },
     { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);