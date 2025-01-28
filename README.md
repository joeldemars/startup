# FFmpeg Helper

[My Notes](notes.md)

FFmpeg Helper is a web application to interactively generate FFmpeg commands with an intuitive UI, save generated commands, and see commands others have generated.


> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

FFmpeg is an incredibly powerful command-line tool for manipulating and editing media that can run on almost any platform. Unfortunately, with all this functionality and flexibilty comes a great pile of command-line options, manuals, and documentation for users to sift through. FFmpeg Helper provides a convenient UI to easily generate FFmpeg commands. Users can then save these commands for later and see what commands others have made.

### Design

![Design image](mockup.jpg)

```mermaid
sequenceDiagram
    actor User1
    actor User2
    User1->>Website: Log in
    Website-->>User1: Logged in
    User1->>Website: Save new command
    Website-->>User2: View new command
```

### Key features

- Simple UI to select FFmpeg options
- Expose FFmpeg functionality for image, audio, and video transcoding
- Button to conveniently copy FFmpeg command to clipboard
- Allow selection of containers, codecs, and quality
- Allow saving useful commands to the user's account
- Allow browsing commands others have made
- Allow saving others' posts and seeing how many times each post has been saved
- Show updates to FFmpeg codebase

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Site layout and structure: main page, profile page, and community page, with apropriate links between them
- **CSS** - Simple, responsive, and easy-to-read UI; generated FFmpeg command displayed in terminal-style section
- **React** - Interactivity, e.g. for login, command generation, and viewing of saved commands
- **Service** - Service backend supporting login, saving generated commands, saving community commands, and viewing codebase updates (3rd party)
- **DB/Login** - Save users and their login info, as well as their saved commands, save how many times each command has been saved
- **WebSocket** - Show in real time new commands that have been saved and updates to how many times

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://ffmpeghelper.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - HTML pages for home (command generation), community command, saved commands, and login
- [x] **Proper HTML element usage** - Semantic header, footer, and body; many HTML input elements; code blocks; etc.
- [x] **Links** - Links to each page in navbar in header, links to source and FFmpeg in footer
- [x] **Text** - Command descriptions on community and saved pages
- [x] **3rd party API placeholder** - Placeholders for GitHub badges in footer
- [x] **Images** - Site logo and favicon on all pages
- [x] **Login placeholder** - Login page log in and sign up options
- [x] **DB data placeholder** - Account and command storage on login and saved pages
- [x] **WebSocket placeholder** - Real-time display of new commands on community page

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
