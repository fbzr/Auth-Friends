import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// material-ui
import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import MaterialTable, { MTableToolbar } from 'material-table';
// components
import AddFriendForm from './AddFriendForm';
import { Close, AddBox } from '@material-ui/icons';

const FriendsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [addFormExpanded, setAddFormExpanded] = useState(false);
    const [resetList, setResetList] = useState(true);
    const [friendsTable, setFriendsTable] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Age', field: 'age', type: 'numeric' }
        ],
        data: []
    });
    
    // Fetches initial data
    useEffect(() => {
        if(resetList) {
            axiosWithAuth().get('/api/friends')
            .then(res => {
                setIsLoading(false);
                setResetList(false);
                setAddFormExpanded(false);
                setFriendsTable(prev => ({
                    ...prev,
                    data: res.data
                }));
            })
            .catch(err => console.log(err));
        }
    }, [resetList]);

    const handleAddButtonClick = () => setAddFormExpanded(!addFormExpanded);

    const editFriend = (oldData, newData) => {
        axiosWithAuth().put(`/api/friends/${oldData.id}`, newData)
            .then(res => {
                setFriendsTable(prev => ({
                    ...prev,
                    data: res.data
                }));
            })
            .catch(err => console.log(err));
    }

    const removeFriend = data => {
        axiosWithAuth().delete(`/api/friends/${data.id}`)
            .then(res => {
                setFriendsTable(prev => ({
                    ...prev,
                    data: res.data
                }))
            })
            .catch(err => console.log(err));
    }

    return (
        isLoading ? 
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}><CircularProgress /></div>:
        <MaterialTable
            style={{ width: '600px' }}
            title='Friends List'
            columns={friendsTable.columns}
            data={friendsTable.data}
            emptyRowsWhenPaging={false}
            components={{
                Toolbar: props => (
                    <div style={{ backgroundColor: '#e8eaf5' }}>
                        <MTableToolbar {...props} />
                        <IconButton aria-expanded={addFormExpanded} onClick={handleAddButtonClick} aria-label="Add Friend">
                        { addFormExpanded 
                            ? <Close />
                            : <AddBox /> }
                        </IconButton>
                        <AddFriendForm expanded={addFormExpanded} resetList={setResetList} />
                    </div>
                )
            }}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                editFriend(oldData, newData);
                            }
                        }, 600);
                }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            removeFriend(oldData);
                        }, 600);
                }),
            }}
        />
    )
}

export default FriendsList
