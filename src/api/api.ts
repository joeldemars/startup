import { Command } from "../command/command";

export function addCommand(command: Command) {
    fetch('/api/commands', {
        method: 'POST',
        body: JSON.stringify(command),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
}

export async function getCommands(): Promise<Command[]> {
    return fetch('/api/commands', {
        method: 'GET',
    }).then(async (response) =>
        JSON.parse(await response.text())
    );
}

export function setCommands(commands: Command[]) {
    localStorage.setItem("commands", JSON.stringify(commands));
}

export async function getUserCommands(user: String | null) {
    if (user == null) {
        return [];
    } else {
        return getCommands().then(
            (commands) => commands.filter(
                (command) => command.author == user
            )
        );
    }
}

export function markNewSave(id: string) {
    // let commands = getCommands();
    // let index = commands.findIndex((command) => command.id == id);
    // commands[index].saves++;
    // setCommands(commands);
}

export function updateCommand(command: Command) {
    // let commands = getCommands();
    // let index = commands.findIndex((c) => c.id == command.id);
    // commands[index] = command;
    // setCommands(commands);
}

export async function authenticate(email: string, password: string): Promise<Response> {
    return fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
}

export async function register(email: string, password: string): Promise<Response> {
    return fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
}

export async function endSession(): Promise<Response> {
    return fetch('/api/logout', {
        method: 'DELETE',
    })
}