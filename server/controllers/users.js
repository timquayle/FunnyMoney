
const Users = require("../models/user.js");
const bcrypt = require('bcrypt-as-promised');
const BCRYPT_ENABLE = false;
module.exports = {


    logincheck: function(req, res) {
        console.log("CHECKING FOR AUTHORIZATION")
          bad_log = {
              email: '',
              count:  0,
            }
            bad_user = {
              email: '',
              time:  0,
             
            }
            bad_list = [];
            bad_users = [];
          console.log(req.body.email)
          Users.findOne({
              email: req.body.email
          }, function(err, user) {
              if (err) {
                  console.log("user not found",err)
                  
              } else {
                  //if no user was returned, its not in our db, load a flash error and make em relogin
                  if (!user) {
                      console.log("WE ARE HERE!")
                      console.log("invalid username or password")
                      res.json('invalidlogin');
                     // res.redirect('/')
                  }
                  //a user was returned
                  else {
                      console.log("Found User")
                      console.log("UP ", user)
                      console.log(req.body.password)
                     //get bad_users
                     if (typeof req.session.bad_users != 'undefined')   {
                      bad_users = req.session.bad_users;
                      console.log("new bad users: ",bad_users);
                      console.log("we have a bad users list")               
                  }
                     //compare req.body.email vs our bad_users
                     console.log("pre bad users: ",bad_users);
                       j = bad_users.findIndex(o => o.email === req.body.email);
                      console.log("FOUNDINDEX ",j) 
                      console.log("BULENGth", bad_users.length)
                      //is user guilty? meaning he is found in bad_users list, meaning i(index) is not = -1
                    if (j != -1)   {    
                    
                      console.log("user is on bad_users list")
                      //get current time in ms
                      const curtime = (new Date).getTime();
                      const usertime = bad_users[j].time;
                      console.log("userstotime", usertime)
                      console.log("currenttime", curtime)
                      // is current_time 3,600,000ms(1 hour) past time listed in bad_users.time ?   
                      if(curtime > usertime+3600000)  {
                          // yes, remove them from bad_users
                          console.log("Time is over! deleting!")
                          bad_users.splice(j,1);
                          console.log("deleted bad users: ",bad_users);
                          req.session.bad_users=bad_users;
                          console.log("SESSION BAD USERS ",req.session.bad_users);
                          req.session.save();
                          //call our original logincheck function, to check users password
                          users.logincheck(req,res);
                          
                      }        
                      else {
                         // no, res_json('bad5times) telling them they have to wait an hour
                          res.json('5timesbad')
                      }
                                    
                                                      }
                     //they are not in bad users list, proceed as normal
                      else {
                      //check given password vs password stored in our db
                   if(BCRYPT_ENABLE){
                      bcrypt.compare(req.body.password, user.password)
                          .then(result => {
                              console.log("Successful Password Match")
                              //store our session variable identifier
                              Users.findOne({email: req.body.email}, function(err, user) {
                              console.log("thiS USER:",user._id);
                              req.session.userid = user._id;
                              console.log("ID ",req.session.userid);
                              req.session.email = req.body.email;
                              console.log(req.session.email);
                               req.session.save();
                               res.json('valid');
                              
                          });
                             
                          })
                          .catch(error => {
                             if (typeof req.session.bad_list != 'undefined')   {
                              bad_list = req.session.bad_list;
                                                                        }
                             if (typeof req.session.bad_users != 'undefined')   {
                               bad_users = req.session.bad_users;
                                                                              }
                              console.log("BAD USERS!",bad_users)
                              console.log("Password Mismatch");
                              const i = bad_list.findIndex(o => o.email === req.body.email);
                              console.log("BADLIST",bad_list);
                              console.log("IIS",i)
                             //is are user guilty of previous bad login attempts? branch here.
                             // value is -1 if find is negative (??)
                             if (i != -1)   {
                                 console.log("OLDBRANCH");
                                  bad_list[i].count++;
                                console.log("BL",bad_list)
                                console.log("COUNT:",bad_list[i].count)
                                req.session.bad_list = bad_list;
                                req.session.save();
                                //if the badlogin count has reached 5 we add them to the "bad_users" list along with time in ms
                                if(bad_list[i].count > 4)
                                {
                                  console.log("GOT1!!!!!!!!!!!!!!!!!")
                                  bad_user.email = bad_list[i].email;
                                  bad_user.time = (new Date).getTime();
                                  bad_users.push(bad_user);
                                  //remove user from our 'bad list', because he is now in the bad_users array.
                                  bad_list.splice(i,1);
                                  req.session.bad_list = bad_list;
                                  req.session.bad_users=bad_users;
                                  req.session.save();
                                  console.log("BU",bad_user);                   
                                  console.log("NEW BAD LIST!!!!!!!!!!!!!!!!!!!!",req.session.bad_list);
                                  res.json('5timesbad');           
                                 }   
                               //our bad login count is less than 5, just return an invalid credentials string
                                 else {
                                  res.json('invalidpassword');
                                     }
                              
                              }
                              //if user is not in the bad_list, we will add him
                              else{
                                
                                  console.log("NEWBRANCH")
                                 bad_log.email = req.body.email;
                               bad_log.count = 1;
                               console.log("BADLOG",bad_log);
                               bad_list.push(bad_log);
                               req.session.bad_list = bad_list;
                               req.session.save();
                               console.log("BADLIST",req.session.bad_list);
                               res.json('invalidpassword')
                              }
                             
                          
                          })
                      }
                   //non bcrypt path
                      else {
                      if(req.body.password===user.password)
                        {
                          console.log("Successful Password Match")
                          //store our session variable identifier
                          Users.findOne({email: req.body.email}, function(err, user) {
                          console.log("thiS USER:",user._id);
                          req.session.userid = user._id;
                          console.log("ID ",req.session.userid);
                          req.session.email = req.body.email;
                          console.log(req.session.email);
                           req.session.save();
                           res.json('valid');
                          
                                  });
                             }  
                      
                      else {
                         if (typeof req.session.bad_list != 'undefined')   {
                          bad_list = req.session.bad_list;
                                                                    }
                         if (typeof req.session.bad_users != 'undefined')   {
                           bad_users = req.session.bad_users;
                                                                          }
                          console.log("BAD USERS!",bad_users)
                          console.log("Password Mismatch");
                          const i = bad_list.findIndex(o => o.email === req.body.email);
                          console.log("BADLIST",bad_list);
                          console.log("IIS",i)
                         //is are user guilty of previous bad login attempts? branch here.
                         // value is -1 if find is negative (??)
                         if (i != -1)   {
                             console.log("OLDBRANCH");
                              bad_list[i].count++;
                            console.log("BL",bad_list)
                            console.log("COUNT:",bad_list[i].count)
                            req.session.bad_list = bad_list;
                            req.session.save();
                            //if the badlogin count has reached 5 we add them to the "bad_users" list along with time in ms
                            if(bad_list[i].count > 4)
                            {
                              console.log("GOT1!!!!!!!!!!!!!!!!!")
                              bad_user.email = bad_list[i].email;
                              bad_user.time = (new Date).getTime();
                              bad_users.push(bad_user);
                              //remove user from our 'bad list', because he is now in the bad_users array.
                              bad_list.splice(i,1);
                              req.session.bad_list = bad_list;
                              req.session.bad_users=bad_users;
                              req.session.save();
                              console.log("BU",bad_user);                   
                              console.log("NEW BAD LIST!!!!!!!!!!!!!!!!!!!!",req.session.bad_list);
                              res.json('5timesbad');           
                             }   
                           //our bad login count is less than 5, just return an invalid credentials string
                             else {
                              res.json('invalidpassword');
                                 }
                          
                          }
                          //if user is not in the bad_list, we will add him
                          else{
                            
                              console.log("NEWBRANCH")
                             bad_log.email = req.body.email;
                           bad_log.count = 1;
                           console.log("BADLOG",bad_log);
                           bad_list.push(bad_log);
                           req.session.bad_list = bad_list;
                           req.session.save();
                           console.log("BADLIST",req.session.bad_list);
                           res.json('invalidpassword')
                          }       
                      }
                    }         
                  
                   }
                  
                  }
              
              }
          
          })
      
      },
      usersadd: function(req, res) {
        //const note = req.body;
        console.log("passed user:",req.body);
      if(BCRYPT_ENABLE)  {
        bcrypt.hash(req.body.password, 10)
        .then(hashed_password => {
            console.log(hashed_password);
         const user = new Users({firstname: req.body.firstname, lastname: req.body.lastname,
                       email: req.body.email, password: hashed_password});
         user.save(function (err, saved) {
           Users.findOne({email: req.body.email}, function(err, user) {
           console.log("thiS USER:",user);
           req.session.userid = user._id;
           console.log("ID ",req.session.userid);
           req.session.email = req.body.email;
           console.log(req.session.email);
            req.session.save();
            res.json('registered');
           
           }) 
       })
        
   
   
   
                                 })
                      
                               }
       //none bcrypt path
                               else {
           const user = new Users({firstname: req.body.firstname, lastname: req.body.lastname,
               email: req.body.email, password: req.body.password, money: 100000});
               user.save(function (err, saved) {
                   Users.findOne({email: req.body.email}, function(err, user) {
                   console.log("thiS USER:",user);
                   req.session.userid = user._id;
                   console.log("ID ",req.session.userid);
                   req.session.email = req.body.email;
                   console.log(req.session.email);
                    req.session.save();
                    res.json('registered');
                   
                   }) 
               })
      
      
      
           }
                     
                     
                     
                           },
 


getcontact: function(req,res) {

    console.log("getting contact ",req.params.id)
    Users.find({_id: req.params.id},function(err, users) {
        res.json(users);
        console.log(err);
      })
    },
        getsessionid: function(req,res) {
            if (typeof req.session.userid === 'undefined')   {
            res.json('nosessionid');
            }
            else {console.log(req.session.userid);
            res.json(req.session.userid);
            }
        },
        removesessionid: function(req,res) {
            console.log('removing sessionid!');
                  delete req.session.userid;
                  delete req.session.email;
                  req.session.save();
                  res.json('session removed')
                },
       
 usersgetall: function(req,res){
    console.log("getting all users!")
    Users.find({}, function(err, users) {
     if(err){
         res.json(err)
     }
     else{
        console.log("USERS:",users);
        res.json(users);
     }
     })
 },
 userget: function(req,res){
    console.log("getting current user")
    Users.findOne({_id: req.session.userid}, function(err, user) {
     if(err){
         res.json(err)
     }
     else{
        console.log("USERS",user);
        res.json(user);
     }
     })
 },
 changeMoney: function(req,res) {
     Users.findOneAndUpdate({_id: req.session.userid }, {$inc: {money: req.params.money}}, function (err, user) {
    if (err) {console.log("updateError",err);  res.json(err);     }
    else {res.json(user);
        console.log("UPDATED",user)}
  })                               
}
}