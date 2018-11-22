import React from 'react';
//import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown'; // npm install react-simple-dropdown

class DropdownMenu extends React.Component {


constructor(props) {
  super(props);
  this.status = props.status;
  this.sendStatus = this.sendStatus.bind(this)
}


sendStatus(status) {
    this.props.setStatus(status)
}


render() {
    return (
        //<Dropdown>
          //  <DropdownTrigger>Set status</DropdownTrigger>
            //<DropdownContent>
                <ul>
                    <li>
                        <a href='/' onClick={this.sendStatus.bind(this, "Approved")}>Approve</a> {/** Her må en href legges inn, / for nå */}
                    </li>
                    <li>
                        <a href='/'onClick={this.sendStatus.bind(this, "Rejected")}>Reject</a> {/** Her må en href legges inn, / for nå */}
                    </li>
                </ul>
            //</DropdownContent>
        //</Dropdown>
    );
}
}

export default DropdownMenu;
