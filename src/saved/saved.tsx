import * as React from 'react';
import Card from '../card/card';
import {Command } from '../command/command';
import './saved.css';

const Saved: React.FC = () => {
    const [commands, updateCommands] = React.useState(getUserCommands());
    return <main id="saved">
        {commands.map((command) => <Card key={command.id} {...command} />)}
    </main>;
}

function getUserCommands(): Command[] {
    return JSON.parse(localStorage.getItem("userCommands") ?? "[]");
}

export default Saved;