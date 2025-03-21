<p align="center">
  <img src="https://res.cloudinary.com/dqwnzs85c/image/upload/v1742302188/logo_lktt4p.png" alt="Logo" width="100">
</p>

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



[Live](https://volunteer.fitraat.com/)

## Client site code

[Code](https://github.com/mohammadShamimReza/hands-on-volunteering-platform-client)



## Video preview

[Video Preview](https://drive.google.com/file/d/1NBDSVtfziuYbi0Cww215l8ibRZUHqlj8/view?usp=sharing)

# Project Title

A community-driven social volunteering platform that connects individuals with meaningful social impact opportunities. Users can discover and join volunteer-driven events, post requests for community help, form teams for large-scale initiatives, and track their impact with contributions logged on a personal and team level.

<br> 

## Api documentation

- [Postman API documentation](https://documenter.getpostman.com/view/23321198/2sAYkDPLvv)




<br> 

## Tech Stack

**Language:** JavaScript (TypeScript)

**Client:** Next.js, Redux, TailwindCSS

**Server:** Node.js (Express.js)

**Database:** PostgreSQL(prisma)

**Authentication:** JWT-based auth

**API Communication:** REST API

**Deployment:** Vercel, supabase(database), cloudinary

<br> 
<br> 



<br> 
<br> 



## ERD diagram
<p align="center">
  <img src="https://res.cloudinary.com/dqwnzs85c/image/upload/v1742305899/Untitled_khicnt.png" alt="Logo" >
</p>


<br> 
<br> 


## Run Locally

Clone the project

```bash
  git clone git@github.com:mohammadShamimReza/hands-on-volunteering-platform-server.git
```

Go to the project directory

```bash
  cd hands-on-volunteering-platform-client
```

Install dependencies

```bash
  npm install
```


Start the server

```bash
  npm run dev
```

<br/>

## Run in vercel

Clone the project

```bash
  git clone git@github.com:mohammadShamimReza/hands-on-volunteering-platform-server.git
```

Go to the project directory

```bash
  cd hands-on-volunteering-platform-client
```

Install dependencies

```bash
  npm install
```


Start the server

```bash
  npm run build
```


Connect to vercel

```bash
  vercel
```


Make in production

```bash
  vercel --prod
```


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:


`DATABASE_URL=[Your Supabase connection pooling URL]`

`DIRECT_URL=[Your direct Supabase database URL]`

`PORT=[Your server port]`

`BCRYPT_SALT_ROUNDS=[Number of salt rounds for bcrypt]`

`JWT_SECRET=[Your JWT secret key]`

`JWT_REFRESH_SECRET=[Your JWT refresh secret key]`

`JWT_EXPIRES_IN=[JWT token expiration time]`

`JWT_REFRESH_EXPIRES_IN=[JWT refresh token expiration time]`

`RESET_LINK=[Frontend URL for password reset]`

`EMAIL=[Your email address for system notifications]`

`APP_PASS=[Your email app password]`

`FRONTEND_URL=[Frontend application URL]`

`BACKEND_URL=[Backend application URL]`


## Authors

- [shamimReza](https://github.com/mohammadShamimReza)




## Client site code

[Code](https://github.com/mohammadShamimReza/hands-on-volunteering-platform-client)



