import * as React from 'react';
import { Card } from '../card/card';
import './community.css';
import { Command } from '../command/command';
import { getCommands, Message } from '../api/api';


interface CommunityProps {
    user: string | null;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState<Command[]>([]);

    const handleMessage = (message: Message) => {
        updateCommands((commands) => {
            if (message.type == 'add') {
                return [...commands, message.command];
            } else {
                let index = commands.findIndex((command) => command.id == message.command.id);
                if (index == -1) {
                    return [...commands, message.command];
                } else {
                    commands[index] = message.command;
                    return commands;
                }
            }
        });
    }

    React.useEffect(
        () => {
            (async () => updateCommands(await getCommands()))();
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

    return <main id="community">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}

export default Community;