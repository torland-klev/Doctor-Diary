//REMOVE

// const authKey = btoa('AkselJ:District1-');
const authKey = 'Basic ' + btoa('BjarneB:District1-');
const url = 'https://course.dhis2.org/dhis/api';
const STATUS_ID = "zrZADVnTtMa";
const FIRST_NAME_ID = "w75KJ2mc4zz";
const LAST_NAME_ID = "zDhUuAYrxNC";

class Api {
  config = {
    baseUrl: url
  };

  setConfig = config => {
    this.config = config;
  };


  /*******************************
  ***  From HealthOfficerHome  ***
  *******************************/

  fetchReports(){
		return fetch(this.config.baseUrl + '/me', {
			method: 'GET',
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

  /****************************
  ***  From MainReportList  ***
  ****************************/

  fetchReportsForList(url2){
		return fetch(this.config.baseUrl + url2, {
			method: 'GET',
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
		return fetch(this.config.baseUrl+url2, {
			method: 'GET',
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
		return fetch(this.config.baseUrl+url2, {
			method: 'GET',
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

}

export default new Api();
