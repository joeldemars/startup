import * as React from 'react';
import { Card } from '../card/card';
import { Command } from '../command/command';
import './saved.css';
import { getUserCommands, markNewSave } from '../api/api';

interface SavedProps {
    user: string | null;
}

const Saved: React.FC<SavedProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState<Command[]>([]);

    // function saveRandomCommands(): number {
    //     return setInterval(() => {
    //         if (commands.length == 0) return;
    //         let randomIndex = Math.floor(commands.length * Math.random());
    //         markNewSave(commands[randomIndex].id);
    //         updateCommands(getUserCommands(user ?? ""));
    //     }, 1000);
    // }

    // React.useEffect(() => {
    //     let interval = saveRandomCommands();
    //     return () => clearInterval(interval);
    // })

    React.useEffect(() => {
        (async () => {
            updateCommands(await getUserCommands(user));
        })();
    },
        [],
    );

    return <main id="saved">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}


export default Saved;