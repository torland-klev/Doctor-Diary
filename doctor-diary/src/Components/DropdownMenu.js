import React from 'react';
import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

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
        <Dropdown>
            <DropdownTrigger>Set status</DropdownTrigger>
            <DropdownContent>
                <ul>
                    <li>
                        <a onClick={this.sendStatus.bind(this, "Approved")}>Approve</a>
                    </li>
                    <li>
                        <a onClick={this.sendStatus.bind(this, "Rejected")}>Reject</a>
                    </li>
                </ul>
            </DropdownContent>
        </Dropdown>
    );
}
}

export default DropdownMenu;
