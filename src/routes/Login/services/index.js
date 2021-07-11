import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import Users from '../../../statics/users.json'

function useLogin() {
    const validUsers = Users
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    return {
        userName,
        setUserName,
        password,
        setPassword,
        isValid,
        isSubmit,
        onSubmit,
    }

    function onSubmit() {
        setIsSubmit(true);
        const user = validUsers.find(user => user.userName === userName);
        if(user && user.password === password) {
            setIsValid(true)
            history.push('/dishes')
        } else {
            setIsValid(false);
        }
    }
}

export {
    useLogin
}
