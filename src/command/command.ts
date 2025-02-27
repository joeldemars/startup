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