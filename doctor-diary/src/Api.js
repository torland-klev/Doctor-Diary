//const authKey = 'Basic ' + btoa('AkselJ:District1-');
const authKey = 'Basic ' + btoa('BjarneB:District1-');
const url = 'https://course.dhis2.org/dhis/api';
const STATUS_ID = "zrZADVnTtMa";
const FIRST_NAME_ID = "w75KJ2mc4zz";
const LAST_NAME_ID = "zDhUuAYrxNC";

class Api{
  config = {
    baseURL: ''
  };

  setConfig = config => {
    this.config = config;
  };


  /*******************************
  ***  From HealthOfficerHome  ***
  *******************************/

  fetchReports(){
		return fetch(this.config.baseURL + '/me', {
			method: 'GET',
      mode: 'cors',
			headers: {
				'Authorization': authKey
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
        var ou = [];
	      responseJson.teiSearchOrganisationUnits.forEach((el) => {
          ou.push(el);
				})
        return ou;
	    })
	    .catch((error) => {
	      console.error(error);
	    }
		);
  }

  fetchOuName(id){
    const url2 = '/organisationUnits/' + id;
    var obj = {name: "", id: ""};
    return fetch(this.config.baseURL + url2, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': authKey
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        obj = {
          name: responseJson.name,
          id: id
        }
        return obj;
      })
      .catch((error) => {
        console.error(error);
      }
    );
  }

  /****************************
  ***  From MainReportList  ***
  ****************************/

  fetchReportsForList(url2){
		return fetch(this.config.baseURL + url2, {
			method: 'GET',
      mode: 'cors',
			headers: {
				'Authorization': authKey
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
        var reports = [];
        var approved = [];
        var rejected = [];
        var pending = [];
        var others = [];
        var noStatus = [];
	      responseJson.events.forEach((el) => {
          reports.push(el);
          var hasStatus = false;
          el.dataValues.forEach( (dv) => {
            if (dv.dataElement === STATUS_ID){
              hasStatus = true;
              switch(dv.value.toUpperCase()){
                case "APPROVED":
                  approved.push(el);
                  break;
                case "REJECTED":
                  rejected.push(el);
                  break;
                case "PENDING":
                  pending.push(el);
                  break;
                default:
                  others.push(el);
              }
            }
          })
          if(!hasStatus){
            noStatus.push(el);
          }
				})
        const results = {
          reports: reports,
          approved: approved,
          rejected: rejected,
          pending: pending,
          others: others,
          noStatus: noStatus
        }
        return results;
	    })
	    .catch((error) => {
	      console.error(error);
	    }
		);
  }

  /**************************
  ***  From ReportHolder  ***
  **************************/

  fetchElementName(id){
		//Fetch the attributes
		const url2 = '/dataElements/' + id;
		return fetch(this.config.baseURL+url2, {
			method: 'GET',
      mode: 'cors',
			headers: {
				'Authorization': authKey
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
	      const el = responseJson;
				var element = {
					name: el.name,
					id: id
				};
				return element;
			})
	    .catch((error) => {
	    }
		);
	}

  /************************
  ***  From ReportList  ***
  ************************/

  getTeiName(id){
		var firstname = '';
		var lastname = '';
		//Fetch the attributes
		const url2 = '/trackedEntityInstances/' + id;
		return fetch(this.config.baseURL+url2, {
			method: 'GET',
      mode: 'cors',
			headers: {
				'Authorization': authKey
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
	      responseJson.attributes.forEach((el) => {
					if (el.attribute === FIRST_NAME_ID){
						firstname = el.value;
					}
					else if (el.attribute === LAST_NAME_ID) {
						lastname = el.value;
					}
				})
				return (firstname + " " + lastname);
	    })
	    .catch((error) => {
	    }
		);
	}

	////////////////////////////////////

	/************************
  **from ConfirmSendReport*
  ************************/

 	findTeiOrgUnit(){

		var TeiOrgUnitID = "";

		return fetch(this.config.baseURL + "/me", {
				method: 'GET',
        mode: 'cors',
				headers: {
					'Authorization': authKey
				}
			}).then(function (response){
				return response.json();
			}).then(function (data){

				TeiOrgUnitID = data.teiSearchOrganisationUnits[0].id;

				return TeiOrgUnitID;
			})
	}

	findTrackedEntityInstance(teiOrgID, programID){

		var trackedEntityID = "";

		var filters = "/trackedEntityInstances.json?ou=" + teiOrgID + "&program=" + programID;

		return fetch(this.config.baseURL + filters, {
				method: 'GET',
        mode: 'cors',
				headers: {
					'Authorization': authKey
				}
			}).then(function (response){
				return response.json();
			}).then(function (data){
				trackedEntityID = data.trackedEntityInstances[0].trackedEntityInstance;

				return trackedEntityID;
			})
	}

	findProgramStage(){

		var programID = "r6qGL4AmFV4"; //Hardcoded 'Anaesthetist - PBR monitoring' ID
		var programStageID = "";

		return fetch(this.config.baseURL + "/programs/" + programID, {
			method: 'GET',
      mode: 'cors',
			headers: {
				'Authorization': authKey
			}
		}).then(function (response){
			return response.json();
		}).then(function (data){

				programStageID = data.programStages[0].id;

				return programStageID;
		})
	}

	sendDataToApi(eventElement){

		fetch(this.config.baseURL+"/events", {
			method: 'POST',
			//credentials: 'include', //skal være med på deploy
			mode: 'cors',
			headers: {
				'Authorization': authKey, //FJERNES VED DEPLOY
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify(eventElement)
		}).then(function(response) {

			return response.json();
		})
	}



	///////////////////////
	//From NewEntry

	findDataElementIDs(){

		var programID = "r6qGL4AmFV4"; //Hardcoded 'Anaesthetist - PBR monitoring' ID
		var programStageID = "";
		var dataElementIDs = [];

		var self = this;

		return fetch(this.config.baseURL + "/programs/" + programID, {
			method: 'GET',
      mode: 'cors',
			headers: {
				'Authorization': authKey
			}
		}).then(function (response){
			return response.json();
		}).then(function (data){

				programStageID = data.programStages[0].id;

				return fetch(self.config.baseURL + "/programStages/" + programStageID,{
					method: 'GET',
          mode: 'cors',
					headers: {
					'Authorization': authKey
					}
				}).then(function (response){

						return response.json();

				}).then(function (data){

						data.programStageDataElements.forEach((element) => {

							dataElementIDs.push(element.dataElement.id);
						})

						return dataElementIDs;
				})

		})
	}


	findDataElementContent(id){
  	return fetch(this.config.baseURL + "/dataElements/" + id, {
  		method: 'GET',
      mode: 'cors',
  		headers: {
  		'Authorization': authKey
  		}
  	}).then(function (response){
  		return response.json().then(function (data){

  		var newElement = {
  				"name": data.name,
  				"id": data.id,
  				"valueType": data.valueType,
  		};

  		return newElement;
  		}).catch(function (error){
        console.error(error);
  		})
  	})
	}

/////////////////////////////
	//APP.JS

	checkRole(){

		var role = "";
		return fetch(this.config.baseURL + "/me", {
			method: 'GET',
      mode: 'cors',
			headers: {
			'Accept': 'application/json',
			'Authorization': authKey,
		}
		}).then(function(response){
			return response.json().then(data => {
				var doctorRoleID = "kNIhGGdyWFp";
				//var doctorRoleID = "noe"; //for testing at man kommer til hjemsiden hvis ingen gyldig rolle
				var dhoRoleID = "RYOicE8XVw9";
				var roles = [];

				data.userCredentials.userRoles.forEach(element => {
						roles.push(element.id);
				})

				if(roles.includes(doctorRoleID)){
					role="doctor";
					return Promise.resolve(role);


				}else if(roles.includes(dhoRoleID)){
					role="dho"
					return Promise.resolve(role);

				}
			}).catch(function (error){
				return "error";
			})
		})
	}

  UpdateDataToApi(eventElement){

    var id = eventElement.event;

    fetch(this.config.baseURL + "/events/" + id, {
      method: 'PUT',
      //credentials: 'include', //skal være med på deploy
      mode: 'cors',
      headers: {
        'Authorization': authKey, //FJERNES VED DEPLOY
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(eventElement)
    }).then(function(response) {
      return response.json();
    })
  }

/////////////////////////////
// ApproveReject
UpdateDataToApiAR(eventElement){
    var id = eventElement.event;
    return fetch(this.config.baseURL + "/events/" + id, {
      method: 'PUT',
      //credentials: 'include', //skal være med på deploy
      mode: 'cors',
      headers: {
        'Authorization': authKey, //FJERNES VED DEPLOY
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(eventElement)
    }).then(function(response) {
      return response.status;
    })
}




}

export default new Api();
