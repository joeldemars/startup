export interface Command {
    id: string;
    title: string;
    author: string;
    saves: number;
    command: string;
    infile: string;
    container: Container;
    acodec: AudioCodec;
    vcodec: VideoCodec;
    outfile: string;
}

export type Container = "mp4" | "webm" | "mkv";
export type VideoCodec = "avc" | "hevc" | "vp9" | "av1";
export type AudioCodec = "aac" | "opus" | "wav" | "flac";

export function generateCommand(infile: string, container: string, vcodec: string, acodec: string, outfile: string): string {
    let command = "ffmpeg -i ";

    if (infile == "") {
        command += "<input file> ";
    } else if (/ /.test(infile)) {
        command += "'" + infile + "' ";
    } else {
        command += infile + " ";
    }

    switch (vcodec) {
        case "avc":
            command += "-c:v libx264 ";
            break;
        case "hevc":
            command += "-c:v libx265 ";
            break;
        case "vp9":
            command += "-c:v libvpx-vp9 ";
            break;
        case "av1":
            command += "-c:v libaom-av1 ";
            break;
    }

    switch (acodec) {
        case "aac":
            command += "-c:a aac ";
            break;
        case "opus":
            command += "-c:a libopus ";
            break;
        case "wav":
            command += "-c:a pcm_s16le ";
            break;
        case "flac":
            command += "-c:a flac ";
            break;
    }

    if (outfile == "") {
        command += "<output file>." + container;
    } else if (/ /.test(outfile)) {
        command += "'" + outfile + "." + container + "'";
    } else {
        command += outfile + "." + container;
    }

    return command;
}