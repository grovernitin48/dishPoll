import { useAuth } from '../../App';
import './index.css';

function Login() {
    const { userName, onSubmit, password, setPassword, setUserName, isValid , isSubmit} = useAuth();

    return (
        <div className="container">
            <div className="ui centered grid container">
                <div className="nine wide column">
                    <div className="ui fluid card">
                        <div className="content">
                            <form className="ui form">
                                <div className="field">
                                    <label>Username</label>
                                    <input type="text" name="user" placeholder="Username" onChange={handleUserName} value={userName} />
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <input type="password" name="pass" placeholder="Password" onChange={handlePassword} value={password} />
                                </div>
                                <button className="ui primary labeled icon button" onClick={handleOnSubmit}>
                                    <i className="unlock alternate icon"></i>
                                      Login
                                </button>
                                {!isValid && isSubmit ? (
                                    <div className="error">
                                        <div className="ui red basic label">
                                            Invalid Username or Password
                                        </div>
                                    </div>
                                ) : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function handleUserName(e) {
        setUserName(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleOnSubmit(e) {
        onSubmit();
        e.preventDefault();
    }
}

export default Login;
