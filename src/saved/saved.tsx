import * as React from 'react';
import { Card } from '../card/card';
import { Command } from '../command/command';
import './saved.css';
import { getUserCommands, Message } from '../api/api';

interface SavedProps {
    user: string | null;
    socket: WebSocket;
}

const Saved: React.FC<SavedProps> = ({ user, socket }) => {
    const [commands, updateCommands] = React.useState<Command[]>([]);

    const handleMessage = async (message: Message) => {
        if (message.command.author == user) updateCommands(await getUserCommands(user));
    }

    React.useEffect(
        () => {
            (async () => updateCommands(await getUserCommands(user)))();
        },
        [],
    );

    React.useEffect(
        () => {
            socket.onmessage = (event) => handleMessage(JSON.parse(event.data) as Message);

            return () => { socket.onmessage = () => {} };
        },
        [],
    );

    return <main id="saved">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}


export default Saved;