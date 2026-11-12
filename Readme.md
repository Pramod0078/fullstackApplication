# Full Stack Application — Video Sharing Platform Backend

A YouTube-style video sharing platform backend built with Node.js, Express, and MongoDB. It provides REST APIs for user authentication, video uploads and playback, playlists, comments, and likes, with media storage handled through Cloudinary.

## Features

- **Authentication & Users**
  - Register / login / logout with JWT-based access and refresh tokens
  - Secure password hashing with bcrypt
  - Update profile, avatar, and cover image (uploaded to Cloudinary)
  - Change password, refresh access token, delete account
- **Videos**
  - Upload videos with thumbnail (via Multer + Cloudinary)
  - Fetch video feed, single video detail, update, and delete videos
  - Like / unlike videos
- **Playlists**
  - Create playlists, add videos to a playlist
  - Fetch a user's playlists and playlist details
- **Comments**
  - Add and delete comments on videos
  - Fetch parent comments for a video
  - Like comments

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose (+ `mongoose-aggregate-paginate-v2` for paginated aggregations)
- **Auth:** JSON Web Tokens (access + refresh tokens), bcrypt for password hashing
- **File Uploads:** Multer (local temp storage) + Cloudinary (media hosting)
- **Dev tooling:** Nodemon, Prettier

## Project Structure

```
src/
├── app.js                # Express app setup, middleware, route mounting
├── index.js              # Entry point — loads env, connects DB, starts server
├── constants.js          # App-wide constants (DB name, etc.)
├── db/                   # MongoDB connection logic
├── controllers/          # Route handler logic (user, video, comment)
├── models/               # Mongoose schemas (user, video, playlist, comments, likes, subscription)
├── routes/                # Express routers (user, video, comments)
├── middlewares/           # Auth (JWT) and Multer upload middleware
└── utils/                 # Helper utilities (e.g. Cloudinary upload, API error/response wrappers)
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A MongoDB instance (local or Atlas)
- A Cloudinary account (for media storage)

### Installation

```bash
git clone https://github.com/manoharchawada/full-stack-application.git
cd full-stack-application
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the Server

```bash
npm run dev
```

The server starts on the port defined in `PORT` (default `8000`) and connects to the `youtube` database on the configured MongoDB instance.

## API Overview

All routes are prefixed with `/api/v1`.

### Users — `/api/v1/users`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user (avatar + cover image upload) | No |
| POST | `/login` | Log in a user | No |
| POST | `/logout` | Log out the current user | Yes |
| POST | `/deleteUser` | Delete the current user's account | Yes |
| POST | `/refresh-token` | Refresh the access token | No |
| POST | `/change-password` | Change the current password | Yes |
| GET | `/profile` | Get the current user's profile | Yes |
| PATCH | `/update-profile` | Update profile details | Yes |
| PUT | `/update-avatar` | Update avatar image | Yes |
| PUT | `/update-cover-image` | Update cover image | Yes |

### Videos & Playlists — `/api/v1/media`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/create-video` | Upload a new video with thumbnail | Yes |
| GET | `/video-feed` | Get the video feed | Yes |
| GET | `/video-detail/:videoId` | Get a single video's details | Yes |
| PATCH | `/update-video` | Update a video's details/media | Yes |
| POST | `/delete-video/:videoId` | Delete a video | Yes |
| POST | `/video-like-unlike` | Like or unlike a video | Yes |
| POST | `/create-playlist` | Create a new playlist | Yes |
| GET | `/user-playlist` | Get the current user's playlists | Yes |
| GET | `/playlist-detail/:playlistId` | Get a playlist's details | Yes |
| POST | `/add-video-playlist/:playlistId` | Add a video to a playlist | Yes |

### Comments — `/api/v1/videoComments`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/comment/:videoId` | Add a comment to a video | Yes |
| GET | `/parent-comment/:videoId` | Get top-level comments for a video | Yes |
| POST | `/delete-comment/:commentId` | Delete a comment | Yes |
| POST | `/comment-like` | Like a comment | Yes |

## License

ISC
