import { Command } from "../command/command";

export function addCommand(command: Command) {
    let commands = getCommands();
    commands.push(command);
    setCommands(commands);
}

export function getCommands(): Command[] {
    return JSON.parse(localStorage.getItem("commands") ?? "[]");
}

export function setCommands(commands: Command[]) {
    localStorage.setItem("commands", JSON.stringify(commands));
}

export function getUserCommands(user: String) {
    return getCommands().filter((command) => command.author == user);
}

export function markNewSave(id: string) {
    let commands = getCommands();
    let index = commands.findIndex((command) => command.id == id);
    commands[index].saves++;
    setCommands(commands);
}

export function updateCommand(command: Command) {
    let commands = getCommands();
    let index = commands.findIndex((c) => c.id == command.id);
    commands[index] = command;
    setCommands(commands);
}

export async function authenticate(email: string, password: string): Promise<Response> {
    return fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
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
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}