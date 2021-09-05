import { gql } from '@apollo/client';
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../contexts/auth";

export const loginMutationGQL = gql`
  mutation ($email: String!, $password: String!) {
    adminLogin(password: $password,  email: $email){
        id
        email
        name
        token
        role
    }
}`;

export const useLoginService = () => {
    const [, setAuthToken, removeAuthtoken] = useAuthToken();

    const [adminLogin, mutationResults] = useMutation(loginMutationGQL, {
        onCompleted: (data) => {
            if (data.adminLogin) {
                console.log(data.adminLogin)
                localStorage.setItem('user', JSON.stringify(data.adminLogin));
                setAuthToken(data.adminLogin.token);
            }
        },
        onError: (error) => console.log(error)
    });

    // full login function
    const login = (userName, password) => {
        removeAuthtoken();
        return adminLogin({
            variables: {
                email: userName,
                password: password,
            },
        });
    }
    return [login, mutationResults]
};