# Full Stack Development — Lab Sheets 1–10

Professional, separated source-code workspace based on the uploaded `FS Labsheet 1-10.pdf`.

**Student:** Anurag Parmar · **Course:** Full Stack Development · **Section:** B

## Lab map

| Lab | Main topic | Main technologies |
|---|---|---|
| 01 | Responsive e-commerce storefront | HTML, CSS |
| 02 | Dynamic product listing, cart and validation | HTML, CSS, JavaScript, localStorage |
| 03 | Component-based shopping UI | React + Vite |
| 04 | Node.js modules, filesystem, events, streams, HTTP, npm, env | Node.js |
| 05 | Express routes, middleware, routers, CRUD API | Node.js, Express |
| 06 | REST API task manager + clients | Express, plain JS, React, Postman collection |
| 07 | SQL database, joins, views, indexes, transactions | MySQL |
| 08 | Selected-student list page | Python, Django |
| 09 | Multi-page website with header/nav/footer | HTML, CSS, JavaScript |
| 10 | MySQL connection and student CRUD | PHP, MySQL |

## Run order

Read each lab's `README.md` before running it. Labs 1–3 are separate front-end stages; Labs 4–6 are separate Node/Express exercises; Lab 7 uses MySQL; Lab 8 uses Django; Lab 9 is a standalone website; Lab 10 uses PHP + MySQL.

## Setup overview
- HTML/CSS/JS: open the HTML file or use VS Code Live Server.
- Node labs: install a current LTS version of Node.js, then run `npm install` inside that lab's project.
- React labs: `npm install`, then `npm run dev`.
- MySQL labs: run SQL files in MySQL Workbench or mysql CLI.
- Django lab: create a virtual environment, install `requirements.txt`, then run migrations and `python manage.py runserver`.
- PHP lab: use XAMPP/WAMP or PHP CLI with MySQL enabled.

## Safety and scope
These are educational lab implementations. Lab 6 uses an in-memory store, so data resets when the server restarts. Do not put real passwords, API keys, or personal data in GitHub. PHP database credentials are local placeholders and should be moved to environment variables for production. Confirm the lab sheet with your instructor before final submission.
