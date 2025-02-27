import * as React from 'react';
import { Card } from '../card/card';
import { Command } from '../command/command';
import './saved.css';

interface SavedProps {
    user: string | null;
}

const Saved: React.FC<SavedProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState(getUserCommands(user));

    function saveRandomCommands(): number {
        return setInterval(() => {
            if (commands.length == 0) return;
            let randomIndex = Math.floor(commands.length * Math.random());
            commands[randomIndex].saves++;
            let id = commands[randomIndex].id;
            let allCommands: Command[] = JSON.parse(localStorage.getItem("commands") ?? "[]");
            let index = allCommands.findIndex((command) => command.id == id);
            allCommands[index].saves++;
            localStorage.setItem("commands", JSON.stringify(allCommands));
            updateCommands(allCommands.filter((command) => command.author == user));
        }, 1000);
    }

    React.useEffect(() => {
        let interval = saveRandomCommands();
        return () => clearInterval(interval);
    })

    return <main id="saved">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}

function getUserCommands(user: string | null): Command[] {
    return JSON.parse(localStorage.getItem("commands") ?? "[]").filter((command: Command) => command.author == user);
}

export default Saved;