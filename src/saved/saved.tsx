import * as React from 'react';
import { Card } from '../card/card';
import { Command } from '../command/command';
import './saved.css';
import { getUserCommands, Message } from '../api/api';

interface SavedProps {
    user: string | null;
}

const Saved: React.FC<SavedProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState<Command[]>([]);

    const handleMessage = (message: Message) => {
        if (message.command.author != user) return;
        if (message.type == 'add') {
            updateCommands([...commands, message.command]);
        } else {
            let index = commands.findIndex((command) => command.id == message.command.id);
            if (index == -1) {
                updateCommands([...commands, message.command]);
            } else {
                commands[index] = message.command;
                updateCommands(commands);
            }
        }
    }

    React.useEffect(
        () => {
            (async () => updateCommands(await getUserCommands(user)))();
        },
        [],
    );

    React.useEffect(
        () => {
            const protocol = window.location.protocol == 'http:' ? 'ws' : 'wss';
            const socket = new WebSocket(`${protocol}://${window.location.host}`);
            socket.onmessage = (event) => handleMessage(JSON.parse(event.data) as Message);

            return () => socket.close();
        },
        [],
    );

    return <main id="saved">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}


export default Saved;