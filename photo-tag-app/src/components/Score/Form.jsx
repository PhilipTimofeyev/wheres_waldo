import { React } from 'react'
import styles from './ScoreModal.module.css'

function Form({addHighScore}) {
    return (
        <>
            <form method='post' onSubmit={addHighScore} className={styles.form}>
                <div className={styles.formInput}>
                    <label htmlFor="username"><b>Enter Name</b> </label>
                    <input
                        type="text"
                        name="username"
                        id="userNameInputField"
                    />
                    <br />
                    <input
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        </>
    )
}

export default Form