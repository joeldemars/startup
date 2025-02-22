type CommandOptions = VideoOptions | AudioOptions | ImageOptions;

export default class Command {
    name: string;
    description: string;
    command: string;
    options: CommandOptions;
    saves: number;

    constructor(name: string, description: string, command: string, options: CommandOptions, saves: number) {
        this.name = name;
        this.description = description;
        this.command = command;
        this.options = options;
        this.saves = saves;
    }
}

type Container = "MP4" | "WebM" | "MKV";
type VideoCodec = "AVC" | "HEVC" | "VP9" | "AV1";
type AudioCodec = "AAC" | "Opus" | "WAV" | "FLAC";


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