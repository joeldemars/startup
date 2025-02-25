type CommandOptions = VideoOptions | AudioOptions | ImageOptions;

export interface Command {
    id: string;
    title: string;
    saves: number;
    command: string;
    infile: string;
    container: Container;
    acodec: AudioCodec;
    vcodec: VideoCodec;
    outfile: string;
}

// export default class Command {
//     id: number;
//     name: string;
//     description: string;
//     command: string;
//     options: CommandOptions;
//     saves: number;

//     constructor(id: number, name: string, description: string, command: string, options: CommandOptions, saves: number) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.command = command;
//         this.options = options;
//         this.saves = saves;
//     }
// }

export type Container = "mp4" | "webm" | "mkv";
export type VideoCodec = "avc" | "hevc" | "vp9" | "av1";
export type AudioCodec = "aac" | "opus" | "wav" | "flac";


export class VideoOptions {
    inputFile: string;
    container: Container;
    videoCodec: VideoCodec;
    audioCodec: AudioCodec;
    outputFile: string;

    constructor(inputFile: string, container: Container, videoCodec: VideoCodec, audioCodec: AudioCodec, outputFile: string) {
        this.inputFile = inputFile;
        this.container = container;
        this.videoCodec = videoCodec;
        this.audioCodec = audioCodec;
        this.outputFile = outputFile;
    }
}

type AudioFormat = "MP3" | "Opus" | "M4A" | "WAV" | "FLAC";

class AudioOptions {
    inputFile: string;
    audioFormat: AudioFormat;
    outputFile: string;

    constructor(inputFile: string, audioFormat: AudioFormat, outputFile: string) {
        this.inputFile = inputFile;
        this.audioFormat = audioFormat;
        this.outputFile = outputFile;
    }
}

type ImageFormat = "JPEG" | "PNG" | "WebP" | "AVIF";

class ImageOptions {
    inputFile: string;
    imageFormat: ImageFormat;
    outputFile: string;
    
    constructor(inputFile: string, imageFormat: ImageFormat, outputFile: string) {
        this.inputFile = inputFile;
        this.imageFormat = imageFormat;
        this.outputFile = outputFile;
    }
}