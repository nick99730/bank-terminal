import React, {Component} from 'react'
import styles from './SignUpPage.module.css'


class SuccessfullyRegistration extends Component {
    render() {
        return (
            <div className={styles.thank_you}>
                <div className={`${styles.sign_up} mt-3 py-3 mx-auto`}>
                    <h5 className="d-flex pt-3 justify-content-center">Registration completed successfully!</h5>
                </div>
            </div>
        )
    }
}

export default SuccessfullyRegistration;