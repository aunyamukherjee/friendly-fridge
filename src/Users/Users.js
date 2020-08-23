import React, { useEffect, useState } from 'react';
import UsersList from './UsersList';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import { useHttpClient } from '../shared/hooks/http-hook';

const Users = () => {
    // const USERS = [
    //     {
    //         id: 'u1', 
    //         name: 'Ashish Mukherjee', 
    //         image:'https://pbs.twimg.com/profile_images/1079595086604914690/wdxFqvDl_400x400.jpg'
    //     },
    //     {
    //         id: 'u2', 
    //         name: 'Aunya Mukherjee', 
    //         image:'https://lh3.googleusercontent.com/MG1n4qw33hvlUt9ZX07BozOlEy-Bb7eA9hAlCH-ObEEX46tvDwYkyB7n2rhKpxV_6lWVAQ=s85'
    //     },
    //     {
    //         id: 'u3',
    //         name: 'Soma Mukherjee',
    //         image: 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407__340.png'
    //     },
    //     {
    //         id: 'u4',
    //         name: 'Sunburst Mukherjee',
    //         image: 'https://douglascuddletoy.com/wp-content/uploads/2018/11/1865.jpg'
    //     }
    // ];
    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users'
                );

                setLoadedUsers(responseData.users);
            } catch (err) {}
        };
        fetchUsers();
;    }, [sendRequest]);
     

    return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
    </React.Fragment>
    );
};

export default Users;