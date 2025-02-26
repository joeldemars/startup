import * as React from 'react';
import Card from '../card/card';
import {Command } from '../command/command';
import './saved.css';

interface SavedProps {
    user: string | null;
}

const Saved: React.FC<SavedProps> = ({user}) => {
    const [commands, updateCommands] = React.useState(getUserCommands(user));
    return <main id="saved">
        {commands.map((command) => <Card key={command.id} {...command} />)}
    </main>;
}

function getUserCommands(user: string | null): Command[] {
    return JSON.parse(localStorage.getItem("userCommands") ?? "[]").filter((command: Command) => command.author == user);
}

export default Saved;