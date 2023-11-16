const { exec } = require("child_process");
const fs = require("fs");
const youtubedl = require("youtube-dl-exec");
const path = require("path");
const inquirer = require("inquirer");

// const url = "https://www.youtube.com/watch?v=9bZkp7q19f0"; // youtube video
// const url = "https://x.com/rub3z_/status/1724552910078435405?s=20"; //  twitter video
// const url = "https://twitter.com/i/status/1724206013237064067"; //  twitter video2
// const url =
//   "https://www.instagram.com/reel/Czkp1R5KFIp/?utm_source=ig_web_copy_link"; // instagram video

// const url =
//   "https://www.linkedin.com/posts/endritrestelica_ai-tech-innovation-ugcPost-7128690094479134720-DxCL?utm_source=share&utm_medium=member_desktop"; // linkedin video

// const url = "https://fb.watch/okhYYj9z9c/"; // facebook video

const options = {
  cwd: __dirname,
};

let audioSettings = {
  audioFormat: "mp3",
  extractAudio: true,
  audioFormat: "mp3",
  audioQuality: 0,
  addMetadata: true,
  ffmpegLocation: path.join(__dirname, "./ffmpeg"),
};

let videoSettings = {
  recodeVideo: "mp4",
  formatSort: "res:1080",
};

// asking user for audio or video
let question = [
  {
    type: "list",
    name: "outputType",
    message: "What do you want to download?",
    choices: [
      { name: "Only audio", value: "audio" },
      { name: "Audio and video", value: "video" },
    ],
  },
];

// now we will ask user for url
let urlQuestion = [
  {
    type: "input",
    name: "url",
    message: "Enter the url of video",
  },
];

// const video = exec(`youtube-dl ${url} -x --audio-format mp3`, options);
async function videoDownload(url1) {
  try {
    // await youtubedl(url, settings, { cwd: __dirname });
    await youtubedl(url1, videoSettings, options);
  } catch (error) {
    console.log(error);
  }
}

async function audioDownload(url1) {
  try {
    // await youtubedl(url, settings, { cwd: __dirname });
    await youtubedl(url1, audioSettings, options);
  } catch (error) {
    console.log(error);
  }
}

inquirer.prompt(urlQuestion).then((answer) => {
  url2 = answer.url;
  inquirer.prompt(question).then((answer) => {
    if (answer.outputType === "audio") {
      console.log("Downloading audio");
      audioDownload(url2);
    } else {
      console.log("Downloading video");
      videoDownload(url2);
    }
  });
});

// audioDownload();
// videoDownload();
