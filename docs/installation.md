# BackDash Installation Guide

This guide will walk you through the steps required to set up Backdash on your system.

## Prerequisites

Before installing Backdash, ensure you have the following prerequisites installed on your system:

-   Node.js (version 16 or higher)
-   npm (Node Package Manager)
-   git (optional)

## Installation Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/ArtiomsHosting/BackDash.git
```

2. **Navigate to the Directory:**

```bsh
cd BackDash
```

3. **Install dependencies:**

```bash
npm install
```

4. **Environment Configuration:**

```bash
cp .env.example .env
```

5. **Database Setup:**

```bash
npm run db:migrate
```

6. **Start the aplication**

```bash
npm run build
npm start
```

Backdash should now be running on your local system.
