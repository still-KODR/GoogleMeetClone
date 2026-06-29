Chat Application Roadmap
chat-app/

Frontend
├── React
├── React Router Data Mode
├── Tailwind CSS
├── Axios
├── Socket.io Client
├── Redux (Later)
├── Custom Hooks

Backend
├── Express
├── Socket.io
├── Google OAuth
├── Redis
├── JWT
├── Cookie Parser
├── CORS




Phase 1 Project Setup
Step 1
Project Initialization

Backend

✔ Express
✔ Environment Variables
✔ CORS
✔ Cookie Parser
✔ Logger
✔ Folder Structure
✔ Error Handling

Frontend

✔ Vite
✔ Tailwind
✔ React Router Data Mode
✔ Axios
✔ Absolute Imports
✔ Folder Structure
Step 2
Folder Structure

Frontend

src

app
routes

components
    ui
    layout
    common

features

hooks

services

contexts

utils

assets

styles

Backend

src

config

controllers

services

routes

middlewares

socket

redis

utils

features

auth

room

chat

video
Phase 2 Authentication
Feature 1
Google Authentication

Backend

Google OAuth

JWT

Cookie

Protected Route

Logout

Frontend

Login Page

Google Button

Redirect

Axios

Protected Routes

User Context

After this feature

✅ Login Works

Feature 2
Current User

Backend

GET /me

Frontend

Loader

Route Protection

Persist Login

Refresh

Done

Phase 3 Home Page
Feature 3

Home Screen

Welcome User

Profile

Create Room Button

Join Room Button

Logout
Phase 4 Redis
Feature 4

Redis Setup

Redis Connection

Health Check

Store Room

Delete Room

TTL

Reconnect

Understand

SET

GET

DEL

EXPIRE

SCAN

TTL
Phase 5 Socket.io
Feature 5

Socket Setup

Backend

Socket Server

Namespaces

Rooms

Connection

Disconnect

Middleware

Frontend

Socket Context

Socket Hook

Auto Connect

Reconnect
Phase 6 Room Feature
Feature 6

Create Room

Backend

Generate Room Id

Store Redis

Owner

Members

Timestamp

Socket Room

Redis

room:12345

{
owner
members
createdAt
}

Frontend

Create Button

Loading

Navigate
Feature 7

Join Room

Backend

Verify Room

Join Socket Room

Update Redis

Broadcast

Frontend

Join Screen

Join By Link

Error Screen
Feature 8

Invite Link

Example

localhost:5173/room/abcd1234

Backend

Validate

Redis Lookup

Frontend

React Router

Loader

Redirect
Phase 7 Chat
Feature 9

Basic Chat

Socket Events

send-message

receive-message

typing

disconnect

Backend

Broadcast

Validation

Frontend

Input

Message Box

Auto Scroll

Enter Send
Feature 10

Typing Indicator

Socket

typing

stopTyping

Frontend

Typing...

Animation
Feature 11

Online Users

Socket

join

leave

online

offline

Frontend

Sidebar

User Count

Online Badge
Phase 8 Room Improvements
Feature 12

Owner Controls

Kick User

Transfer Ownership

Delete Room
Feature 13

Leave Room

Backend

Remove Member

Delete Empty Room
Feature 14

Room Recovery

Redis

TTL

Refresh TTL

Cleanup
Phase 9 Chat Improvements
Feature 15

Message Types

Text

Emoji

Image (Later)

Files (Later)
Feature 16

Chat UI

Message Bubble

Avatar

Time

Seen

Unread
Feature 17

Notifications

Toast

Sound

Unread Count
Phase 10 Redux
Feature 18

Redux Toolkit

Slices

Auth

Room

Socket

Chat

UI
Phase 11 WebRTC
Feature 19

Introduction

Understand

ICE

STUN

TURN

SDP

Offer

Answer

Candidate
Feature 20

Media Devices

Camera

Microphone

Permissions
Feature 21

One to One Call

Socket

offer

answer

candidate
Feature 22

Multiple People

Mesh

Peer

Peer

Peer

Peer

Every user has a PeerConnection.

Feature 23

Join Call Button

Inside Room

Join Video Call
Feature 24

Peer Manager

Custom Hook

usePeer()

createPeer()

removePeer()

replaceTrack()
Feature 25

Video Grid

Self

Remote

Responsive Layout
Feature 26

Mute

Camera

Screen Share

Leave Call

Phase 12 Advanced
Feature 27

Screen Share

Feature 28

Raise Hand

Feature 29

Reactions

Feature 30

Recording (Optional)

Feature 31

Background Blur (Optional)

Feature 32

Persistent Chat Database (MongoDB/PostgreSQL)

Instead of Redis only

Store Messages

History

Pagination