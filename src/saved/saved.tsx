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
    const queue = React.useRef<Message[]>([]);

    const handleMessage = (message: Message) => {
        if (message.command.author != user) return;
        if (message.type == 'add') {
            updateCommands([...commands, message.command]);
        } else {
            const index = commands.findIndex((command) => command.id == message.command.id);
            if (index != -1) {
                let newCommands = commands.slice();
                newCommands[index] = message.command;
                updateCommands(newCommands);
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
            const interval = setInterval(
                () => {
                    if (queue.current.length > 0) {
                        let message = queue.current.shift();
                        handleMessage(message!);
                    }
                }, 100
            );

            return () => clearInterval(interval);
        }
    );

    React.useEffect(
        () => {
            socket.onmessage = (event) => {
                let message =JSON.parse(event.data) as Message
                queue.current.push(message);
            };

            return () => { socket.onmessage = () => { } };
        },
        [],
    );

    return <main id="saved">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}


export default Saved;