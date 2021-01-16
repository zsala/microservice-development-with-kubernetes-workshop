import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';

export const simpleList = (
    <div>
        <ListSubheader inset>Table View</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Data" />
        </ListItem>
    </div>
);
