import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
//import edit button from materialui

const ViewProfile = (props) => {
    return(
        <Card>
            <CardContent>
                {/* render user data here*/}
                {/* conditional render edit button if given id matches id in localstorage */}
            </CardContent>
        </Card>
    );
}

export default ViewProfile;