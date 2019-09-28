import React,{Component} from 'react'
import styles from "./SearchPanel.module.css";

class SearchPanel extends Component{
    state = {
        term:''
    };
    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    };
    render() {
        return(
            <div className="input-group mb-3">
                <input type="text" className={`${"form-control"} ${styles.form_control} ${styles.no_shadow}`} placeholder="Payment, transfer or deposit"
                       aria-label="Payment, transfer or deposit" aria-describedby="basic-addon2" value={this.state.term} onChange={this.onSearchChange}/>
            </div>
        )
    }
}

export default SearchPanel;