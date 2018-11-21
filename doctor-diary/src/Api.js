/* TODO: SLETTE DENNE FILEN? */

const baseURL = "https://course.dhis2.org/dhis/api/";

class Api {

    /*
    TILTENKT AA BRUKES FOR AA KOMBINERE checkAuthentication og getDoctorDiaryRoles


    roles = {
        'doctorID': '',
        'dhoID': ''
    };

    rolesSetup(doctorID, dhoID){

        this.roles.doctorID = doctorID;
        this.roles.dhoID = dhoID;

        console.log("NEW doctorID: " + doctorID + " | NEW dhoID: " + dhoID);
    }

    printRoles(){

        console.log("printRoles: " + this.roles.doctorID + " | " + this.roles.dhoID);


    }
    */


    /* Tror dette kan gjøres i App.js */


    checkAuthenication(user, pass){
        var authKey = 'Basic ' + btoa(user + ':' + pass);

        return fetch(baseURL + '/me', {
            method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Authorization': authKey,
            }
        }).then(function(response){ 
            
            var profile = {
                'exists': false,
                'user': "",
                'role': "",
            };

            return response.json().then(function (data){

                //var orgTarget = "ImspTQPwCqd"
                var doctorRoleID = "kNIhGGdyWFp";
                var dhoRoleID = "RYOicE8XVw9";

                var user = data.name;
                var userRoles = [];
            
                data.userCredentials.userRoles.forEach(element => {
                    userRoles.push(element.id);
                })

                if(userRoles.includes(doctorRoleID)){
                        
                    //console.log("inne i doctor");
            
                    profile.exists = true;
                    profile.user = user;
                    profile.role = "doctor";
                        
                }else if(userRoles.includes(dhoRoleID)){
            
                    //console.log("inne i dho");
            
                    profile.exists = true;
                    profile.user = user;
                    profile.role = "dho";
                }
                
                return profile;
            }).catch(function (error){
                console.log("User not found");
                return profile;
            }) 
        }) 
    }

    //Ikke i bruk noen steder
    getDoctorDiaryRoles(user, pass){
    
        var authKey = 'Basic ' + btoa(user + ':' + pass);

        return fetch(baseURL + '/userRoles', {
            method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Authorization': authKey,
            }
        }).then(function(response){ 

            //var diaryRoles = [];

            return response.json().then(function (data){

                //console.log(data);

                var dho = '';
                var doc = '';

                data.userRoles.forEach(element => {

                    /*
                    var role = {

                        'roleName': "",
                        'roleID': "",
                    }
                    */

                    if(element.displayName === "DHO"){

                        //role.roleName = "DHO";
                        //role.roleID = element.id;
                        //diaryRoles.push(role);

                        dho = element.id;
                    }

                    if(element.displayName === "Doctor"){
                        
                        //role.roleName = "Doctor";
                        //role.roleID = element.id;
                        //diaryRoles.push(role);

                        doc = element.id;
                    }
                    
                })
                console.log("OPPDATERER! " + doc + " " + dho);
                this.rolesSetup(doc, dho);
                //return diaryRoles;

            }).catch(function (error){

                //console.log(error);
            })
        })

    }



  
}

export default new Api();